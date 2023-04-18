<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        Attack Surface Monitoring
                    </h1>
                    <div class="font-color-light font-lg-sb">
                        Get visibility into all of your Internet-facing
                        certificates and SSL/TLS configurations
                    </div>
                </div>
            </div>

            <div
                class="col-lg-3 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Most organizations lack visibility into their certificates:
                    They don't know where they are, how many they have nor what
                    purpose they serve. This makes certificates difficult to
                    manage.
                </p>
                <p>
                    Identify out-of-policy certificates with weak signatures or
                    key lengths, how many certificates were issued by
                    Certificate Authorities (CAs) that have been vetted and
                    approved per your policy, and how many certificates are
                    self-signed or were issued by CAs that have not been
                    authorized to issue certificates in your environment.
                </p>
                <p>
                    Trivial Scanner reports visually highlight expired and
                    expiring certificates so you can get to the information you
                    need quickly, which certificates require immediate
                    attention, and recommended activities to remediate the
                    issues.
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
                    Get visibility into all of your Internet-facing certificates
                    and SSL/TLS configurations.
                </p>
                <p>
                    Our methodology allows anyone to assess often overlooked
                    server configurations without having to become experts.
                </p>
                <p>
                    Systems administrators may also gain the insights needed to
                    quickly remediate cipher suites, deprecated protocols, and
                    key exchange parameters on the underlying endpoints.
                </p>
                <p>
                    Continuously provides an accurate snapshot of all
                    certificates and TLS vulnerabilities that exist in your
                    environment, correlating certificates and TLS configuration
                    information with compliance and vulnerability data, so that
                    you may prioritize remediation with data driven decisions
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
                    How Passive Scanning works
                </h3>
                <div
                    class="font-sm d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
                >
                    <span class="font-color-lighter">
                        <p>
                            Establish a connection via various protocols to
                            observe initial response and derive security issue
                            without direct interaction.
                        </p>
                        <p>
                            Observations span a wide spectrum of configuration,
                            implementation, and cryptographic issues of
                            responding server via SSL/TLS protocols, HTTP, and
                            APIs. Our Community Edition provides free testing
                            tools to detect all known security and cryptographic
                            issues in your SSL/TLS-enabled services and also
                            test whether PCI DSS, NIST and FIPS requirements
                            related to SSL are properly implemented. These
                            results are presented with corresponding references,
                            rational, and uses the MITRE ATT&CK framework to map
                            threats to these findings.
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
                    question: 'What are the types of SSL certificates?',
                    answer: marked(TypesOfCertificates)
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
.feature-image-container {
    box-shadow: rgb(0 0 0) 0px 20px 30px -10px;
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
