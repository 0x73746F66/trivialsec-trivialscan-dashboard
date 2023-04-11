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
        path: '/terms-and-conditions',
        name: 'terms',
        component: () => import('@/views/TermsView.vue')
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: () => import('@/views/PrivacyView.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/login/:magic_link',
        name: 'magic_link',
        component: () => import('@/views/LoginView.vue')
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
        path: '/feature/security-feeds',
        name: 'feature-security-feeds',
        component: () => import('@/views/seo/SecurityFeeds.vue')
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
        path: '/use-cases/executives',
        name: 'use-case-executives',
        component: () => import('@/views/use-case/Executives.vue')
    },
    {
        path: '/use-cases/security-engineers',
        name: 'use-case-security',
        component: () => import('@/views/use-case/SecurityEngineers.vue')
    },
    {
        path: '/use-cases/compliance',
        name: 'use-case-compliance',
        component: () => import('@/views/use-case/Compliance.vue')
    },
    {
        path: '/use-cases/financial',
        name: 'use-case-financial',
        component: () => import('@/views/use-case/Financial.vue')
    },
    {
        path: '/use-cases/public-sector',
        name: 'use-case-public-sector',
        component: () => import('@/views/use-case/PublicSector.vue')
    },
    {
        path: '/article/:slug',
        name: 'articles',
        component: () => import('@/views/ArticlesView.vue')
    }
]

export default routes
