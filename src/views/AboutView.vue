<template>
    <div>
        <div
            class="container content-section margin-bottom-xl margin-top-sm padding-right-md padding-left-md"
        >
            <h3 class="font-color-primary font-xl text-center">
                Why Trivial Security?
            </h3>
            <div
                class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md margin-bottom-sm"
            >
                <div class="row margin-bottom-xxs">
                    Trivial Security came about by listening to the experiences
                    of enterprise and government customers who shared complaints
                    with us about the automated vulnerability scanning tools
                    they use, and most start-ups we encountered place higher
                    priorities on retrospective security (after a incident)
                    instead of understanding their attack surface and defending.
                </div>
                <div class="row">
                    We see Trivial Security helping website and
                    internet-connected system owners utilize continuous security
                    automation to find common issues first so they can remediate
                    before attackers exploit them; freeing up more time to focus
                    on the business instead of scanning or responding to
                    incidents that could have been identified as trivial and
                    prevented.
                </div>
            </div>
        </div>

        <div
            class="container content-section margin-bottom-xl margin-top-sm padding-right-md padding-left-md"
        >
            <h4 class="font-color-primary font-xl text-center">
                Stay informed of your attack surface
            </h4>
            <div
                class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md margin-bottom-sm"
            >
                <div class="row">
                    Potential security issues reported may include:
                </div>
                <div class="row">
                    <ul class="padding-left-lg">
                        <li>
                            Trust Issues and/or common problems with the server
                            certificate chains
                        </li>
                        <li>
                            A range of DNS, TLS, and HTTP configuration concerns
                            and implementation errors
                        </li>
                        <li>
                            Whether site misconfiguration is resulting in loss
                            of information integrity or confidentiality
                        </li>
                        <li>
                            Whether browser policy and/or controls are in use
                            with an effective configuration
                        </li>
                        <li>
                            If any issues present on your website are related to
                            a known weakness or vulnerability elsewhere
                        </li>
                        <li>
                            The possible threat vectors (Mapped to Mitre Att&ck
                            framework)
                        </li>
                        <li>
                            Will any issues cause non-compliance with common
                            standards (PCI DSS, NIST, FIPS)
                        </li>
                        <li>
                            A range of 3rd party API checks for known exposures,
                            website safety, honeypots, denylists, and more!
                        </li>
                    </ul>
                </div>
                <div class="row margin-bottom-sm">
                    And, we are constantly expanding the range of
                    vulnerabilities and misconfigurations on which we report.
                </div>
            </div>
        </div>

        <div
            class="container content-section margin-bottom-xl margin-top-sm padding-right-md padding-left-md"
        >
            <h4 class="font-color-primary font-xl text-center">
                Focusing on your certificates
            </h4>
            <div
                class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md margin-bottom-sm"
            >
                <div class="row margin-bottom-xxs">
                    Feedback from our pre-release users suggest that most urgent
                    findings arise in sites that have misconfigured or outdated
                    certificates.
                </div>
                <div class="row">
                    These issues can lead to insecure transactions and error
                    messages, both of which harm the relationship between client
                    and the public website service they are using.
                </div>
            </div>
        </div>

        <div
            class="container content-section margin-bottom-xl margin-top-sm padding-right-md padding-left-md"
        >
            <h4 class="font-color-primary font-xl text-center">
                Your Compliance is our concern too
            </h4>
            <div
                class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md margin-bottom-sm"
            >
                <div class="row margin-bottom-xxs">
                    We know from enterprise, start-ups, and government alike
                    that your compliance programs are a significant investment,
                    that is why we are launching with evaluation findings mapped
                    to controls violations of; PCI DSS, NIST, and FIPS
                    standards.
                </div>
                <div class="row font-base-sb margin-bottom-xxs">
                    This is included in scanner reports for all customers.
                </div>
                <div class="row">
                    We plan to include for all recommendation the corresponding
                    controls mapping for; SOC2, ISO27k, and IRAP (ISM).
                </div>
            </div>
        </div>

        <div class="container margin-bottom-xl margin-top-xl" v-if="!logged_in">
            <LoginOrRegister
                loginModalId="loginModal"
                registerModalId="registerLogin"
            />
        </div>
    </div>
</template>

<script setup>
import LoginOrRegister from '@/components/general/LoginOrRegister.vue'
</script>

<script>
export default {
    components: {
        LoginOrRegister
    },
    data() {
        return {
            logged_in: false
        }
    },
    created() {
        this.logged_in = !!localStorage.getItem('/session/bearer_token')
    }
}
</script>

<style scoped lang="scss">
.content-section {
    color: color('light');

    &-body {
        border-radius: radius('sm');
        background: color('dark-40');
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: space-between;
    }
}
</style>
