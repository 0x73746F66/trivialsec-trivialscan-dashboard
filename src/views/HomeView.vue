<template>
  <div>
    <div class="hero-container">
      <Hero :class="{ 'hero-scrolled': heroScrolled }" />
    </div>

    <div
      class="container content-section margin-bottom-lg margin-top-xl padding-right-md padding-left-md"
    >
      <h2>Website configuration and Vulnerability scanning</h2>
      <div
        class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md"
      >
        <div class="row margin-bottom-sm">
          Trivial Security scanners check your websites for common web
          vulnerabilities and misconfigurations. The checks are designed to
          impose low load on sites and to avoid damaging them. Web Check tells
          you; what you need to worry about, when you need to worry about it and
          what you need to do about it.
        </div>
        <div class="row margin-bottom-sm">
          It is easy to use and doesn't require a any technical skill. Some
          technical jargon may be present to for clarity where use of more
          general language would be more confusing if applied.
        </div>
        <div class="row">Potential security issues reported may include:</div>
        <div class="row">
          <ul class="padding-left-lg">
            <li>
              Trust Issues and/or common problems with the server certificate
              chains
            </li>
            <li>
              A range of DNS, TLS, and HTTP configuration concerns and
              implementation errors
            </li>
            <li>
              Whether site misconfiguration is resulting in loss of information
              integrity or confidentiality
            </li>
            <li>
              Whether browser policy and/or controls are in use with an
              effective configuration
            </li>
            <li>
              If any issues present on your website are related to a known
              weakness or vulnerability elsewhere
            </li>
            <li>
              The possible threat vectors (Mapped to Mitre Att&ck framework)
            </li>
            <li>
              Will any issues cause non-compliance with common standards (PCI
              DSS, NIST, FIPS)
            </li>
            <li>
              A range of 3rd party API checks for known exposures, website
              safety, honeypots, denylists, and more!
            </li>
          </ul>
        </div>
        <div class="row margin-bottom-sm">
          And, we are constantly expanding the range of vulnerabilities and
          misconfigurations on which we report.
        </div>
      </div>
    </div>

    <div
      class="container basic-feature-container margin-bottom-md margin-top-md"
    >
      <div class="row padding-top-lg padding-bottom-lg">
        <BasicFeature
          v-for="basicFeature in basicFeatures"
          :key="basicFeature.id"
          :feature="basicFeature"
        />
      </div>
    </div>

    <div
      class="container content-section margin-bottom-xxl margin-top-sm padding-right-md padding-left-md"
    >
      <h3>Why Trivial Security?</h3>
      <div
        class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md margin-bottom-sm"
      >
        <div class="row margin-bottom-sm">
          Trivial Security came about by listening to the experiences of
          enterprise and government customers who shared complaints with us
          about the automated vulnerability scanning tools they use, and most
          start-ups we encountered place higher priorities on retrospective
          security (after a incident) instead of understanding their attack
          surface and defending.
        </div>
        <div class="row margin-bottom-sm">
          We see Trivial Security helping website and internet-connected system
          owners utilize continuous security automation to find common issues
          first so they can remediate before attackers exploit them; freeing up
          more time to focus on the business instead of scanning or responding
          to incidents that could have been identified as trivial and prevented.
        </div>
      </div>
      <h4>Focusing on your certificates</h4>
      <div
        class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md margin-bottom-sm"
      >
        <div class="row margin-bottom-sm">
          Feedback from our pre-release users suggest that most urgent findings
          arise in sites that have misconfigured or outdated certificates. These
          issues can lead to insecure transactions and error messages, both of
          which harm the relationship between client and the public website
          service they are using.
        </div>
      </div>
      <h4>Your Compliance is our concern too</h4>
      <div
        class="content-section-body padding-left-xl padding-right-xl padding-top-md padding-bottom-md margin-bottom-sm"
      >
        <div class="row margin-bottom-sm">
          We know from enterprise, start-ups, and government alike that your
          compliance programs are a significant investment, that is why we are
          launching with PCI DSS, NIST, and FIPS focus and our roadmap includes
          many more standards.
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
import { shallowRef } from "vue";
// import cIconNotificationLight from "@/components/icons/IconNotificationLight.vue";
import cIconData from "@/components/icons/IconData.vue";
import cIconScan2Light from "@/components/icons/IconScan2Light.vue";
import cIconScan1Light from "@/components/icons/IconScan1Light.vue";
// import cIconLightningLight from "@/components/icons/IconLightningLight.vue";
import cIconAlarmLight from "@/components/icons/IconAlarmLight.vue";
// import cIconIntLight from "@/components/icons/IconIntLight.vue";
// import cIconFeedLight from "@/components/icons/IconFeedLight.vue";
// import cIconIntegrationLight from "@/components/icons/IconIntegrationLight.vue";
import cIconCliLight from "@/components/icons/IconCliLight.vue";
// import cIconGlobeLight from "@/components/icons/IconGlobeLight.vue";
// import cIconFishLight from "@/components/icons/IconFishLight.vue";
import cIconTuneLight from "@/components/icons/IconTuneLight.vue";
import Hero from "@/components/layout/Hero.vue";
import BasicFeature from "@/components/general/BasicFeature.vue";
import LoginOrRegister from "@/components/general/LoginOrRegister.vue";
</script>

