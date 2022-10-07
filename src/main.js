import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/main.css"

//TODO: retreive from auth
window.dev_secrets = {
    account_name: "trivialsec-test",
    api_token: import.meta.env.VITE_API_TOKEN,
}

const app = createApp(App)
app.config.globalProperties.$log = console.log
app.use(router)
app.mount("#app")
