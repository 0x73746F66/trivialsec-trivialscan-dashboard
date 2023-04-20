<template>
    <div>
        <div class="hero-container">
            <Hero :class="{ 'hero-scrolled': heroScrolled }" />
        </div>

        <div
            class="container content-section margin-bottom-lg margin-top-xl padding-right-md padding-left-md"
        >
            <h2 class="font-color-primary font-xxl text-center">
                Monitoring that won't disrupt
            </h2>
            <div
                class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md"
            >
                <div class="row margin-bottom-sm">
                    With Trivial Security, you'll enjoy peace of mind that we've
                    identified common threats providing you what you need to
                    secure your business, giving you more time to focus on what
                    really matters. Our thorough scanning sensors ensures that
                    you have the most complete and up-to-date information to
                    make informed security decisions.
                </div>
                <div class="row margin-bottom-sm">
                    It is easy to use and doesn't require a any technical skill.
                    And for developers, we offer HTTP API, CLI and Webhooks for
                    custom integrations and automation.
                </div>
                <div class="row margin-bottom-sm">
                    And the best part? We're offering free monitoring services
                    to help you get started. With no upfront costs. Plus, if the
                    malicious actors can gain information about your business
                    freely, we strive to ensure you do too unlike other products
                    on the market that will charge you for what attackers get
                    for free.
                </div>
            </div>
        </div>

        <div class="container basic-feature-container margin-top-md">
            <div class="row padding-top-lg padding-bottom-lg">
                <BasicFeature
                    :key="basicFeatures[0].id"
                    :feature="basicFeatures[0]"
                />
                <BasicFeature
                    :key="basicFeatures[1].id"
                    :feature="basicFeatures[1]"
                />
                <BasicFeature
                    :key="basicFeatures[2].id"
                    :feature="basicFeatures[2]"
                />
            </div>
        </div>

        <div
            class="container content-section margin-bottom-lg margin-top-lg padding-right-md padding-left-md"
        >
            <h2 class="font-color-primary font-xxl text-center">
                Automatic filtering hundreds of Threat Intelligence sources!
            </h2>
            <div
                class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md"
            >
                <div class="row margin-bottom-sm">
                    This has required that you know all the threat intelligence
                    sources; acquire and analyze the many disparate protocols
                    and formats, and filter data that relates to you.
                </div>
                <div class="row margin-bottom-sm">
                    When you use Trivial Security you skip these steps, save
                    time developing, maintaining, researching new sources, and
                    continuously analysing them. Instead of every organisation
                    doing this many times over, we provide FREE threat
                    intelligence alerting (Early Warning Service) linked to your
                    usage of our scanners to save effort maintaining lists of
                    matching identifiers.
                </div>
                <div class="row margin-bottom-sm">
                    We ensure that you only pay for what you need, making
                    Trivial Security the most cost-effective solution on the
                    market. Stay ahead of the threats and secure your business
                    with our free monitoring. Sign up for your free service
                    today!
                </div>
            </div>
        </div>

        <div class="container basic-feature-container margin-top-md">
            <div class="row padding-top-lg padding-bottom-lg">
                <BasicFeature
                    :key="basicFeatures[3].id"
                    :feature="basicFeatures[3]"
                />
                <BasicFeature
                    :key="basicFeatures[4].id"
                    :feature="basicFeatures[4]"
                />
                <BasicFeature
                    :key="basicFeatures[5].id"
                    :feature="basicFeatures[5]"
                />
            </div>
        </div>

        <div
            class="container content-section margin-bottom-lg margin-top-lg padding-right-md padding-left-md"
        >
            <h2 class="font-color-primary font-xxl text-center">
                A security tool that is actually pleasing to use
            </h2>
            <div
                class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md"
            >
                <div class="row margin-bottom-sm">
                    If you're not too technical, and just want an email when
                    something important is found. You tell us once what types of
                    things are or not important, otherwise you'll never hear
                    from us. Change settings any time, if your preferences
                    change.
                </div>
                <div class="row margin-bottom-sm">
                    Maybe you are a software developer that prefers to interact
                    with an API, we have an OpenAPI spec for you, and happy to
                    share our Postman configuration for testing.
                </div>
                <div class="row margin-bottom-sm">
                    We love automation and DevOps, so we open sourced all our
                    rule evaluation code as a set of python modules or as CLI
                    with full customisation of how all rules are evaluated,
                    adding custom rules, and easy to do self-hosting from
                    anywhere python runs.
                </div>
                <div class="row margin-bottom-sm">
                    You're a SOC and wan't all of the data delivered in
                    real-time, create as many webhook endpoints as you need, for
                    one, all, or any combination of event source categories;
                    account activity, scanner, early warning service. Or use the
                    dashboard to explore scan results and check out our OSINT
                    pivots!
                </div>
            </div>
        </div>

        <div class="container margin-bottom-xl margin-top-lg" v-if="!logged_in">
            <LoginOrRegister
                loginModalId="loginModal"
                registerModalId="registerLogin"
            />
        </div>
    </div>
</template>

