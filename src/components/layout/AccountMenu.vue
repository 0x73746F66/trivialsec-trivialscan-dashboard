<template>
    <div class="router-link-container margin-top-sm">
        <RouterLink
            to="/profile"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconAccount color="f0f0f0" class="router-link-icon" />
            Account
        </RouterLink>
        <RouterLink
            to="/profile/sessions"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconSession color="f0f0f0" class="router-link-icon" />
            My Sessions
        </RouterLink>
        <RouterLink
            to="/account/members"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconMembers color="f0f0f0" class="router-link-icon" />
            Members
        </RouterLink>
        <RouterLink
            to="/profile/notifications"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconNotificationLight color="f0f0f0" class="router-link-icon" />
            Notifications
        </RouterLink>
        <RouterLink
            to="/account/webhooks"
            class="router-link-item font-color-light text-decoration-none"
        >
            <IconWebhooks color="f0f0f0" class="router-link-icon" />
            Webhooks
        </RouterLink>
    </div>
</template>

<script setup>
import IconAccount from '@/components/icons/IconAccount.vue'
import IconSession from '@/components/icons/IconSession.vue'
import IconMembers from '@/components/icons/IconMembers.vue'
import IconNotificationLight from '@/components/icons/IconNotificationLight.vue'
import IconWebhooks from '@/components/icons/IconWebhooks.vue'
</script>

<script>
export default {
    components: {
        IconAccount,
        IconSession,
        IconMembers,
        IconNotificationLight,
        IconWebhooks
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
