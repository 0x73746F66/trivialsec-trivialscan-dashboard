<template>

  <div class="hero-container">
    <Hero :class="{ 'hero-scrolled': heroScrolled }"/>
  </div>

  <div class="container basic-feature-container padding-bottom-md padding-top-md">
    <div class="row">
        <BasicFeature
          v-for="basicFeature in basicFeatures"
          :key="basicFeature.id"
          :feature='basicFeature'
        />
    </div>
  </div>

  <div class="container pricing-container d-none d-lg-block" ref="pricingContainer">
    <div class="debug-later">
      <!--
        -Needs some refractoring
        -Tables are hardly responsive / Implement a better solution
      -->
      <PricingComponent />
    </div>
  </div>

  <div class="container padding-bottom-md padding-top-md">
    <div class="login-register-section d-flex flex-lg-row flex-column align-items-center justify-content-start">
      <LoginForm />
      <div class="text-xxl font-color-light margin-sm login-register-sep">OR</div>
      <RegisterForm />
    </div>
  </div>

</template>

<script>
import Hero from "../components/layout/Hero.vue";
import LoginForm from "../components/forms/LoginForm.vue";
import RegisterForm from "../components/forms/RegisterForm.vue";
import BasicFeature from "../components/general/BasicFeature.vue"
import PricingComponent from "../components/general/PricingComponent.vue"
import IconNotificationLight from "@/components/icons/IconNotificationLight.vue"
import IconScan2Light from "@/components/icons/IconScan2Light.vue"
import IconScan1Light from "@/components/icons/IconScan1Light.vue"
import IconLightningLight from "@/components/icons/IconLightningLight.vue"
import IconIntLight from "@/components/icons/IconIntLight.vue"
import IconFeedLight from "@/components/icons/IconFeedLight.vue"
import IconIntegrationLight from "@/components/icons/IconIntegrationLight.vue"
import IconCliLight from "@/components/icons/IconCliLight.vue"
import IconGlobeLight from "@/components/icons/IconGlobeLight.vue"
import IconFishLight from "@/components/icons/IconFishLight.vue"
import IconTuneLight from "@/components/icons/IconTuneLight.vue"

export default {
  components: {
    Hero,
    LoginForm,
    RegisterForm,
    BasicFeature,
    PricingComponent
  },
  data(){
    return {
      heroScrolled: false,
      basicFeatures: [
        {
          id: 1,
          icon: IconNotificationLight,
          header: "Patch Alert",
          description: "Never miss a patch, kick off patch automation or inform your team"
        },
        {
          id: 2,
          icon: IconScan2Light,
          header: "Passive scan",
          description: "Deep DNS analysis, real TLS validation, vast subdomain sources, public responding ports, web libraries, vast 3rd party API integrations for enriched results"
        },
        {
          id: 3,
          icon: IconScan1Light,
          header: "Active scan",
          description: "Protected by an ownership validation; a passive scan but validates all findings"
        },
        {
          id: 4,
          icon: IconLightningLight,
          header: "Trivial Attacks",
          description: "We automate many novel yet trivial attack vectors, and perform evaluations using standard tooling so you don't have to"
        },
        {
          id: 5,
          icon: IconIntLight,
          header: "Threat Intelligence",
          description: "Let's be clear, this is something 'you do' not something you buy, we know this, so our module helps you find the signals you need from a vast source of OSINT and vendor data - and curate blocklists that can be downloaded or sent to your network defence systems"
        },
        {
          id: 6,
          icon: IconFeedLight,
          header: "Feeds",
          description: "There is a lot of written form security information published every hour relevant to your organisation. Our Research & Advisory feed is a curated source for analysts and CISO's for your RSS viewer"
        },
        {
          id: 7,
          icon: IconIntegrationLight,
          header: "Firehose",
          description: "We promote automation using Webhooks for real-time integration into your existing systems"
        },
        {
          id: 8,
          icon: IconCliLight,
          header: "CLI",
          description: "Enables automation via DevOps pipelines"
        },
        {
          id: 9,
          icon: IconGlobeLight,
          header: "Recon",
          description: "We have a vast database of the public internet, compiled from the authoritative list of every registered domain using zone files (and not IP address probing)"
        },
        {
          id: 10,
          icon: IconFishLight,
          header: "Phish Alert",
          description: "Know when sites are copied or domains with similarities for a phishing attacks are registered We adhere to the concept of interoperability. You control your data, and we enable you with a growing list of supported open standard data exchange formats"
        },
        {
          id: 11,
          icon: IconTuneLight,
          header: "On-prem / Self-hosting",
          description: "While Trivial Security was created to make accessible many features typically out of reach to most organisations, our solutions equally benefit large enterprise with data sovereignty and complete control needs also"
        },
        {
          id: 12,
          icon: IconTuneLight,
          header: "Interoperability",
          description: "We adhere to open standards. You control your data, and we enable you with a growing list of supported data exchange formats so you can access and control your data at all times"
        },
      ]
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if(window.scrollY > 10) {
        this.heroScrolled = true;
      } else {
        this.heroScrolled = false;
      }
    }
  }
}
</script>


<style scoped lang='scss'>
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

      &:before {
        content: "";
        z-index: -1;
        background: color("light");
        top: 25px;
        left: 50%;
        bottom: 25px;
        width: 1px;
        position: absolute;
        @media (max-width: $breakpoint-lg) {
          left: 0;
          top: 43%;
          width: 100%;
          height: 1px;
        }
      }
    }
  }
</style>
