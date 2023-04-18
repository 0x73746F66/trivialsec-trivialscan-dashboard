<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        For Legal & Business Professionals:
                    </h1>
                    <div class="font-color-light font-lg-sb">
                        Attack surface monitoring can play a critical role in
                        supporting mergers and acquisitions (M&A) activities by
                        providing organizations with a comprehensive
                        understanding of the security posture of the target
                        organization.
                    </div>
                </div>
            </div>

            <div
                class="col-lg-6 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Attack surface monitoring can play a critical role in
                    supporting mergers and acquisitions (M&A) activities by
                    providing organizations with a comprehensive understanding
                    of the security posture of the target organization. This
                    information can help organizations to identify potential
                    security risks and make informed decisions about the risk
                    associated with the M&A transaction.
                </p>
                <p>
                    Attack surface monitoring can help organizations to comply
                    with various regulations and standards, such as PCI DSS and
                    HIPAA, by providing real-time visibility into the attack
                    surface and identifying potential vulnerabilities. This
                    helps organizations to avoid costly fines and penalties, and
                    to maintain a good reputation.
                </p>
                <p>
                    Investing in attack surface monitoring can help
                    organizations to assess the security posture of the target
                    organization, identify potential vulnerabilities and comply
                    with relevant regulations, such as data protection and
                    privacy laws. This can help to minimize the risk of security
                    incidents and data breaches, which can have significant
                    financial, legal and reputational consequences.
                </p>
                <p>
                    From a legal perspective, attack surface monitoring can also
                    help organizations to demonstrate due diligence and protect
                    themselves against potential liability. By proactively
                    identifying and mitigating vulnerabilities, organizations
                    can demonstrate that they have taken reasonable steps to
                    protect the security of the target organization and avoid
                    the potential for costly legal disputes.
                </p>
                <p>
                    Investing in attack surface monitoring can help compliance
                    and legal professionals to ensure that M&A transactions are
                    completed in a secure and compliant manner, minimize the
                    risk of security incidents and data breaches, and ensure
                    that the target organization is secure and compliant for the
                    future.
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
.asciinema-img {
    width: 100%;
    height: 100%;
}
</style>
