<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md" v-if="slug">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        {{ titles[slug] }}
                    </h1>
                </div>
            </div>

            <div
                class="col-12 feature-container margin-bottom-md font-color-light"
                v-if="slug"
                v-html="articles[slug]"
            ></div>

            <div class="col-12 feature-container margin-bottom-md" v-else>
                Article does not exist
            </div>

            <div class="col-12 col-lg-6 sendgrid-embed">
                <div class="font-color-primary font-base-sb margin-left-sm">
                    Leave us your information below, and we will get in contact
                    with you shortly
                </div>
                <div class="font-color-light margin-left-sm">
                    For something a bit more instant there are instant messaging
                    and voice chat options in the bottom of the page
                </div>
                <iframe
                    title="Sendgrid contact form"
                    seamless="seamless"
                    height="100%"
                    src="https://cdn.forms-content.sg-form.com/05ba6de3-5bd7-11ed-9441-a2114a0392f3"
                />
            </div>
            <div class="col-12 col-lg-6 margin-bottom-lg">
                <div
                    class="container padding-bottom-xl padding-top-xl"
                    v-if="!logged_in"
                >
                    <LoginOrRegister
                        loginModalId="loginModal"
                        registerModalId="registerLogin"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import LoginOrRegister from '@/components/general/LoginOrRegister.vue'
import { marked } from 'marked'
import TrivialScannerVsSslyzeVsTestssl from '@/views/seo/articles/trivial-scanner-vs-sslyze-vs-testssl.md?raw'
import TrivialScannerVsImmuniWebVsQualys from '@/views/seo/articles/trivial-scanner-vs-immuniweb-vs-qualys.md?raw'
import HowMostSSLTLSScannersAreHarmful from '@/views/seo/articles/how-most-ssl-tls-scanners-are-harmful.md?raw'
</script>

<script>
export default {
    components: {
        LoginOrRegister
    },
    data() {
        return {
            logged_in: false,
            slug: '',
            titles: {
                'trivial-scanner-vs-sslyze-vs-testssl':
                    'Trivial Scanner vs SSLyze vs testssl.sh',
                'trivial-scanner-vs-immuniweb-vs-qualys':
                    'Trivial Scanner vs ImmuniWeb vs Qualys SSL Labs',
                'how-most-ssl-tls-scanners-are-harmful':
                    'How most SSL/TLS scanners are more harmful than helpful'
            },
            articles: {
                'trivial-scanner-vs-sslyze-vs-testssl': marked(
                    TrivialScannerVsSslyzeVsTestssl
                ),
                'trivial-scanner-vs-immuniweb-vs-qualys': marked(
                    TrivialScannerVsImmuniWebVsQualys
                ),
                'how-most-ssl-tls-scanners-are-harmful': marked(
                    HowMostSSLTLSScannersAreHarmful
                )
            }
        }
    },
    created() {
        this.logged_in = !!localStorage.getItem('/session/key')
        this.slug = this.$route.params.slug
    }
}
</script>

<style scoped lang="scss">
.sendgrid-embed {
    padding: 0;
    margin: 0;

    iframe {
        padding: 0;
        margin: 0;
        min-width: 430px;
        height: 520px;
        border: none;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
}
</style>
