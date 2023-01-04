<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">Developer Tools</h1>
                    <div class="font-color-light font-lg-sb">
                        Enhance penetration testing efforts, provide ad-hoc
                        security analysis for M&A, or regular scanning to meet
                        cybersecurity insurance policy obligations.
                    </div>
                </div>
            </div>

            <div
                class="col-lg-3 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Trivial Scanner seamlessly integrates with your CI/CD tools,
                    pipelines, and local development environment workflows.
                    There are 3 developer specific ways to interact with Trivial
                    Security; API, CLI, and Webhooks.
                </p>
                <p>
                    Developers everywhere use open source code because it
                    enables fast development. Trivial Security provides
                    actionable fix advice for code defects, and supports
                    workflows to fix these issues before they are deployed and
                    become vulnerabilities.
                </p>
                <p>
                    Leveraging our API directly you can apply automation that
                    will be custom to your specific workflows, overcoming any
                    incompatibilities with our offerings.
                </p>
                <p>
                    Running scans with the CLI yourself allows you the ability
                    to keep full control over the data collected and customised
                    rule evaluations.
                </p>
            </div>
            <div
                class="col-lg-9 d-flex justify-content-center col-12 margin-bottom-xl feature-image-container"
            >
                <a href="https://asciinema.org/a/548924" target="_blank"
                    ><img
                        class="asciinema-img"
                        src="https://asciinema.org/a/548924.svg"
                /></a>
            </div>

            <div class="col-12 padding-top-sm margin-bottom-lg">
                <h3 class="font-color-light font-xl-sb">
                    How our Developer Tools work
                </h3>
                <div
                    class="font-sm d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
                >
                    <span class="font-color-lighter">
                        <p>
                            Webhooks are delivered with a Content-Type of
                            application/json, with the event payload as JSON in
                            the request body. After your server is configured to
                            receive payloads, it listens for any payload sent to
                            the endpoint you configured. For security reasons,
                            you should limit processing requests to those
                            verified signed-requests as coming from Trivial
                            Security.
                        </p>
                        <p>
                            Our
                            <a
                                class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                                :href="docsUrl"
                                target="_blank"
                            >
                                HTTP API
                            </a>
                            is built using the OpenAPI standard and is utilised
                            for our own production systems, so we keep it
                            well-documented, accurate, and reliable.
                        </p>
                        <p>
                            Running the
                            <a
                                class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
                                href="https://gitlab.com/trivialsec/trivialscan"
                                target="_blank"
                            >
                                Open Source CLI
                            </a>
                            locally tests the code before it is deployed, the
                            HTTP API however can only access public-facing
                            internet connected (deployed) targets. After you
                            install the CLI you must authenticate, then you can
                            get started testing and fixing your vulnerabilities.
                            We recommend always keeping your CLI installation
                            updated to the latest version. You can check which
                            version of the CLI you have installed by running
                            <code>trivial --version</code>.
                        </p>
                    </span>
                </div>
            </div>

            <div class="col-12 padding-top-sm margin-bottom-lg">
                <h3 class="font-color-light font-xl-b">FAQ</h3>
                <Dropdown
                    v-for="(faq, faqIndex) in FAQs"
                    :id="`faq${faqIndex}`"
                    :target="`faq${faqIndex}`"
                    parent="accordion"
                    :defaultShow="false"
                    :defaultCollapsed="true"
                    :key="`${faqIndex}`"
                    buttonClasses="font-lg text-left feature-dropdown font-color-light w-100 d-flex justify-content-left border-none padding-xxs"
                    contentClasses=" bg-dark-20 feature-dropdown-content padding-md font-color-light font-base"
                >
                    <template v-slot:header class="w-100">
                        <div
                            class="font-base-sb d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
                        >
                            <span class="font-color-lighter nowrap">{{
                                faq.question
                            }}</span>
                        </div>
                    </template>

                    <template v-slot:content>
                        <div class="d-flex flex-column align-items-start">
                            <span class="font-xs" v-html="faq.answer"></span>
                        </div>
                    </template>
                </Dropdown>
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
                <h3 class="font-color-light font-base-sb">
                    Additional Resources
                </h3>
                <span class="font-color-light">
                    <ul>
                        <li
                            v-for="(link, linkIndex) in links"
                            :key="`${linkIndex}`"
                        >
                            <a
                                class="text-decoration-none font-color-primary font-sm"
                                :href="link.href"
                                >{{ link.label }}</a
                            >
                        </li>
                    </ul>
                </span>
            </div>
        </div>
        <Modal
            :dialogClass="`modal-fullscreen`"
            :id="imagePopOutId"
            label="pop-out-image"
        >
            <template v-slot:modalContent>
                <img
                    class="pop-out-image"
                    :src="imagePopOutUrl"
                    :alt="imagePopOutDesc"
                />
            </template>
        </Modal>
    </div>
