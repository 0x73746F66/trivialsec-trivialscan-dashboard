<template>
    <div class="container padding-top-xl padding-bottom-xl">
        <div class="row">
            <div class="col-12 feature-container margin-bottom-md">
                <div class="font-color-light feature-name-bg">
                    <h1 class="font-color-light font-xxl-b">
                        For C-level executives:
                    </h1>
                    <div class="font-color-light font-lg-sb">
                        By continuously monitoring the attack surface and
                        identifying vulnerabilities, attack surface monitoring
                        helps organizations to proactively mitigate risk, reduce
                        the likelihood of data breaches, and improve their
                        overall security posture.
                    </div>
                </div>
            </div>

            <div
                class="col-lg-6 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
            >
                <p>
                    Attack surface monitoring is a critical component of an
                    organization's overall security strategy, providing
                    real-time visibility into the organization's attack surface
                    and identifying potential vulnerabilities. This proactive
                    approach helps organizations to mitigate risk, and
                    prioritize their security strategy and set tactical goals.
                </p>
                <p>
                    In terms of ROI, attack surface monitoring can help
                    organizations to minimize the financial impact of a data
                    breach by proactively identifying and remedying
                    vulnerabilities. This can result in significant cost savings
                    in terms of remediation costs associated with external
                    consulting during post-breach investigations, recovery
                    efforts, legal fees, and reputation damage. Additionally,
                    attack surface monitoring can help organizations to allocate
                    security resources more effectively and prioritize security
                    initiatives based on the level of risk. This can result in
                    improved security posture and increased efficiency, leading
                    to higher levels of customer trust and confidence in the
                    organization.
                </p>
                <p>
                    Ultimately, investing in attack surface monitoring can help
                    C-level executives to demonstrate their commitment to
                    security and protect the organization's valuable assets and
                    reputation. By staying ahead of attackers and proactively
                    mitigating risk, organizations can ensure that they remain
                    competitive and resilient in the face of evolving threats.
                </p>
            </div>
            <div
                class="col-lg-6 d-flex justify-content-center col-12 margin-top-xl feature-image-container"
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
export default {
    components: {
        Modal,
        LoginOrRegister
    },
    data() {
        return {
            docsUrl: `${Api.apiUrl}/redoc`,
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
        this.logged_in = !!localStorage.getItem('/session/bearer_token')
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
