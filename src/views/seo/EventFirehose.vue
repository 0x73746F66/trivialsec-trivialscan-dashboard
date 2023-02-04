<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        Event Firehose (Webhooks)
                    </h1>
                    <div class="font-color-light font-lg-sb">
                        Lorem ipsum dolor sit amet. Est aperiam corrupti in
                        ipsum earum sed eligendi ratione
                    </div>
                </div>
            </div>

            <div
                class="col-lg-3 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Lorem ipsum dolor sit amet. Est aperiam corrupti in ipsum
                    earum sed eligendi ratione sit placeat porro aut obcaecati
                    dolorem. Est laborum provident qui harum rerum quo
                    temporibus quaerat. Vel blanditiis illo qui temporibus
                    dolorum 33 itaque blanditiis et commodi error et molestiae
                    maiores qui omnis illo id ipsam repellendus. Ex consequatur
                    assumenda non laborum nisi sed voluptate illo non atque
                    facilis aut omnis fugit.
                </p>
                <p>
                    Ex explicabo omnis ab nihil rerum non deserunt modi et
                    voluptatibus incidunt. Hic atque quasi aut praesentium
                    inventore sit sapiente quasi. A repellendus facilis est
                    distinctio laborum in distinctio inventore ut voluptas ipsum
                    sit ratione galisum. Et velit eligendi est dolor eius qui
                    omnis sequi.
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
                    Lorem ipsum dolor sit amet. Est aperiam corrupti in ipsum
                    earum sed eligendi ratione sit placeat porro aut obcaecati
                    dolorem. Est laborum provident qui harum rerum quo
                    temporibus quaerat. Vel blanditiis illo qui temporibus
                    dolorum 33 itaque blanditiis et commodi error et molestiae
                    maiores qui omnis illo id ipsam repellendus. Ex consequatur
                    assumenda non laborum nisi sed voluptate illo non atque
                    facilis aut omnis fugit.
                </p>
                <p>
                    Ex explicabo omnis ab nihil rerum non deserunt modi et
                    voluptatibus incidunt. Hic atque quasi aut praesentium
                    inventore sit sapiente quasi. A repellendus facilis est
                    distinctio laborum in distinctio inventore ut voluptas ipsum
                    sit ratione galisum. Et velit eligendi est dolor eius qui
                    omnis sequi.
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
                <h3 class="font-color-light font-xl-sb">How Webhooks work</h3>
                <div
                    class="font-sm d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
                >
                    <span class="font-color-lighter">
                        <p>
                            Lorem ipsum dolor sit amet. Est aperiam corrupti in
                            ipsum earum sed eligendi ratione sit placeat porro
                            aut obcaecati dolorem. Est laborum provident qui
                            harum rerum quo temporibus quaerat. Vel blanditiis
                            illo qui temporibus dolorum 33 itaque blanditiis et
                            commodi error et molestiae maiores qui omnis illo id
                            ipsam repellendus. Ex consequatur assumenda non
                            laborum nisi sed voluptate illo non atque facilis
                            aut omnis fugit.
                        </p>
                        <p>
                            Ex explicabo omnis ab nihil rerum non deserunt modi
                            et voluptatibus incidunt. Hic atque quasi aut
                            praesentium inventore sit sapiente quasi. A
                            repellendus facilis est distinctio laborum in
                            distinctio inventore ut voluptas ipsum sit ratione
                            galisum. Et velit eligendi est dolor eius qui omnis
                            sequi.
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
import WhatIsAHost from '@/views/seo/faq/what-is-a-host.md?raw'
import HostMonitoringFrequency from '@/views/seo/faq/host-monitoring-frequency.md?raw'
import WebhookAuth from '@/views/seo/faq/webhook-auth.md?raw'
import WebhookVolume from '@/views/seo/faq/webhook-volume.md?raw'
import WebhookDefinition from '@/views/seo/faq/what-is-a-webhook.md?raw'
import WebhookEvents from '@/views/seo/faq/webhook-events.md?raw'
import ReplayWebhook from '@/views/seo/faq/replay-webhooks.md?raw'
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
                    question: 'What is a webhook?',
                    answer: marked(WebhookDefinition)
                },
                {
                    question: 'What events are sent?',
                    answer: marked(WebhookEvents)
                },
                {
                    question: 'Can the webhook login to our systems?',
                    answer: marked(WebhookAuth)
                },
                {
                    question: 'How much event volume do you send?',
                    answer: marked(WebhookVolume)
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
                    question: 'Can past webhooks be re-sent?',
                    answer: marked(ReplayWebhook)
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
