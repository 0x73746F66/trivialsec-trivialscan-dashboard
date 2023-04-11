<template>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-2">
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
                            <a
                                href="https://docs.trivialsec.com"
                                v-if="!$store.getItem('/session/key')"
                                class="margin-bottom-xs font-color-light-60 text-decoration-none"
                            >
                                Documentation
                            </a>
                            <a
                                v-if="!$store.getItem('/session/key')"
                                class="margin-bottom-xs font-color-light-60 text-decoration-none"
                                :href="docsUrl"
                                target="_blank"
                                >API Reference</a
                            >
                            <a
                                v-if="!$store.getItem('/session/key')"
                                class="margin-bottom-xs font-color-light-60 text-decoration-none"
                                href="https://discord.gg/BgqUw8Tu6a"
                                target="_blank"
                                >Chat with a real person</a
                            >
                            <RouterLink
                                :to="{
                                    name: 'articles',
                                    params: {
                                        slug: 'commitment-to-sustainable-practices'
                                    }
                                }"
                                class="margin-bottom-xs font-color-light-60 text-decoration-none"
                                >Environmental Sustainability</RouterLink
                            >
                            <RouterLink
                                v-if="!!$store.getItem('/session/key')"
                                :to="{ name: 'about' }"
                                class="margin-bottom-xs font-color-light-60 text-decoration-none"
                                >About Us</RouterLink
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
                            class="text-decoration-none margin-bottom-md"
                            href="https://discord.gg/BgqUw8Tu6a"
                            target="_blank"
                        >
                            <span class="font-lg-sb font-color-light">
                                Need Support?
                            </span>
                        </a>
                        <a
                            href="https://docs.trivialsec.com"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                        >
                            Documentation
                        </a>
                        <a
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            :href="docsUrl"
                            target="_blank"
                            >API Reference</a
                        >
                        <RouterLink
                            v-if="!!$store.getItem('/session/key')"
                            :to="{ name: 'support' }"
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
                            :to="{ name: 'about' }"
                            class="text-decoration-none margin-bottom-md"
                        >
                            <span class="font-lg-sb font-color-light">
                                Why us?
                            </span>
                        </RouterLink>
                        <RouterLink
                            :to="{ name: 'use-case-executives' }"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >C-level executives</RouterLink
                        >
                        <RouterLink
                            :to="{ name: 'use-case-security' }"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Security and IT professionals</RouterLink
                        >
                        <RouterLink
                            :to="{ name: 'use-case-compliance' }"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Compliance and legal professionals</RouterLink
                        >
                        <RouterLink
                            :to="{ name: 'use-case-financial' }"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Insurance & Financial</RouterLink
                        >
                        <RouterLink
                            :to="{ name: 'use-case-public-sector' }"
                            class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                            >Public Sector</RouterLink
                        >
                    </div>
                </div>
                <div class="col-12 w-100 text-center margin-bottom-sm">
                    <RouterLink
                        :to="{ name: 'terms' }"
                        class="font-sm font-color-light text-decoration-none"
                        >Terms & Conditions</RouterLink
                    >
                    <span class="font-color-light"> | </span>
                    <RouterLink
                        :to="{ name: 'privacy' }"
                        class="font-sm font-color-light text-decoration-none"
                        >Privacy Policy</RouterLink
                    >
                </div>
                <div class="col-12 w-100 font-sm text-center font-color-light">
                    &copy; {{ new Date().getFullYear() }}
                    <span class="hover-help" title="ABN; 19 655 146 071"
                        >Trivial Security </span
                    >Pty Ltd<span class="font-color-light"> | </span
                    ><span class="hover-help" title="ABN; 87 664 888 386"
                        >Trivial Group </span
                    >Pty Ltd
                </div>
                <div class="col-12 w-100 font-sm text-center font-color-light">
                    All rights reserved
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
    background: rgb(26 22 22);
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
