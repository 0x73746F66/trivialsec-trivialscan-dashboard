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
      beforeEnter: async to => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/magic-link/${to.params.magic_link}`)
          .catch(errors => {
            console.log('errors')
            console.log(errors)
          })
        if (response.status !== 200) {
            alert(`${response.status} ${response.statusText}`)
        } else {
          const data = await response.json()
          localStorage.setItem('/account/name', data?.member?.account?.name || localStorage.getItem('/account/name'))
          localStorage.setItem('/account/email_md5', data?.member?.account?.email_md5 || localStorage.getItem('/account/email_md5'))
          localStorage.setItem('/member/email', data?.member?.email || localStorage.getItem('/member/email'))
          localStorage.setItem('/session/key', data?.access_token || localStorage.getItem('/session/key'))
        }
        if (!!localStorage.getItem('/session/key')) {
          window.location.href = '/profile'
        }
      }
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: () => {
        localStorage.setItem('/account/name', "")
        localStorage.setItem('/member/email', "")
        localStorage.setItem('/session/key', "")
        window.location.href = "/"
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
    {
      path: "/support",
      name: "support",
      component: () => import("../views/SupportView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
    if (!to.path.startsWith('/login')) {
      const publicPages = [
        '/',
        '/docs',
        '/privacy'
      ]
      const authRequired = !publicPages.includes(to.path)
      if (authRequired && !localStorage.getItem('/session/key')) {
        return '/'
      }
    }
});
export default router;
