if (window.location.hostname == "trivialsec.com")
  window.location.href = `https://www.trivialsec.com${window.location.pathname}`;
import { createApp } from "vue";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";
import Pusher from "pusher-js";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import CryptoJS from "crypto-js";

const app = createApp(App);
if (import.meta.env.DEV) {
  app.config.globalProperties.$log = console.log;
  Pusher.logToConsole = true;
}
app.use(router);
app.use(VueClipboard);
router.isReady().then(() => app.mount("#app"));

const clearState = () => {
  localStorage.setItem("/account/name", "");
  localStorage.setItem("/account/display", "");
  localStorage.setItem("/member/email", "");
  localStorage.setItem("/member/email_md5", "");
  localStorage.setItem("/session/key", "");
};

const apiUrl = import.meta.env.VITE_API_URL.trim();
window.Api = {
  get: async (uriPath, options = {}) => {
    const { timeout = 15000 } = options;
    const urlPath = `${
      apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl
    }${uriPath}`;
    const ts = moment().utc().unix();
    const url = new URL(urlPath);
    const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${
      url.pathname
    }\n${ts}`;
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key"),
    );
    hash.update(canonical_string);
    const mac = hash.finalize();
    const Authorization = `HMAC id="${localStorage.getItem(
      "/member/email",
    )}", mac="${mac}", ts="${ts}"`;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    options.headers = Object.assign(options.headers || {}, { Authorization });
    const response = await fetch(urlPath, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    if (response.status === 401) clearState();
    return response;
  },
  post: async (uriPath, data, options = {}) => {
    const { timeout = 15000 } = options;
    const urlPath = `${
      apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl
    }${uriPath}`;
    const body = JSON.stringify(data);
    const ts = moment().utc().unix();
    const url = new URL(urlPath);
    const canonical_string = `POST\n${url.hostname}\n${url.port || 443}\n${
      url.pathname
    }\n${ts}\n${window.btoa(body)}`;
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key"),
    );
    hash.update(canonical_string);
    const mac = hash.finalize();
    const Authorization = `HMAC id="${localStorage.getItem(
      "/member/email",
    )}", mac="${mac}", ts="${ts}"`;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    options.headers = Object.assign(options.headers || {}, {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization,
    });
    const response = await fetch(urlPath, {
      ...options,
      method: "POST",
      body,
      signal: controller.signal,
    });
    clearTimeout(id);
    if (response.status === 401) clearState();
    return response;
  },
  delete: async (uriPath, options = {}) => {
    const { timeout = 15000 } = options;
    const urlPath = `${
      apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl
    }${uriPath}`;
    const ts = moment().utc().unix();
    const url = new URL(urlPath);
    const canonical_string = `DELETE\n${url.hostname}\n${url.port || 443}\n${
      url.pathname
    }\n${ts}`;
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key"),
    );
    hash.update(canonical_string);
    const mac = hash.finalize();
    const Authorization = `HMAC id="${localStorage.getItem(
      "/member/email",
    )}", mac="${mac}", ts="${ts}"`;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    options.headers = Object.assign(options.headers || {}, {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization,
    });
    const response = await fetch(urlPath, {
      ...options,
      method: "DELETE",
      signal: controller.signal,
    });
    clearTimeout(id);
    if (response.status === 401) clearState();
    return response;
  },
};
window.pusher = new Pusher(
  "b8b37751841a44557ab2", // pragma: allowlist secret
  { cluster: "ap4" },
);
const channel = window.pusher.subscribe(localStorage.getItem("/account/name"));

if (!("Notification" in window)) {
  if (import.meta.env.DEV) {
    console.log("This browser does not support desktop notification");
  }
} else if (Notification.permission === "granted") {
  if (import.meta.env.DEV) {
    console.log("Notification permissions have already been granted");
  }
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      new Notification("Notifications active", {
        body: `Notifications will appear here`,
        icon: "/favicon.png",
      });
    }
  });
}
channel.bind("trivial-scanner-status", (data) => {
  if (data?.status === "Complete") {
    const target = `${data.targets[0].transport.hostname}:${data.targets[0].transport.port}`;
    const notification = new Notification(target, {
      body: `${data.type} ${data.status}`,
      icon: "/favicon.png",
    });
    notification.onclick = (event) => {
      event.preventDefault();
      window.open(
        `https://${import.meta.env.DEV ? "dev" : "www"}.trivialsec.com${
          data.results_uri
        }`,
        "_blank",
      );
    };
  } else {
    const target = `${data.hostname}:${data.port}`;
    new Notification(target, {
      body: `${data.type} ${data.status}`,
      icon: "/favicon.png",
    });
  }
});
