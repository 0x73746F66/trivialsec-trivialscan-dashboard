<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        For Public Sector:
                    </h1>
                    <div class="font-color-light font-lg-sb">
                        Attack surface monitoring is a critical component of a
                        secure and compliant IT infrastructure for the public
                        sector.
                    </div>
                </div>
            </div>

            <div
                class="col-lg-6 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    The Australian federal and state government have obligations
                    to maintain high standards of security for their systems and
                    data, as outlined in the Information Security Manual (ISM),
                    the Cyber Security Policy (CSP), and the Information
                    Security Registered Assessors Program (IRAP).
                </p>
                <p>
                    The US federal government has obligations to maintain high
                    standards of security for their systems and data, as
                    outlined in FedRAMP, HIPAA, and NIST frameworks.
                </p>
                <p>
                    Investing in attack surface monitoring can help public
                    sector organizations to meet these obligations by providing
                    real-time visibility into the organization's attack surface
                    and identifying potential vulnerabilities. This proactive
                    approach helps organizations to mitigate risk, reduce the
                    likelihood of data breaches, and improve their overall
                    security posture. Additionally, attack surface monitoring
                    can help organizations to allocate security resources more
                    effectively and prioritize security initiatives based on the
                    level of risk.
                </p>
                <p>
                    In terms of ROI, attack surface monitoring can help public
                    sector organizations to minimize the financial impact of a
                    data breach by proactively identifying and remedying
                    vulnerabilities. This can result in significant cost savings
                    in terms of external services for; remediation costs,
                    incident response, ministerial actions, disaster recovery,
                    disaster recovery, and operational overhead facilitating
                    these unexpected events and obligatory activities.
                </p>
                <p>
                    By providing real-time visibility into the attack surface
                    and identifying potential vulnerabilities, organizations can
                    avoid costly fines and penalties and maintain a good
                    reputation. Ultimately, investing in attack surface
                    monitoring can help public sector organizations to protect
                    their systems and data, demonstrate their commitment to
                    security and compliance, and ensure that they remain
                    competitive and resilient in the face of evolving threats.
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
