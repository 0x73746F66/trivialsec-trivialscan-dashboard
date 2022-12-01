import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import moment from "moment"
import CryptoJS from "crypto-js"

const app = createApp(App)
app.config.globalProperties.$log = console.log
app.use(router)
router.isReady().then(() => app.mount("#app"))

const apiUrl = import.meta.env.VITE_API_URL.trim()
window.Api = {
  get: async (uriPath, options = {}) => {
    const { timeout = 15000 } = options
    const urlPath = `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}${uriPath}`
    const ts = moment().utc().unix()
    const url = new URL(urlPath)
    const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key")
    )
    hash.update(canonical_string)
    const mac = hash.finalize()
    const Authorization = `HMAC id="${localStorage.getItem("/member/email")}", mac="${mac}", ts="${ts}"`
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    options.headers = Object.assign(options.headers||{}, {Authorization})
    const response = await fetch(urlPath, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  },
  post: async(uriPath, data, options = {}) => {
    const { timeout = 15000 } = options
    const urlPath = `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}${uriPath}`
    const body = JSON.stringify(data)
    const ts = moment().utc().unix()
    const url = new URL(urlPath)
    const canonical_string = `POST\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}\n${window.btoa(body)}`
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key")
    )
    hash.update(canonical_string)
    const mac = hash.finalize()
    const Authorization = `HMAC id="${localStorage.getItem("/member/email")}", mac="${mac}", ts="${ts}"`
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    options.headers = Object.assign(options.headers||{}, {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization
    })
    const response = await fetch(urlPath, {
      ...options,
      method: "POST",
      body,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  },
  delete: async uriPath => {
    const urlPath = `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}${uriPath}`
    const ts = moment().utc().unix()
    const url = new URL(urlPath)
    const canonical_string = `DELETE\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
    const hash = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      localStorage.getItem("/session/key")
    )
    hash.update(canonical_string)
    const mac = hash.finalize()
    const Authorization = `HMAC id="${localStorage.getItem("/member/email")}", mac="${mac}", ts="${ts}"`
    return fetch(urlPath, {
      method: "DELETE",
      headers: { Authorization }
    })
  },
}
