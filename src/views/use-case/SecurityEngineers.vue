<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        For Programmers & Security Professionals:
                    </h1>
                    <div class="font-color-light font-lg-sb">
                        Attack Surface Monitoring (ASM) is a proactive approach
                        to security that helps organizations to identify and
                        mitigate vulnerabilities in their networks, systems, and
                        applications.
                    </div>
                </div>
            </div>

            <div
                class="col-lg-6 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Our ASM can integrate with a your security tools and systems
                    such as; vulnerability scanners, firewalls, intrusion
                    detection systems, to provide a comprehensive view of the
                    organization's security posture. The information collected
                    by ASM is analyzed and correlated to identify the most
                    critical risks and prioritize security initiatives. It works
                    by continuously monitoring an organization's attack surface
                    for changes, such as new assets, configurations, or
                    vulnerabilities, and alerting security teams to potential
                    threats.
                </p>
                <p>
                    From a technical perspective, ASM works by collecting data
                    from various sources, such as the network, web and API
                    configuration, OSINT, and threat intelligence feeds. The
                    data is then analyzed using machine learning, traditional
                    algorithms, and various low level techniques not found in
                    existing tools to identify potential threats and
                    vulnerabilities.
                </p>
                <p>
                    Security professionals and coders can use ASM to ensure that
                    their organization's systems and applications are secure by
                    continuously monitoring the attack surface for changes and
                    vulnerabilities. This helps to minimize the risk of security
                    incidents and data breaches, and ensure that the
                    organization's systems and applications are secure and
                    compliant.
                </p>
                <p>
                    Investing in ASM can help security professionals and
                    software engineers to ensure that their organization's
                    systems and applications are secure, minimize the risk of
                    security incidents and data breaches, and improve the
                    efficiency and effectiveness of their security initiatives.
                </p>
            </div>
            <div
                class="col-lg-6 d-flex justify-content-center col-12 margin-bottom-lg feature-image-container"
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
import LoginOrRegister from '@/components/general/LoginOrRegister.vue'
import Modal from '@/components/general/Modal.vue'
</script>

<script>
const apiUrl = import.meta.env.VITE_API_URL.trim()
export default {
    components: {
        Modal,
        LoginOrRegister
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
