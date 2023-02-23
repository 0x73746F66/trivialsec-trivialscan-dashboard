<template>
    <div class="router-link-container margin-top-sm">
        <RouterLink
            :to="{ name: 'profile' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconAccount color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Account</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'security' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconSession color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Security</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'members' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconMembers color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Members</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'notifications' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconNotificationLight color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Notifications</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'webhooks' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconIntegrationLight color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Webhooks</span>
        </RouterLink>
        <RouterLink
            :to="{ name: 'host-config' }"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconConfigure color="f0f0f0" class="router-link-icon" />
            <span class="router-link-name">Configure</span>
        </RouterLink>
    </div>
</template>

<script setup>
import IconAccount from '@/components/icons/IconAccount.vue'
import IconSession from '@/components/icons/IconSession.vue'
import IconMembers from '@/components/icons/IconMembers.vue'
import IconNotificationLight from '@/components/icons/IconNotificationLight.vue'
import IconIntegrationLight from '@/components/icons/IconIntegrationLight.vue'
import IconConfigure from '@/components/icons/IconConfigure.vue'
</script>

<script>
export default {
    components: {
        IconAccount,
        IconSession,
        IconMembers,
        IconNotificationLight,
        IconIntegrationLight,
        IconConfigure
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
