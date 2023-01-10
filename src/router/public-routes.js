import HomeView from '@/views/HomeView.vue'

let apiUrl = import.meta.env.VITE_API_URL.trim()
apiUrl = `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}`

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/logout',
        name: 'logout',
        beforeEnter: (to, from, next) => {
            localStorage.setItem('/account/name', '')
            localStorage.setItem('/account/display', '')
            localStorage.setItem('/member/email', '')
            localStorage.setItem('/member/email_md5', '')
            localStorage.setItem('/session/key', '')
            window.location.href = '/'
        }
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: () => import('@/views/PricingView.vue')
    },
    {
        path: '/docs',
        name: 'docs',
        component: () => import('@/views/DocsView.vue')
    },
    {
        path: '/login/:magic_link',
        name: 'magic_link',
        beforeEnter: async (to, from, next) => {
            const response = await fetch(
                `${apiUrl}/magic-link/${to.params.magic_link}`
            ).catch((errors) => {
                console.error(errors)
                setTimeout(() => window.user_notify(`Errors`, errors), 3000)
            })
            if (response.status !== 200) {
                const errMessage =
                    response.status === 204
                        ? `This 1-time use magic link has already been used`
                        : `An error occurred and has been logged`
                setTimeout(
                    () =>
                        window.user_notify(
                            `${response.status} ${response.statusText}`,
                            errMessage
                        ),
                    3000
                )
            } else {
                const data = await response.json()
                localStorage.setItem(
                    '/account/name',
                    data?.member?.account?.name ||
                        localStorage.getItem('/account/name')
                )
                localStorage.setItem(
                    '/account/display',
                    data?.member?.account?.display ||
                        localStorage.getItem('/account/display')
                )
                localStorage.setItem(
                    '/member/email',
                    data?.member?.email || localStorage.getItem('/member/email')
                )
                localStorage.setItem(
                    '/member/email_md5',
                    data?.member?.email_md5 ||
                        localStorage.getItem('/member/email_md5')
                )
                localStorage.setItem(
                    '/session/key',
                    data?.access_token || localStorage.getItem('/session/key')
                )
            }
            window.initPusher()
            if (localStorage.getItem('/session/key')) {
                next('/profile')
            } else {
                next('/')
            }
        }
    },
    {
        path: '/accept/:token',
        name: 'accept_link',
        beforeEnter: async (to, from, next) => {
            const response = await fetch(
                `${apiUrl}/accept/${to.params.token}`
            ).catch((errors) => {
                console.error(errors)
                setTimeout(() => window.user_notify(`Errors`, errors), 3000)
            })
            if (response.status !== 202) {
                const errMessage =
                    response.status === 204
                        ? `This 1-time use token has already been used`
                        : `An error occurred and has been logged`
                setTimeout(
                    () =>
                        window.user_notify(
                            `${response.status} ${response.statusText}`,
                            errMessage
                        ),
                    3000
                )
            }
            if (localStorage.getItem('/session/key')) {
                next('/profile')
            } else {
                next('/')
            }
        }
    },
    {
        path: '/feature/patch-alert',
        name: 'feature-patch-alert',
        component: () => import('@/views/seo/PatchAlert.vue')
    },
    {
        path: '/feature/passive-scan',
        name: 'feature-passive-scan',
        component: () => import('@/views/seo/PassiveScanner.vue')
    },
    {
        path: '/feature/active-scan',
        name: 'feature-active-scan',
        component: () => import('@/views/seo/ActiveScanner.vue')
    },
    {
        path: '/feature/early-warning',
        name: 'early-warning-service',
        component: () => import('@/views/seo/EarlyWarning.vue')
    },
    {
        path: '/feature/trivial-attacks',
        name: 'feature-trivial-attacks',
        component: () => import('@/views/seo/TrivialAttacks.vue')
    },
    {
        path: '/feature/threat-intel',
        name: 'feature-threat-intel',
        component: () => import('@/views/seo/ThreatIntel.vue')
    },
    {
        path: '/feature/security-feeds',
        name: 'feature-security-feeds',
        component: () => import('@/views/seo/SecurityFeeds.vue')
    },
    {
        path: '/feature/webhooks',
        name: 'feature-webhooks',
        component: () => import('@/views/seo/EventFirehose.vue')
    },
    {
        path: '/feature/developer-tools',
        name: 'feature-devtools',
        component: () => import('@/views/seo/DevTools.vue')
    },
    {
        path: '/feature/researchers',
        name: 'feature-researchers',
        component: () => import('@/views/seo/SecurityResearchers.vue')
    },
    {
        path: '/feature/phishing-alerts',
        name: 'feature-phishing-alerts',
        component: () => import('@/views/seo/PhishingAlerts.vue')
    },
    {
        path: '/feature/open-source',
        name: 'feature-open-source',
        component: () => import('@/views/seo/OpenSource.vue')
    },
    {
        path: '/feature/interoperability',
        name: 'feature-interoperability',
        component: () => import('@/views/seo/Interoperability.vue')
    }
]

export default routes
