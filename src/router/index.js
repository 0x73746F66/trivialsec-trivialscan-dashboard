import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/logout",
      name: "logout",
      meta: {
        title: "Redirect to trivialsec.com",
      },
      beforeEnter: () => {
        // TODO actually log out
        window.location.href = "https://www.trivialsec.com";
      },
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
      component: () => import("../views/HostnameView.vue"),
    },
    {
      path: "/certificate/:sha1_fingerprint",
      name: "certificate",
      component: () => import("../views/CertificateView.vue"),
    },
  ],
});

export default router;
