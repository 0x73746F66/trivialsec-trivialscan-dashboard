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
      path: "/login/:magic_link",
      name: "magic_link",
      beforeEnter: async (to) => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/magic-link/${to.params.magic_link}`
        ).catch((errors) => {
          console.log("errors");
          console.log(errors);
        });
        if (response.status !== 200) {
          alert(`${response.status} ${response.statusText}`);
        } else {
          const data = await response.json();
          localStorage.setItem(
            "/account/name",
            data?.member?.account?.name || localStorage.getItem("/account/name")
          );
          localStorage.setItem(
            "/account/display",
            data?.member?.account?.display ||
              localStorage.getItem("/account/display")
          );
          localStorage.setItem(
            "/member/email",
            data?.member?.email || localStorage.getItem("/member/email")
          );
          localStorage.setItem(
            "/member/email_md5",
            data?.member?.email_md5 || localStorage.getItem("/member/email_md5")
          );
          localStorage.setItem(
            "/session/key",
            data?.access_token || localStorage.getItem("/session/key")
          );
        }
        if (localStorage.getItem("/session/key")) {
          window.location.href = "/profile";
        }
      },
    },
    {
      path: "/accept/:token",
      name: "accept_link",
      beforeEnter: async (to) => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/accept/${to.params.token}`
        ).catch((errors) => {
          console.log("errors");
          console.log(errors);
        });
        if (response.status !== 202) {
          alert(`${response.status} ${response.statusText}`);
        } else if (localStorage.getItem("/session/key")) {
          window.location.href = "/profile";
        } else {
          window.location.href = "/";
        }
      },
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: () => {
        localStorage.setItem("/account/name", "");
        localStorage.setItem("/account/display", "");
        localStorage.setItem("/member/email", "");
        localStorage.setItem("/member/email_md5", "");
        localStorage.setItem("/session/key", "");
        window.location.href = "/";
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
      redirect: (to) => {
        return { name: "summary", params: { report_id: to.params.report_id } };
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
      redirect: (to) => {
        return {
          name: "hostname_port",
          params: { hostname: to.params.hostname, port: 443 },
        };
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
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/support",
      name: "support",
      component: () => import("../views/SupportView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/", "/docs", "/privacy"];
  const publicPrefixes = ["/accept", "/login"];
  const authRequired =
    !publicPages.includes(to.path) &&
    !publicPrefixes.map((i) => to.path.startsWith(i)).includes(true);
  const logged_in = !!localStorage.getItem("/session/key");
  if (authRequired && !logged_in) {
    return "/";
  }
});
export default router;
