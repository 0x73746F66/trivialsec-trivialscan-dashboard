<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">Active Scanning</h1>
                    <div class="font-color-light font-lg-sb">
                        Validate your exposures by taking identified issues and
                        miss-configurations to the next stage of testing with
                        proof-of-concept scripts
                    </div>
                </div>
            </div>

            <div
                class="col-lg-3 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <div class="font-sm-sb margin-bottom-sm">
                    Passive or Active, So what's the difference?
                </div>
                <p>
                    Passive checks use fingerprinting techniques to determine
                    the software version in use, while active checks dynamically
                    check for known exploits, where it is safe to do so. Our
                    methodology allows anyone to assess often overlooked server
                    configurations without having to become experts.
                </p>
                <p>
                    While many issues can be obvious with an observation; what
                    we in cybersecurity call 'Passive' - there are many others
                    that lack a fingerprint (what is observable and verifiable)
                    without direct testing also called an 'Active' scan
                    activity.
                </p>
            </div>
            <div
                class="col-lg-9 d-flex justify-content-center col-12 margin-bottom-xl feature-image-container"
                @click="imagePopOut($event)"
                data-bs-toggle="modal"
                :data-bs-target="`#${imagePopOutId}`"
            >
                <img
                    class="img-fluid feature-image"
                    src="../../assets/media/dashboard.png"
                    alt="Description of image"
                />
            </div>

            <div
                class="col-lg-3 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Vulnerability scanners are designed to run non-destructive
                    security scans and are obviously not malicious in intent.
                    Their actions can affect a web application negatively. This
                    point is particularly important if you scan a production
                    environment. You may experience performance issues or find
                    lots of emails in your inbox.
                </p>
                <p>
                    Using only non-invasive techniques does not allow the
                    scanner to identify the real potential intrusion points that
                    attackers can use. These attackers use any and all tools and
                    vectors available to them while trying to exploit
                    vulnerabilities in a website. So, we will try to identify
                    points of entry with the same level of effectiveness as
                    attackers could.
                </p>
            </div>
            <div
                class="col-lg-9 d-flex justify-content-center col-12 margin-bottom-xl feature-image-container"
                @click="imagePopOut($event)"
                data-bs-toggle="modal"
                :data-bs-target="`#${imagePopOutId}`"
            >
                <img
                    class="img-fluid feature-image"
                    src="../../assets/media/dashboard.png"
                    alt="Description of image"
                />
            </div>

            <div class="col-12 padding-top-sm margin-bottom-lg">
                <h3 class="font-color-light font-xl-sb">
                    How Active Scanning works
                </h3>
                <div
                    class="font-sm d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
                >
                    <span class="font-color-lighter">
                        <div class="font-sm-sb margin-bottom-xs">
                            Firstly, what do you want out of the scanning
                            activity?
                        </div>
                        <p>
                            Organisations that invest time and effort into
                            scanning (free or paid) all want the same general
                            outcome; Relevant results that are valid (not false
                            positives).
                        </p>
                        <p>
                            Active scanning works by sending test traffic that
                            is different from a typical user. However, this
                            increases the risk of malfunction of endpoints
                            because sending incompatible or unhandled queries
                            inherently is unknown to both the organisation and
                            the tester (no matter what assurances anyone gives
                            you, it's inherent because you can't prove a
                            negative in advance)
                        </p>
                        <p>
                            Trivial Security never perform active scanning on
                            any endpoint that has not yet completed an ownership
                            verification on the host's DNS, preventing abuse of
                            our services by malicious users. Our tools are open
                            source and all evaluation code can be reviewed. We
                            also exhaust all known passive scanning options (no
                            matter how complicated) before we add the active
                            scan evaluations, reluctantly. Even preferring to
                            not include an active evaluation at all unless it
                            provides significant customer benefit for the risk
                            (minimal risk it may be).
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
export default {
    components: {
        Dropdown,
        FeatureSlider,
        Modal
    },
    data() {
        return {
            imagePopOutId: 'imagePopOut',
            imagePopOutDesc: '',
            imagePopOutUrl: '',
            logged_in: false,
            links: [
                {
                    label: 'Trivial Security vs ImmuniWeb vs Qualys SSL Labs',
                    href: '/article/trivial-scanner-vs-immuniweb-vs-qualys'
                },
                {
                    label: 'Trivial Scanner vs SSLyze vs testssl.sh',
                    href: '/article/trivial-scanner-vs-sslyze-vs-testssl'
                },
                {
                    label: 'How most SSL/TLS scanners are more harmful than helpful',
                    href: '/article/how-most-ssl-tls-scanners-are-harmful'
                }
            ],
            FAQs: [
                {
                    question: 'What is SSL/TLS?',
                    answer: marked(WhatIsTLS)
                },
                {
                    question: 'What is a Certificate?',
                    answer: marked(WhatIsACert)
                },
                {
                    question: 'What are the impacts of vulnerabilities?',
                    answer: marked(VulnerabilityImpacts)
                },
                {
                    question: 'What is a host?',
                    answer: marked(WhatIsAHost)
                },
                {
                    question: 'How often does the host monitor run?',
                    answer: marked(HostMonitoringFrequency)
                },
                {
                    question: 'Can the scanner login to our systems?',
                    answer: marked(AppLoginFeature)
                },
                {
                    question: 'How much scan volume do you send?',
                    answer: marked(ScanVolume)
                },
                {
                    question: 'Can we opt-out or otherwise block the scanner?',
                    answer: marked(BlockScanner)
                },
                {
                    question: 'How many evaluations are performed?',
                    answer: marked(EvaluationCount)
                },
                {
                    question: 'Can additional rule evaluations be added?',
                    answer: marked(CustomEvaluations)
                },
                {
                    question: 'How to report suspected abuse?',
                    answer: marked(ReportAbuse)
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
</style>
