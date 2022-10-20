if (window.location.hostname == "trivialsec.com") {
  window.location.href = `https://www.trivialsec.com${window.location.pathname}`;
}
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import CryptoJS from "crypto-js";

const app = createApp(App);
app.config.globalProperties.$log = console.log;
app.use(router);
app.mount("#app");

const apiUrl = import.meta.env.VITE_API_URL
window.Api = {
  get: async uriPath => {
    const urlPath = `${apiUrl}${uriPath}`
    const ts = moment().utc().unix();
    const url = new URL(urlPath);
    const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`;
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key")
    );
    hash.update(canonical_string);
    const mac = hash.finalize();
    const header = `HMAC id="${localStorage.getItem("/member/email")}", mac="${mac}", ts="${ts}"`;
    return fetch(urlPath, {
      headers: {Authorization: header}
    })
  },
  post: async(uriPath, data) => {
    const urlPath = `${apiUrl}${uriPath}`
    const payload = JSON.stringify(data);
    const ts = moment().utc().unix();
    const url = new URL(urlPath);
    const canonical_string = `POST\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}\n${window.btoa(payload)}`;
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key")
    );
    hash.update(canonical_string);
    const mac = hash.finalize();
    const header = `HMAC id="${localStorage.getItem("/member/email")}", mac="${mac}", ts="${ts}"`;
    return fetch(urlPath, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: header,
      },
      method: "POST",
      body: payload,
    })
  },
  delete: async uriPath => {
    const urlPath = `${apiUrl}${uriPath}`
    const ts = moment().utc().unix();
    const url = new URL(urlPath);
    const canonical_string = `DELETE\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`;
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key")
    );
    hash.update(canonical_string);
    const mac = hash.finalize();
    const header = `HMAC id="${localStorage.getItem("/member/email")}", mac="${mac}", ts="${ts}"`;
    return fetch(urlPath, {
      method: "DELETE",
      headers: { Authorization: header }
    })
  },
}
