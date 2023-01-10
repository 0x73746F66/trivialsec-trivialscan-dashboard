const routes = [
    {
        path: '/compliance',
        name: 'compliance',
        component: () => import('@/views/ComplianceView.vue')
    },
    {
        path: '/reports',
        name: 'reports',
        component: () => import('@/views/ReportsView.vue')
    },
    {
        path: '/hosts',
        name: 'hosts',
        component: () => import('@/views/HostsView.vue')
    },
    {
        path: '/findings',
        name: 'findings',
        component: () => import('@/views/FindingsView.vue')
    },
    {
        path: '/certificate-issues',
        name: 'certificate-issues',
        component: () => import('@/views/CertificateIssuesView.vue')
    },
    {
        path: '/result/:report_id',
        name: 'result',
        redirect: (to) => {
            return {
                name: 'detail',
                params: { report_id: to.params.report_id }
            }
        }
    },
    {
        path: '/result/:report_id/detail',
        name: 'detail',
        component: () => import('@/views/DetailView.vue')
    },
    {
        path: '/hostname/:hostname',
        name: 'hostname',
        redirect: (to) => {
            return {
                name: 'hostname_port',
                params: { hostname: to.params.hostname, port: 443 }
            }
        }
    },
    {
        path: '/hostname/:hostname/:port',
        name: 'hostname_port',
        component: () => import('@/views/HostnameView.vue')
    },
    {
        path: '/hostname/:hostname/:port/:version',
        name: 'hostname_version',
        component: () => import('@/views/HostnameView.vue')
    },
    {
        path: '/certificate/:sha1_fingerprint',
        name: 'certificate',
        component: () => import('@/views/CertificateView.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/ProfileView.vue')
    },
    {
        path: '/profile/sessions',
        name: 'sessions',
        component: () => import('@/views/SessionsView.vue')
    },
    {
        path: '/profile/notifications',
        name: 'notifications',
        component: () => import('@/views/NotificationsView.vue')
    },
    {
        path: '/account/members',
        name: 'members',
        component: () => import('@/views/MembersView.vue')
    },
    {
        path: '/account/webhooks',
        name: 'webhooks',
        component: () => import('@/views/WebhooksView.vue')
    },
    {
        path: '/account/host-config',
        name: 'host-config',
        component: () => import('@/views/HostConfigView.vue')
    },
    {
        path: '/support',
        name: 'support',
        component: () => import('@/views/SupportView.vue')
    }
]

export default routes
