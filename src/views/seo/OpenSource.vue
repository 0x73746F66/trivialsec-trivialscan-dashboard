<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        Open Source / Self-hosting
                    </h1>
                    <div class="font-color-light font-lg-sb">
                        Commercially supported open source, easy to review,
                        customizable, low TCO, you keep it forever, and
                        unrivalled privacy control.
                    </div>
                </div>
            </div>

            <div
                class="col-lg-6 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    We can but don't have to leave you on your own. Our team of
                    expert security professionals provides commercial-grade
                    support, ensuring that you have the help you need when you
                    need it. By leveraging open source software, businesses can
                    reduce the cost of licensing and support, which can help to
                    reduce the overall cost of ownership for the software.
                </p>
                <p>
                    Trivial Security highly regard transparent development
                    practices: By using Git and open sourcing the software that
                    interacts with your systems, development activities are open
                    and transparent, allowing for collaboration and
                    contributions from a large community of developers. This can
                    help to ensure that the software is of high quality and free
                    of bugs. By offering a free version of the software,
                    development is spread over a larger user base, making it
                    more accessible to a wider audience.
                </p>
                <p>
                    Every change made follows continuous integration and
                    deployment via Gitlab and used in conjunction with DevOps
                    practices to automate the software development and
                    deployment process. This can help to ensure that software is
                    delivered to users quickly and with a high degree of
                    reliability.
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
            <div
                class="col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Organizations are increasingly recognizing the importance of
                    self-hosting and controlling their data, and open source
                    software offers a compelling solution. By choosing an
                    on-premise solution based on open source software,
                    organizations can enjoy a range of benefits that go beyond
                    the financial savings of not having to pay licensing fees.
                    One of the key advantages of using open source for
                    on-premise data control is the ability to customize the
                    solution to meet specific requirements. With access to the
                    source code, organizations can modify the software to meet
                    their unique needs, which is often not possible with
                    proprietary solutions. This level of customization also
                    allows for better integration with existing systems and
                    workflows.
                </p>
                <p>
                    Another benefit of using open source for on-premise data
                    control is improved security. By self-hosting data,
                    organizations can have full control over their data and the
                    security measures in place to protect it. Additionally, the
                    large community of developers working on open source
                    software means that vulnerabilities are often discovered and
                    addressed quickly, making open source solutions a secure
                    choice. On-premise solutions also offer increased data
                    privacy. By self-hosting data, organizations can ensure that
                    their data is not being shared or sold to third parties.
                    This is particularly important for organizations handling
                    sensitive information.
                </p>
                <p>
                    Finally, open source solutions offer greater reliability and
                    freedom compared to proprietary solutions. The large
                    community of developers ensures that open source solutions
                    are constantly evolving and improving, while the lack of
                    vendor lock-in means that organizations are free to continue
                    using the solution even if the vendor goes out of business.
                </p>
                <p>
                    We've taken the best of open source and combined it with the
                    reliability and support of a commercial solution. You get
                    the security you need without sacrificing quality or
                    control. Get started now and take control of your security.
                </p>
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
