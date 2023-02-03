<template>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 margin-bottom-lg col-lg-2">
                    <IconTrivialSecurity
                        alt="Trivial Security"
                        class=""
                        width="50"
                        height=""
                    />
                    <div class="footer-social margin-top-md padding-top-md">
                        <a
                            target="_blank"
                            href="https://gitlab.com/trivialsec"
                            class="text-decoration-none footer-social-gitlab font-sm nowrap font-color-light"
                        >
                            <IconGitlab
                                color="1abb9c"
                                class="margin-right-xxs"
                            />
                            Check out our open source projects on Gitlab
                        </a>
                        <div class="d-flex flex-column margin-top-xs font-sm">
                            <RouterLink
                                to="/docs"
                                class="margin-bottom-xs font-color-light-60 text-decoration-none"
                                >Documentation</RouterLink
                            >
                            <a
                                class="margin-bottom-xs font-color-light-60 text-decoration-none"
                                :href="docsUrl"
                                target="_blank"
                                >API Reference</a
                            >
                            <a
                                class="margin-bottom-xs font-color-light-60 text-decoration-none"
                                href="https://discord.gg/BgqUw8Tu6a"
                                target="_blank"
                                >Chat with a real person</a
                            >
                        </div>
                    </div>
                </div>
                <div
                    class="col-6 col-lg-7 d-flex flex-lg-row flex-column justify-content-end"
                >
                    <div class="d-flex flex-column">
                        <span
                            class="font-lg-sb font-color-light margin-bottom-md"
                            >Social</span
                        >
                        <a
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            href="https://mastodon.au/@trivialsec"
                            target="_blank"
                        >
                            <IconMastodon
                                color="1abb9c"
                                class="margin-right-xxs"
                            />Mastodon
                        </a>
                        <a
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            href="https://discord.gg/BgqUw8Tu6a"
                            target="_blank"
                        >
                            <IconDiscord
                                color="1abb9c"
                                class="margin-right-xxs"
                            />Discord
                        </a>
                        <a
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            href="https://www.linkedin.com/company/trivialsec"
                            target="_blank"
                        >
                            <IconLinkedin
                                color="1abb9c"
                                class="margin-left-xxs margin-right-xs"
                            />LinkedIn
                        </a>
                        <a
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            href="https://twitter.com/TrivialSec"
                            target="_blank"
                        >
                            <IconTwitter
                                color="1abb9c"
                                class="margin-left-xxs margin-right-xs"
                            />Twitter
                        </a>
                    </div>
                </div>
                <div
                    v-if="!!$store.getItem('/session/key')"
                    class="col-6 col-lg-3 d-flex flex-lg-row flex-column justify-content-end"
                >
                    <div class="d-flex flex-column">
                        <a
                            class="text-decoration-none"
                            href="https://discord.gg/BgqUw8Tu6a"
                            target="_blank"
                        >
                            <span
                                class="font-lg-sb font-color-light margin-bottom-md"
                            >
                                Need Support?
                            </span>
                        </a>
                        <RouterLink
                            to="/docs"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Documentation</RouterLink
                        >
                        <a
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            :href="docsUrl"
                            target="_blank"
                            >API Reference</a
                        >
                        <RouterLink
                            v-if="!!$store.getItem('/session/key')"
                            to="/support"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Support Request</RouterLink
                        >
                        <a
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            href="https://discord.gg/BgqUw8Tu6a"
                            target="_blank"
                            >Chat with a real person</a
                        >
                    </div>
                </div>
                <div
                    v-if="!$store.getItem('/session/key')"
                    class="col-6 col-lg-3 d-flex flex-lg-row flex-column justify-content-end"
                >
                    <div class="d-flex flex-column">
                        <RouterLink
                            to="/about"
                            class="text-decoration-none margin-bottom-md"
                        >
                            <span class="font-lg-sb font-color-light">
                                Why us?
                            </span>
                        </RouterLink>
                        <RouterLink
                            to="/use-cases/executives"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >C-level executives</RouterLink
                        >
                        <RouterLink
                            to="/use-cases/security-engineers"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Security and IT professionals</RouterLink
                        >
                        <RouterLink
                            to="/use-cases/compliance"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Compliance and legal professionals</RouterLink
                        >
                        <RouterLink
                            to="/use-cases/financial"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Insurance & Financial</RouterLink
                        >
                        <RouterLink
                            to="/use-cases/public-sector"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Public Sector</RouterLink
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import IconTrivialSecurity from '@/components/icons/IconTrivialSecurity.vue'
import IconGitlab from '@/components/icons/IconGitlab.vue'
import IconDiscord from '@/components/icons/IconDiscord.vue'
import IconMastodon from '@/components/icons/IconMastodon.vue'
import IconLinkedin from '@/components/icons/IconLinkedin.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
</script>

<script>
const apiUrl = import.meta.env.VITE_API_URL.trim()
export default {
    data() {
        return {
            docsUrl: `${
                apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl
            }/redoc`
        }
    },
    components: {
        IconTrivialSecurity,
        IconGitlab,
        IconDiscord,
        IconMastodon,
        IconLinkedin,
        IconTwitter
    }
}
</script>
<style lang="scss">
.footer {
    background: color('dark-40');
    padding: spacers('md');

    &-social {
        border-top: 1px solid color('light');
    }

    &-social-link {
        margin-right: spacers('sm');
        width: 30px;

        &[title] {
            border-bottom: none;
        }
    }

    &-social-gitlab {
        display: inline-flex;
        align-items: center;
    }

    @media (max-width: breakpoints('lg')) {
        flex-direction: column;
    }
}
</style>