<script>
// const IconNotificationLight = shallowRef(cIconNotificationLight);
const IconData = shallowRef(cIconData);
const IconScan2Light = shallowRef(cIconScan2Light);
const IconScan1Light = shallowRef(cIconScan1Light);
// const IconLightningLight = shallowRef(cIconLightningLight);
const IconAlarmLight = shallowRef(cIconAlarmLight);
// const IconIntLight = shallowRef(cIconIntLight);
// const IconFeedLight = shallowRef(cIconFeedLight);
// const IconIntegrationLight = shallowRef(cIconIntegrationLight);
const IconCliLight = shallowRef(cIconCliLight);
// const IconGlobeLight = shallowRef(cIconGlobeLight);
// const IconFishLight = shallowRef(cIconFishLight);
const IconTuneLight = shallowRef(cIconTuneLight);

export default {
  components: {
    Hero,
    BasicFeature,
    LoginOrRegister,
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
          href: "/feature/passive-scan",
          header: "Passive scan",
          description:
            "Deep DNS analysis, real TLS validation, vast subdomain sources, open ports, third party libraries, and leverage API integrations to enriched results",
        },
        {
          id: 3,
          icon: IconScan1Light,
          href: "/feature/active-scan",
          header: "Active scan",
          description:
            "Protected by Authorisation, validating you control the target DNS hosted zone; active scans will validate findings by leveraging the exploit as a simulated attack",
        },
        {
          id: 4,
          icon: IconAlarmLight,
          href: "/feature/early-warning",
          header: "Early Warning Service",
          description:
            "Early Warning filters millions of events that we process every day and, using the IP and domain names you provide, correlates those which are relevant to your organisation into daily notification or immediate alerts",
        },
        // {
        //   id: 4,
        //   icon: IconLightningLight,
        //   href: "/feature/trivial-attacks",
        //   header: "Trivial Attacks",
        //   description: "We automate many novel yet trivial attack vectors, and perform evaluations using standard tooling so you don't have to maintain and use numerous tools yourself",
        // },
        // {
        //   id: 5,
        //   icon: IconIntLight,
        //   href: "/feature/threat-intel",
        //   header: "Threat Intelligence",
        //   description: "Our module will help you find the signal from a vast source of OSINT and vendor data feeds, our curated blocklists can be downloaded or fetched by your network security devices",
        // },
        // {
        //   id: 6,
        //   icon: IconFeedLight,
        //   href: "/feature/security-feeds",
        //   header: "Feeds",
        //   description: "There is a lot of written form security information published every hour relevant to your organisation. Our Research & Advisory feed is a curated source of relevant news for security analysts and CISO's, using our dashboard or any RSS viewer",
        // },
        // {
        //   id: 7,
        //   icon: IconIntegrationLight,
        //   href: "/feature/webhooks",
        //   header: "Firehose",
        //   description: "We promote automation using Webhooks for real-time integration into your existing systems, simply generate a client secret and start receiving data immediately",
        // },
        {
          id: 8,
          icon: IconCliLight,
          href: "/feature/trivialscan",
          header: "CLI",
          description:
            "Enables automation via DevOps pipelines, penetration testing recon efforts, ad-hoc for M&A purposes, or regular scanning to meet cybersecurity insurance policy obligations.",
        },
        // {
        //   id: 9,
        //   icon: IconGlobeLight,
        //   href: "/feature/researchers",
        //   header: "Security Researchers",
        //   description: "We have a vast database of the public internet, compiled from the authoritative list of every registered domain using zone files (and not IP address probing)",
        // },
        // {
        //   id: 10,
        //   icon: IconFishLight,
        //   href: "/feature/phishing-alerts",
        //   header: "Phish Alert",
        //   description: "Know when sites are copied or domains with similarities for a phishing attacks are registered We adhere to the concept of interoperability. You control your data, and we enable you with a growing list of supported open standard data exchange formats",
        // },
        {
          id: 11,
          icon: IconTuneLight,
          href: "/feature/open-source",
          header: "On-prem / Self-hosting",
          description:
            "While Trivial Security was created to make accessible many features typically out of reach to most organisations, our solutions equally benefit large enterprise with data sovereignty and complete control needs also",
        },
        {
          id: 12,
          icon: IconData,
          href: "/feature/interoperability",
          header: "Interoperability",
          description:
            "We adhere to open standards. You control your data, and we enable you with a growing list of supported data exchange formats so you can access and control your data at all times",
        },
      ],
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.logged_in = !!localStorage.getItem("/session/key");
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 10) {
        this.heroScrolled = true;
      } else {
        this.heroScrolled = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.hero-container {
  height: calc(100vh - 80px);
}

.content-section {
  color: color("light");

  &-body {
    border-radius: radius("sm");
    background: color("dark-40");
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
  }
}
</style>