</template>

<script setup>
import Dropdown from '@/components/general/Dropdown.vue'
import FeatureSlider from '@/components/general/FeatureSlider.vue'
import LoginOrRegister from '@/components/general/LoginOrRegister.vue'
import Modal from '@/components/general/Modal.vue'
import { marked } from 'marked'
import WhatIsTLS from '@/views/seo/faq/what-is-tls-ssl.md?raw'
import WhatIsACert from '@/views/seo/faq/what-is-a-certificate.md?raw'
import VulnerabilityImpacts from '@/views/seo/faq/vulnerability-impacts.md?raw'
import TypesOfCertificates from '@/views/seo/faq/types-of-certificates.md?raw'
import WhatIsAHost from '@/views/seo/faq/what-is-a-host.md?raw'
import HostMonitoringFrequency from '@/views/seo/faq/host-monitoring-frequency.md?raw'
import AppLoginFeature from '@/views/seo/faq/app-login-feature.md?raw'
import ScanVolume from '@/views/seo/faq/scan-volume.md?raw'
import BlockScanner from '@/views/seo/faq/block-scanner.md?raw'
import EvaluationCount from '@/views/seo/faq/evaluation-count.md?raw'
import CustomEvaluations from '@/views/seo/faq/custom-evaluations.md?raw'
import ReportAbuse from '@/views/seo/faq/report-abuse.md?raw'
</script>

<script>
const apiUrl = import.meta.env.VITE_API_URL.trim()
export default {
    components: {
        Dropdown,
        FeatureSlider,
        Modal
    },
    data() {
        return {
            docsUrl: `${
                apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl
            }/redoc`,
            imagePopOutId: 'imagePopOut',
            imagePopOutDesc: '',
            imagePopOutUrl: '',
            logged_in: false,
            links: [
                {
                    label: 'Trivial Security vs ImmuniWeb vs Qualys SSL Labs',
                    href: '#'
                },
                {
                    label: 'Trivial Scanner vs SSLyze vs testssl.sh',
                    href: '#'
                },
                {
                    label: 'How most SSL/TLS scanners are more harmful than helpful',
                    href: '#'
                }
            ],
            FAQs: [
                {
                    question: 'What is SSL/TLS?',
                    answer: marked(WhatIsTLS, { sanitize: true })
                },
                {
                    question: 'What is a Certificate?',
                    answer: marked(WhatIsACert, { sanitize: true })
                },
                {
                    question: 'What are the impacts of vulnerabilities?',
                    answer: marked(VulnerabilityImpacts, { sanitize: true })
                },
                {
                    question: 'What are the types of SSL certificates?',
                    answer: marked(TypesOfCertificates, { sanitize: true })
                },
                {
                    question: 'What is a host?',
                    answer: marked(WhatIsAHost, { sanitize: true })
                },
                {
                    question: 'How often does the host monitor run?',
                    answer: marked(HostMonitoringFrequency, { sanitize: true })
                },
                {
                    question: 'Can the scanner login to our systems?',
                    answer: marked(AppLoginFeature, { sanitize: true })
                },
                {
                    question: 'How much scan volume do you send?',
                    answer: marked(ScanVolume, { sanitize: true })
                },
                {
                    question: 'Can we opt-out or otherwise block the scanner?',
                    answer: marked(BlockScanner, { sanitize: true })
                },
                {
                    question: 'How many evaluations are performed?',
                    answer: marked(EvaluationCount, { sanitize: true })
                },
                {
                    question: 'Can additional rule evaluations be added?',
                    answer: marked(CustomEvaluations, { sanitize: true })
                },
                {
                    question: 'How to report suspected abuse?',
                    answer: marked(ReportAbuse, { sanitize: true })
                }
            ]
        }
    },
    created() {
        this.logged_in = !!localStorage.getItem('/session/key')
    },
    methods: {
        imagePopOut(event) {
            const img = event.target.querySelector('img')
            this.imagePopOutUrl = img.src
            this.imagePopOutDesc = img.alt
        }
    }
}
</script>

<style scoped lang="scss">
.pop-out-image {
    width: auto;
    height: 85vh;
}

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
.asciinema-img {
    width: 100%;
    height: 100%;
}
</style>
