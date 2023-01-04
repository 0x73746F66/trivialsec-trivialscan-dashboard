<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        Early Warning Service
                    </h1>
                    <div class="font-color-light font-lg-sb">
                        Enhance your security by increasing your awareness of
                        the low-grade incidents which could become much bigger
                        issues, so you can act on them earlier.
                    </div>
                </div>
            </div>

            <div
                class="col-lg-3 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Cyber security researchers will often uncover malicious
                    activity on the internet or discover weaknesses in
                    organisations security controls, and release this
                    information in information feeds.
                </p>
                <p>
                    Early Warning does not conduct any active scanning of your
                    networks directly, however some of the feed providers may
                    use scanners to derived data we received, for example from
                    commercial feeds like Shodan.io.
                </p>
                <p>
                    The service uses a variety of information feeds from
                    verified trusted public, commercial, and closed sources.
                    These include several privileged feeds which Trivial
                    Security are not permitted to disclose directly, but we may
                    use the privileged data to derive this alert system for our
                    customers.
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
                    Organisations will receive the following high level types of
                    alerts:
                </p>
                <ul>
                    <li>
                        <strong>Incident Notifications</strong>; This is
                        activity that suggests an active compromise of your
                        system.<br />For example: A host on your network has
                        most likely been infected with a strain of malware.
                    </li>
                    <li>
                        <strong>Network Abuse Events</strong>; This may be
                        indicators that your assets have been associated with
                        malicious or undesirable activity.<br />For example: A
                        client on your network has been detected scanning the
                        internet or sending spam.
                    </li>
                    <li>
                        <strong>Vulnerability and Open Port Alerts</strong>;
                        These are indications of vulnerable services running on
                        your network, or potentially undesired applications are
                        exposed to the internet.<br />For example: You have a
                        vulnerable application, exposed remote control access,
                        or you have an exposed database.
                    </li>
                </ul>
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
                    How Early Warning Service works
                </h3>
                <div
                    class="font-sm d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
                >
                    <span class="font-color-lighter">
                        <p>
                            Early Warning filters millions of events that we
                            receive daily and using the IP or domain names you
                            provide we correlate those which are relevant to
                            your organisation into notifications for your
                            nominated contacts.
                        </p>
                        <p>
                            Early Warning never sends your IP or domain names to
                            third parties, all information is first sent to us
                            and then Early Warning will filter this bulk data to
                            match with customer provided information we store.
                        </p>
                        <p>
                            Your organisation can then use the information
                            passed on by Early Warning to investigate the issue
                            and implement appropriate mitigation solutions where
                            required. Our website provides advice and guidance
                            on how to deal with most cyber security concerns.
                        </p>
                    </span>
                </div>
            </div>

            <div class="col-12 padding-top-sm margin-bottom-lg">
                <h3 class="font-color-light font-xl-b">FAQ</h3>
                <Dropdown
                    v-for="(faq, faqIndex) in FAQs"
                    :key="`${faqIndex}`"
                    :id="`faq${faqIndex}`"
                    :target="`faq${faqIndex}`"
                    parent="accordion"
                    :defaultShow="false"
                    :defaultCollapsed="true"
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
                            <span class="font-xs">{{ faq.answer }}</span>
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
                    question: 'What is a host?',
                    answer: 'There are four types of hosts that Trivial Scanner currently supports; Apex domain names (eg. google.com or google.com.au), Sub domains; (maps.google.com or www.google.com.au); IPv4 and IPv6 addresses. ASN, CIDR ranges, and IPv6 prefix are on our development roadmap.'
                },
                {
                    question: 'How soon will I be alerted?',
                    answer: 'Free accounts are once per day, paid accounts will have access to the daily digest but may also be notified immediately if an active incident is observed and validated by us.'
                },
                {
                    question:
                        'Can we opt-out or otherwise block the early warning data gathering?',
                    answer: 'Trivial Security does not gather any early warning data directly, all data is gathered externally and shared with us in bulk. If this bulk data matches our customers information, only then does the early warning service features operate.'
                },
                {
                    question:
                        'What information is shared with external data gathering services?',
                    answer: 'Trivial Security does not share any customer data with external entities, all data is shared with us in bulk. We filter this bulk data to match to our customers information.'
                },
                {
                    question: 'How to report false positives?',
                    answer: 'Trivial Security strives to validate all urgent alerts before sending them, and will list all findings regardless in the digests. While data is gathered from external source that change often, we will always share our sources because these often assist with your remediation actions'
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
