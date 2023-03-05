<template>
    <div class="router-link-container margin-top-sm">
        <RouterLink
            :to="{ name: 'reports' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconReport color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Reports</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'hosts' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconTarget color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Hosts</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'findings' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconScan1Light color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Findings</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'certificate-issues' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconCertificate color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Certificates</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'compliance' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconDashboard color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Compliance</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'early-warning-service' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconAlarmLight color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Early Warning</span>
        </RouterLink>
    </div>
</template>

<script setup>
import IconCertificate from '@/components/icons/IconCertificate.vue'
import IconTarget from '@/components/icons/IconTarget.vue'
import IconReport from '@/components/icons/IconReport.vue'
import IconDashboard from '@/components/icons/IconDashboard.vue'
import IconScan1Light from '@/components/icons/IconScan1Light.vue'
import IconAlarmLight from '@/components/icons/IconAlarmLight.vue'
</script>

<script>
export default {
    components: {
        IconCertificate,
        IconTarget,
        IconReport,
        IconDashboard,
        IconScan1Light,
        IconAlarmLight
    }
}
</script>

<style scoped lang="scss">
.router-link-container {
    display: flex;
    flex-direction: column;
    width: 15%;
    height: calc(100vh - var(--bs-gutter-x));
    position: fixed;
    left: 0;
    font-size: sizes('base');
    font-weight: 500;

    .router-link {
        &-icon {
            width: 32px;
            height: 32px;
            margin-right: spacers('xs');
        }

        &-item {
            display: flex;
            padding: spacers('xs') spacers('md');
            margin-bottom: spacers('sm');
            align-items: center;

            &:hover {
                color: color('secondary');
            }
        }

        &-active {
            border-radius: spacers('md');
            background: color('primary-60');
        }
    }
}
@media screen and (min-width: 1360px) and (max-width: 1368px),
    screen and (min-width: 1020px) and (max-width: 1024px),
    screen and (min-width: 1175px) and (max-width: 1180px),
    screen and (min-width: 1110px) and (max-width: 1114px),
    screen and (min-width: 1278px) and (max-width: 1280px) {
    .router-link-name {
        display: none;
    }
    .router-link-container {
        max-width: fit-content;
        overflow-x: hidden;
        z-index: -1;
        .router-link-icon {
            margin-right: 0;
        }
    }
}
@media screen and (min-width: 100px) and (max-width: 980px) {
    .router-link-container {
        display: flex;
        flex-direction: column;
        position: inherit;
        width: auto;
        height: auto;

        .router-link {
            &-icon {
                width: 17px;
                height: 17px;
                margin-top: 3px;
                font-size: sizes('sm');
            }
            &-item {
                padding: 5px 15px;
                border: 1px solid color('primary-40');
                border-radius: spacers('md');
            }
        }
    }
}
</style>
