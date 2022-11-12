import HomeView from "@/views/HomeView.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/logout",
        name: "logout",
        beforeEnter: () => {
            localStorage.setItem("/account/name", "")
            localStorage.setItem("/account/display", "")
            localStorage.setItem("/member/email", "")
            localStorage.setItem("/member/email_md5", "")
            localStorage.setItem("/session/key", "")
            window.location.href = "/"
        },
    },
    {
        path: "/docs",
        name: "docs",
        component: () => import("@/views/DocsView.vue"),
    },
    {
        path: "/login/:magic_link",
        name: "magic_link",
        beforeEnter: async (to) => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/magic-link/${to.params.magic_link}`
            ).catch((errors) => {
                console.log("errors")
                console.log(errors)
            })
            if (response.status !== 200) {
                alert(`${response.status} ${response.statusText}`)
            } else {
                const data = await response.json()
                localStorage.setItem(
                    "/account/name",
                    data?.member?.account?.name || localStorage.getItem("/account/name")
                )
                localStorage.setItem(
                    "/account/display",
                    data?.member?.account?.display ||
                    localStorage.getItem("/account/display")
                )
                localStorage.setItem(
                    "/member/email",
                    data?.member?.email || localStorage.getItem("/member/email")
                )
                localStorage.setItem(
                    "/member/email_md5",
                    data?.member?.email_md5 || localStorage.getItem("/member/email_md5")
                )
                localStorage.setItem(
                    "/session/key",
                    data?.access_token || localStorage.getItem("/session/key")
                )
            }
            if (localStorage.getItem("/session/key")) {
                window.location.href = "/dashboard"
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
                console.log("errors")
                console.log(errors)
            })
            if (response.status !== 202) {
                alert(`${response.status} ${response.statusText}`)
            } else if (localStorage.getItem("/session/key")) {
                window.location.href = "/dashboard"
            } else {
                window.location.href = "/"
            }
        },
    },
    // {
    //     path: "/feature/patch-alert",
    //     name: "feature-patch-alert",
    //     component: () => import("@/views/seo/PatchAlert.vue"),
    // },
    {
        path: "/feature/passive-scan",
        name: "feature-passive-scan",
        component: () => import("@/views/seo/PassiveScanner.vue"),
    },
    {
        path: "/feature/active-scan",
        name: "feature-active-scan",
        component: () => import("@/views/seo/ActiveScanner.vue"),
    },
    // {
    //     path: "/feature/trivial-attacks",
    //     name: "feature-trivial-attacks",
    //     component: () => import("@/views/seo/TrivialAttacks.vue"),
    // },
    // {
    //     path: "/feature/threat-intel",
    //     name: "feature-threat-intel",
    //     component: () => import("@/views/seo/ThreatIntel.vue"),
    // },
    // {
    //     path: "/feature/security-feeds",
    //     name: "feature-security-feeds",
    //     component: () => import("@/views/seo/SecurityFeeds.vue"),
    // },
    {
        path: "/feature/webhooks",
        name: "feature-webhooks",
        component: () => import("@/views/seo/Firehose.vue"),
    },
    {
        path: "/feature/trivialscan",
        name: "feature-trivialscan",
        component: () => import("@/views/seo/CLI.vue"),
    },
    // {
    //     path: "/feature/researchers",
    //     name: "feature-researchers",
    //     component: () => import("@/views/seo/SecurityResearchers.vue"),
    // },
    // {
    //     path: "/feature/phishing-alerts",
    //     name: "feature-phishing-alerts",
    //     component: () => import("@/views/seo/PhishingAlerts.vue"),
    // },
    {
        path: "/feature/open-source",
        name: "feature-open-source",
        component: () => import("@/views/seo/OpenSource.vue"),
    },
    {
        path: "/feature/interoperability",
        name: "feature-interoperability",
        component: () => import("@/views/seo/Interoperability.vue"),
    },
]

export default routes
