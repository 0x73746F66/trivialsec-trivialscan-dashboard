<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">Trivial Attacks</h1>
                    <div class="font-color-light font-lg-sb">
                        A solution designed to simplify the process of
                        identifying rare and obscure security weaknesses in your
                        systems.
                    </div>
                </div>
            </div>

            <div
                class="col-lg-6 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    We automate the discovery of vulnerabilities via our niche
                    algorithms, allowing you to quickly and accurately identify
                    potential attack vectors that are often overlooked by
                    traditional security tools. For example, weaknesses in trust
                    of TLS, which can allow attackers to intercept or interfere
                    with integrity and confidentially of communications. Our
                    tool provides the capability to detect "Server-Side Request
                    Forgery (SSRF)" vulnerabilities, where attackers can send
                    malicious requests from a vulnerable server to other
                    systems, potentially gaining access to sensitive
                    information.
                </p>
                <p>
                    Our tool can uncover Subdomain Takeover that occurs when a
                    subdomain of a website is no longer being used by the
                    organization and can be claimed by an attacker. For example,
                    if an organization discontinues the use of a subdomain such
                    as "blog.example.com," an attacker can claim ownership of
                    the subdomain and use it for malicious purposes. When we
                    detect these types of weaknesses various alert methods help
                    you take action on the potential security risk.
                </p>
                <p>
                    Another obscure vulnerability that we can uncover is "Typo
                    Squatting." This occurs when an attacker registers a domain
                    name that is similar to a popular website with the intention
                    of tricking users into visiting their site. For example, an
                    attacker may register "examplle.com" instead of
                    "example.com," hoping to trick users who accidentally type
                    the wrong URL. We can detect these types of weaknesses
                    immediately as soon as they are registered and before they
                    can be leveraged for an attack, and alert you to the
                    imminent security event.
                </p>
                <p>
                    Using our specialized tooling will free your organization
                    from the time-consuming task of manual vulnerability
                    scanning and allowing you to focus on more complex security
                    tasks. Whether you're conducting internal assessments or
                    offering niche third-party testing services, Whether you're
                    conducting internal assessments or offering niche
                    third-party testing services, Trivial Security is the ideal
                    tool for discovering rare and obscure vulnerabilities. Get
                    started today with Trivial Security.
                </p>
            </div>
            <div
                class="col-lg-6 d-flex justify-content-center col-12 margin-bottom-xl feature-image-container"
                @click="imagePopOut($event)"
                data-bs-toggle="modal"
                :data-bs-target="`#${imagePopOutId}`"
            >
                <img
                    class="img-fluid feature-image"
                    src="../../assets/media/use-cases-image1.jpg"
                    alt="Description of image"
                />
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
