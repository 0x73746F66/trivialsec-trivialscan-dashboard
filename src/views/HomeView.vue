<template>
  <div>
    <div class="hero-container">
      <Hero :class="{ 'hero-scrolled': heroScrolled }" />
    </div>

    <div
      class="container basic-feature-container padding-bottom-md padding-top-md"
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
      class="container-fluid padding-top-xl padding-bottom-md bg-dark-20 pricing-container px-0"
      ref="pricingContainer"
    >
      <div class="container">
        <PricingComponent />
        <span class="margin-top-sm d-block font-xxs font-color-light"
          >* Self-managed refers to Trivial Scanner running on your self-hosted
          and on-prem servers, your cloud, or your client computers, and
          connecting to Trivial Security SaaS services.</span
        >
      </div>
    </div>

    <div class="container padding-bottom-xl padding-top-xl">
      <LoginOrRegister loginModalId="homeLogin" registerModalId="homeRegister" />
    </div>
  </div>
</template>

<script>
import { shallowRef } from "vue";

import cIconNotificationLight from "@/components/icons/IconNotificationLight.vue";
import cIconData from "@/components/icons/IconData.vue";
import cIconScan2Light from "@/components/icons/IconScan2Light.vue";
import cIconScan1Light from "@/components/icons/IconScan1Light.vue";
import cIconLightningLight from "@/components/icons/IconLightningLight.vue";
import cIconIntLight from "@/components/icons/IconIntLight.vue";
import cIconFeedLight from "@/components/icons/IconFeedLight.vue";
import cIconIntegrationLight from "@/components/icons/IconIntegrationLight.vue";
import cIconCliLight from "@/components/icons/IconCliLight.vue";
import cIconGlobeLight from "@/components/icons/IconGlobeLight.vue";
import cIconFishLight from "@/components/icons/IconFishLight.vue";
import cIconTuneLight from "@/components/icons/IconTuneLight.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import Hero from "@/components/layout/Hero.vue"
import LoginForm from "@/components/forms/LoginForm.vue"
import RegisterForm from "@/components/forms/RegisterForm.vue"
import BasicFeature from "@/components/general/BasicFeature.vue"
import PricingComponent from "@/components/general/PricingComponent.vue"
import Dropdown from "@/components/general/Dropdown.vue"
import Modal from "@/components/general/Modal.vue"
import ContactForm from "@/components/forms/ContactForm.vue"
import LoginOrRegister from "@/components/general/LoginOrRegister.vue"


const IconNotificationLight = shallowRef(cIconNotificationLight);
const IconData = shallowRef(cIconData);
const IconScan2Light = shallowRef(cIconScan2Light);
const IconScan1Light = shallowRef(cIconScan1Light);
const IconLightningLight = shallowRef(cIconLightningLight);
const IconIntLight = shallowRef(cIconIntLight);
const IconFeedLight = shallowRef(cIconFeedLight);
const IconIntegrationLight = shallowRef(cIconIntegrationLight);
const IconCliLight = shallowRef(cIconCliLight);
const IconGlobeLight = shallowRef(cIconGlobeLight);
const IconFishLight = shallowRef(cIconFishLight);
const IconTuneLight = shallowRef(cIconTuneLight);

export default {
  components: {
    Hero,
    LoginForm,
    RegisterForm,
    BasicFeature,
    PricingComponent,
    Dropdown,
    Modal,
    ContactForm,
    LoadingComponent,
    LoginOrRegister,
  },
  data() {
    return {
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
          description: "Deep DNS analysis, real TLS validation, vast subdomain sources, open ports, third party libraries, and leverage API integrations to enriched results",
        },
        {
          id: 3,
          icon: IconScan1Light,
          href: "/feature/active-scan",
          header: "Active scan",
          description: "Protected by Authorisation, validating you control the target DNS hosted zone; active scans will validate findings by leveraging the exploit as a simulated attack",
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
        //   description: "There is a lot of written form security information published every hour relevant to your organisation. Our Research & Advisory feed is a curated source of releveant news for security analysts and CISO's, using our dashboard or any RSS viewer",
        // },
        {
          id: 7,
          icon: IconIntegrationLight,
          href: "/feature/webhooks",
          header: "Firehose",
          description: "We promote automation using Webhooks for real-time integration into your existing systems, simply generate a client secret and start recieving data immediately",
        },
        {
          id: 8,
          icon: IconCliLight,
          href: "/feature/trivialscan",
          header: "CLI",
          description: "Enables automation via DevOps pipelines, penetration testing recon efforts, ad-hoc for M&A purposes, or regular scanning to meet cybersecurity insurance policy obligations.",
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
          description: "While Trivial Security was created to make accessible many features typically out of reach to most organisations, our solutions equally benefit large enterprise with data sovereignty and complete control needs also",
        },
        {
          id: 12,
          icon: IconData,
          href: "/feature/interoperability",
          header: "Interoperability",
          description: "We adhere to open standards. You control your data, and we enable you with a growing list of supported data exchange formats so you can access and control your data at all times",
        },
      ],
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
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
.login-register {
  &-section {
    position: relative;
  }
  &-sep {
    background: color("dark");
    padding: padding("sm");
    @media (min-width: $breakpoint-lg) {
      &:before {
        content: "";
        z-index: -1;
        background: color("light");
        top: 25px;
        left: 50%;
        bottom: 25px;
        width: 1px;
        position: absolute;
      }
    }
  }
}
</style>
