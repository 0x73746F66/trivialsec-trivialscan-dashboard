import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)
app.config.globalProperties.$log = console.log
app.use(router)
app.mount("#app")
