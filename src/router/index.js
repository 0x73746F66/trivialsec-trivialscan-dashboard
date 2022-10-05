import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      // TODO with email address POST /login/magic_link
      // sends email with magic link to login
      component: LoginView,
    },
    {
      path: "/login/:magic_link",
      name: "magic_link",
      beforeEnter: () => {
        // TODO call GET /login/magic_link
        // TODO response includes api_key that must be stored for HMAC
        window.location.href = "/"
      },
    },
    {
      path: "/logout",
      name: "logout",
      meta: {
        title: "Redirect to trivialsec.com",
      },
      beforeEnter: () => {
        // TODO actually log out
        window.location.href = "https://www.trivialsec.com"
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/results",
      name: "results",
      component: () => import("../views/ListSummariesView.vue"),
    },
    {
      path: "/result/:report_id",
      name: "result",
      redirect: to => {
        return { name: "summary", params: { report_id: to.params.report_id } }
      },
    },
    {
      path: "/result/:report_id/summary",
      name: "summary",
      component: () => import("../views/SummaryView.vue"),
    },
    {
      path: "/result/:report_id/detail",
      name: "detail",
      component: () => import("../views/DetailView.vue"),
    },
    {
      path: "/hostname/:hostname",
      name: "hostname",
      redirect: to => {
        return { name: "hostname_port", params: { hostname: to.params.hostname, port: 443 } }
      },
    },
    {
      path: "/hostname/:hostname/:port",
      name: "hostname_port",
      component: () => import("../views/HostnameView.vue"),
    },
    {
      path: "/certificate/:sha1_fingerprint",
      name: "certificate",
      component: () => import("../views/CertificateView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    // const auth = useAuthStore();

    // if (authRequired && !auth.user) {
    //     auth.returnUrl = to.fullPath;
    //     return '/login';
    // }
});
export default router;
