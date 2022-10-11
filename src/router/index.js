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
      beforeEnter: to => {
        fetch(`${import.meta.env.VITE_API_URL}/magic-link/${to.params.magic_link}`)
        .then(response => {
          if (response.status !== 200) {
            throw Error(response.statusText)
          }
          return response.json()
        })
        .then(member => {
          console.log('member')
          console.log(member)
          //TODO: save member to vue3 store backed by localStorage
          localStorage.setItem('/account/name', member?.account?.name)
          localStorage.setItem('/member/email', member?.email)
          localStorage.setItem('/session/key', member?.access_token)
          //TODO: redirect to activities page when created
          window.location.href = '/results'
        })
        .catch(errors => {
          console.log(errors)
        })
      }
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: () => {
        //TODO: use vue3 store backed by localStorage
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
