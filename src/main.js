if (window.location.hostname == 'trivialsec.com') {
    window.location.href = `https://www.trivialsec.com${window.location.pathname}`
}
import { createApp } from 'vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import { Toast } from 'bootstrap'
import Pusher from 'pusher-js'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$store = window.localStorage
if (import.meta.env.DEV) {
    app.config.globalProperties.$log = console.log
    Pusher.logToConsole = true
} else {
    app.config.globalProperties.$log = function () {}
}

app.use(router)
app.use(VueClipboard)
router.isReady().then(() => app.mount('#app'))
String.prototype.toCamelCase = function () {
    return (this.slice(0, 1).toLowerCase() + this.slice(1))
        .replace(/([-_ ]){1,}/g, ' ')
        .split(/[-_ ]/)
        .reduce((cur, acc) => {
            return cur + acc[0].toUpperCase() + acc.substring(1)
        })
}
const getApiURL = () => {
    if (import.meta.env.VITE_LOCAL_API === `yes`) {
        return import.meta.env.VITE_API_URL.trim()
    }
    const cname = import.meta.env.PROD
        ? `prod-api.trivialsec.com`
        : `dev-api.trivialsec.com`
    const request = new XMLHttpRequest()
    request.open('GET', `https://dns.google/resolve?name=${cname}`, false) // `false` makes the request synchronous
    request.send(null)
    const apiUrl = request.responseText.trim()
    if (request.status !== 200) {
        return import.meta.env.VITE_API_URL.trim()
    }
    return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl
}
window.Api = {
    apiUrl: getApiURL(),
    get: async (uriPath, options = {}) => {
        const { timeout = 15000 } = options
        const urlPath = `${Api.apiUrl}${uriPath}`
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        const Authorization = localStorage.getItem('/session/bearer_token')
            ? `Bearer ${localStorage.getItem('/session/bearer_token')}`
            : ''
        options.headers = Object.assign(options.headers || {}, {
            Authorization
        })
        const response = await fetch(urlPath, {
            ...options,
            signal: controller.signal
        })
        clearTimeout(id)
        if (response.status === 401) {
            localStorage.clear()
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
        const urlPath = `${Api.apiUrl}${uriPath}`
        const body = JSON.stringify(data)
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        const Authorization = localStorage.getItem('/session/bearer_token')
            ? `Bearer ${localStorage.getItem('/session/bearer_token')}`
            : ''
        options.headers = Object.assign(options.headers || {}, {
            Authorization,
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json'
        })
        if (!options.cache) {
            options.cache = 'no-cache'
        }
        const response = await fetch(urlPath, {
            ...options,
            method: 'POST',
            body,
            signal: controller.signal
        })
        clearTimeout(id)
        if (response.status === 401) {
            localStorage.clear()
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
        const urlPath = `${Api.apiUrl}${uriPath}`
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        const Authorization = localStorage.getItem('/session/bearer_token')
            ? `Bearer ${localStorage.getItem('/session/bearer_token')}`
            : ''
        options.headers = Object.assign(options.headers || {}, {
            Authorization,
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json'
        })
        if (!options.cache) {
            options.cache = 'no-cache'
        }
        const response = await fetch(urlPath, {
            ...options,
            method: 'DELETE',
            signal: controller.signal
        })
        clearTimeout(id)
        if (response.status === 401) {
            localStorage.clear()
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
    const MakeId = (length) => {
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
    const ToastTemplate = (eleId, header, content, autoHide = true) => {
        return `<div id="${eleId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="${
            autoHide ? 'true' : 'false'
        }">
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
                    ToastTemplate(toastId, title, body, delay > 0)
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
            } else if (toastContainer) {
                setTimeout(() => {
                    const toastId = MakeId(5)
                    toastContainer.insertAdjacentHTML(
                        'beforeend',
                        ToastTemplate(toastId, title, body, delay > 0)
                    )
                    const toastEl = document.getElementById(toastId)
                    const toast = new Toast(toastEl, { delay })
                    toast.show()
                }, 1000)
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
                    ToastTemplate(toastId, title, body, delay > 0)
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
