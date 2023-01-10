if (window.location.hostname == 'trivialsec.com')
    window.location.href = `https://www.trivialsec.com${window.location.pathname}`
import { createApp } from 'vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import { Toast } from 'bootstrap'
import Pusher from 'pusher-js'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import CryptoJS from 'crypto-js'

const app = createApp(App)
app.config.globalProperties.$store = window.localStorage
if (import.meta.env.DEV) {
    app.config.globalProperties.$log = console.log
    Pusher.logToConsole = true
}

app.use(router)
app.use(VueClipboard)
router.isReady().then(() => app.mount('#app'))

const clearState = () => {
    localStorage.setItem('/account/name', '')
    localStorage.setItem('/account/display', '')
    localStorage.setItem('/member/email', '')
    localStorage.setItem('/member/email_md5', '')
    localStorage.setItem('/session/key', '')
}

const apiUrl = import.meta.env.VITE_API_URL.trim()
window.Api = {
    get: async (uriPath, options = {}) => {
        const { timeout = 15000 } = options
        const urlPath = `${
            apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl
        }${uriPath}`
        const ts = moment().utc().unix()
        const url = new URL(urlPath)
        const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${
            url.pathname
        }\n${ts}`
        const hash = CryptoJS.algo.HMAC.create(
            CryptoJS.algo.SHA512,
            localStorage.getItem('/session/key')
        )
        hash.update(canonical_string)
        const mac = hash.finalize()
        const Authorization = `HMAC id="${localStorage.getItem(
            '/member/email'
        )}", mac="${mac}", ts="${ts}"`
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        options.headers = Object.assign(options.headers || {}, {
            Authorization
        })
        const response = await fetch(urlPath, {
            ...options,
            signal: controller.signal
        })
        clearTimeout(id)
        if (response.status === 401) {
            clearState()
            setTimeout(() => {
                window.user_notify(
                    `Inactive Session`,
                    `This occurs when the session expires or we detected tampering.`
                )
                router.push('/')
            }, 1000)
        }
        return response
    },
    post: async (uriPath, data, options = {}) => {
        const { timeout = 15000 } = options
        const urlPath = `${
            apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl
        }${uriPath}`
        const body = JSON.stringify(data)
        const ts = moment().utc().unix()
        const url = new URL(urlPath)
        const canonical_string = `POST\n${url.hostname}\n${url.port || 443}\n${
            url.pathname
        }\n${ts}\n${window.btoa(body)}`
        const hash = CryptoJS.algo.HMAC.create(
            CryptoJS.algo.SHA512,
            localStorage.getItem('/session/key')
        )
        hash.update(canonical_string)
        const mac = hash.finalize()
        const Authorization = `HMAC id="${localStorage.getItem(
            '/member/email'
        )}", mac="${mac}", ts="${ts}"`
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        options.headers = Object.assign(options.headers || {}, {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization
        })
        const response = await fetch(urlPath, {
            ...options,
            method: 'POST',
            body,
            signal: controller.signal
        })
        clearTimeout(id)
        if (response.status === 401) {
            clearState()
            setTimeout(() => {
                window.user_notify(
                    `Inactive Session`,
                    `This occurs when the session expires or we detected tampering.`
                )
                router.push('/')
            }, 1000)
        }
        return response
    },
    delete: async (uriPath, options = {}) => {
        const { timeout = 15000 } = options
        const urlPath = `${
            apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl
        }${uriPath}`
        const ts = moment().utc().unix()
        const url = new URL(urlPath)
        const canonical_string = `DELETE\n${url.hostname}\n${
            url.port || 443
        }\n${url.pathname}\n${ts}`
        const hash = CryptoJS.algo.HMAC.create(
            CryptoJS.algo.SHA512,
            localStorage.getItem('/session/key')
        )
        hash.update(canonical_string)
        const mac = hash.finalize()
        const Authorization = `HMAC id="${localStorage.getItem(
            '/member/email'
        )}", mac="${mac}", ts="${ts}"`
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        options.headers = Object.assign(options.headers || {}, {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization
        })
        const response = await fetch(urlPath, {
            ...options,
            method: 'DELETE',
            signal: controller.signal
        })
        clearTimeout(id)
        if (response.status === 401) {
            clearState()
            setTimeout(() => {
                window.user_notify(
                    `Inactive Session`,
                    `This occurs when the session expires or we detected tampering.`
                )
                router.push('/')
            }, 1000)
        }
        return response
    }
}
window.user_notify = (title, body, options = {}) => {
    function MakeId(length) {
        let result = ''
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }
    function ToastTemplate(eleId, header, content) {
        return `<div id="${eleId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">${header}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${content}
        </div>
    </div>`
    }
    const { icon = '/favicon.png', delay = 15000 } = options
    const toastContainer = document.querySelector('.toast-container')
    if (!('Notification' in window)) {
        if (import.meta.env.DEV) {
            console.log('This browser does not support desktop notification')
        }
        if (toastContainer) {
            setTimeout(() => {
                const toastId = MakeId(5)
                toastContainer.insertAdjacentHTML(
                    'beforeend',
                    ToastTemplate(toastId, title, body)
                )
                const toastEl = document.getElementById(toastId)
                const toast = new Toast(toastEl, { delay })
                toast.show()
            }, 1000)
        }
    } else if (Notification.permission === 'granted') {
        if (import.meta.env.DEV) {
            console.log('Desktop notifications already granted')
        }
        const notification = new Notification(title, { body, icon })
        if (options.onclick instanceof Function) {
            notification.onclick = options.onclick
        }
    } else if (Notification.permission !== 'denied') {
        if (import.meta.env.DEV) {
            console.log('Requesting desktop notification permission')
        }
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                const notification = new Notification(title, { body, icon })
                if (options.onclick instanceof Function) {
                    notification.onclick = options.onclick
                }
            } else {
                if (toastContainer) {
                    setTimeout(() => {
                        const toastId = MakeId(5)
                        toastContainer.insertAdjacentHTML(
                            'beforeend',
                            ToastTemplate(toastId, title, body)
                        )
                        const toastEl = document.getElementById(toastId)
                        const toast = new Toast(toastEl, { delay })
                        toast.show()
                    }, 1000)
                }
            }
        })
    } else if (Notification.permission === 'denied') {
        if (import.meta.env.DEV) {
            console.log(`Desktop notifications denied`)
        }
        if (toastContainer) {
            setTimeout(() => {
                const toastId = MakeId(5)
                toastContainer.insertAdjacentHTML(
                    'beforeend',
                    ToastTemplate(toastId, title, message)
                )
                const toastEl = document.getElementById(toastId)
                const toast = new Toast(toastEl, { delay })
                toast.show()
            }, 1000)
        }
    }
}
window.initPusher = () => {
    if (!window.pusher && localStorage.getItem('/account/name')) {
        window.pusher = new Pusher(
            'b8b37751841a44557ab2', // pragma: allowlist secret
            { cluster: 'ap4' }
        )
        const channel = window.pusher.subscribe(
            localStorage.getItem('/account/name')
        )
        channel.bind('trivial-scanner-status', (data) => {
            if (data?.status === 'Complete') {
                window.user_notify(
                    `${data.targets[0].transport.hostname}:${data.targets[0].transport.port}`,
                    `${data.type} ${data.status}`,
                    {
                        onclick: (event) => {
                            event.preventDefault()
                            window.open(
                                `https://${
                                    import.meta.env.DEV ? 'dev' : 'www'
                                }.trivialsec.com${data.results_uri}`,
                                '_blank'
                            )
                        }
                    }
                )
            } else {
                window.user_notify(
                    `${data.hostname}:${data.port}`,
                    `${data.type} ${data.status}`
                )
            }
        })
    }
}
document.addEventListener('DOMContentLoaded', window.initPusher)