<script setup>
import { shallowRef } from 'vue'
import cIconNotificationLight from '@/components/icons/IconNotificationLight.vue'
import cIconData from '@/components/icons/IconData.vue'
import cIconScan2Light from '@/components/icons/IconScan2Light.vue'
import cIconScan1Light from '@/components/icons/IconScan1Light.vue'
import cIconLightningLight from '@/components/icons/IconLightningLight.vue'
import cIconAlarmLight from '@/components/icons/IconAlarmLight.vue'
import cIconIntLight from '@/components/icons/IconIntLight.vue'
import cIconFeedLight from '@/components/icons/IconFeedLight.vue'
import cIconCliLight from '@/components/icons/IconCliLight.vue'
import cIconGlobeLight from '@/components/icons/IconGlobeLight.vue'
import cIconFishLight from '@/components/icons/IconFishLight.vue'
import cIconTuneLight from '@/components/icons/IconTuneLight.vue'
import Hero from '@/components/layout/Hero.vue'
import BasicFeature from '@/components/general/BasicFeature.vue'
import LoginOrRegister from '@/components/general/LoginOrRegister.vue'
</script>

<script>
const IconNotificationLight = shallowRef(cIconNotificationLight)
const IconData = shallowRef(cIconData)
const IconScan2Light = shallowRef(cIconScan2Light)
const IconScan1Light = shallowRef(cIconScan1Light)
const IconLightningLight = shallowRef(cIconLightningLight)
const IconAlarmLight = shallowRef(cIconAlarmLight)
const IconIntLight = shallowRef(cIconIntLight)
const IconFeedLight = shallowRef(cIconFeedLight)
const IconCliLight = shallowRef(cIconCliLight)
const IconGlobeLight = shallowRef(cIconGlobeLight)
const IconFishLight = shallowRef(cIconFishLight)
const IconTuneLight = shallowRef(cIconTuneLight)

export default {
    components: {
        Hero,
        BasicFeature,
        LoginOrRegister
    },
    data() {
        return {
            logged_in: false,
            heroScrolled: false,
            basicFeatures: [
                // {
                //   id: 1,
                //   icon: IconNotificationLight,
                //   href: "/feature/patch-alert",
                //   header: "Patch Alert",
                //   description: "Never miss a security patch again, kick off patch automation, or integrate with chap apps to inform your team",
                // },
                {
                    id: 2,
                    icon: IconScan2Light,
                    href: '/feature/passive-scan',
                    header: 'Attack Surface Monitoring',
                    description:
                        'Deep DNS analysis, real TLS validation, vast subdomain sources, open ports, third party libraries, and leverage API integrations to enriched results'
                },
                {
                    id: 3,
                    icon: IconScan1Light,
                    href: '/feature/active-scan',
                    header: 'Active Scanning',
                    description:
                        'Protected by Authorisation, validating you control the target DNS hosted zone; active scans will validate findings by leveraging the exploit as a simulated attack'
                },
                {
                    id: 4,
                    icon: IconAlarmLight,
                    href: '/feature/early-warning',
                    header: 'Early Warning Service',
                    description:
                        'Early Warning filters millions of events that we process every day and, using the IP and domain names you provide, correlates those which are relevant to your organisation into daily notification or immediate alerts'
                },
                {
                    id: 5,
                    icon: IconLightningLight,
                    href: '/feature/trivial-attacks',
                    header: 'Trivial Attacks',
                    description:
                        "We automate many novel yet trivial attack vectors, and perform evaluations using standard tooling so you don't have to maintain and use numerous tools yourself"
                },
                // {
                //   id: 6,
                //   icon: IconFeedLight,
                //   href: "/feature/security-feeds",
                //   header: "Feeds",
                //   description: "There is a lot of written form security information published every hour relevant to your organisation. Our Research & Advisory feed is a curated source of relevant news for security analysts and CISO's, using our dashboard or any RSS viewer",
                // },
                {
                    id: 7,
                    icon: IconCliLight,
                    href: '/feature/developer-tools',
                    header: 'Developer Tools',
                    description:
                        'API & CLI options enable automation via DevOps pipelines and secure the SDLC at any stage you require, as well as provide the means to do regular scanning by security professionals of any level of technical skill.'
                },
                // {
                //   id: 8,
                //   icon: IconGlobeLight,
                //   href: "/feature/researchers",
                //   header: "Security Researchers",
                //   description: "We have a vast database of the public internet, compiled from the authoritative list of every registered domain using zone files (and not IP address probing)",
                // },
                // {
                //   id: 9,
                //   icon: IconFishLight,
                //   href: "/feature/phishing-alerts",
                //   header: "Phish Alert",
                //   description: "Know when sites are copied or domains with similarities for a phishing attacks are registered We adhere to the concept of interoperability. You control your data, and we enable you with a growing list of supported open standard data exchange formats",
                // },
                {
                    id: 10,
                    icon: IconTuneLight,
                    href: '/feature/open-source',
                    header: 'On-prem / Self-hosting',
                    description:
                        'While Trivial Security was created to make accessible many features typically out of reach to most organisations, our solutions equally benefit large enterprise with data sovereignty and complete control needs also'
                }
            ]
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll)
        this.logged_in = !!localStorage.getItem('/session/bearer_token')
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            if (window.scrollY > 10) {
                this.heroScrolled = true
            } else {
                this.heroScrolled = false
            }
        }
    }
}
</script>

<style scoped lang="scss">
.hero-container {
    height: calc(100vh - 80px);
}

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
