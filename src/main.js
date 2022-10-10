if (window.location.hostname == 'trivialsec.com') {
    window.location.href = `https://www.trivialsec.com${window.location.pathname}`
}
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const app = createApp(App)
app.config.globalProperties.$log = console.log
app.use(router)
app.mount("#app")
