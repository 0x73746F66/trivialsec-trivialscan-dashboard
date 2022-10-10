<template>

  <div class="hero-container">
    <Hero :class="{ 'hero-scrolled': heroScrolled }"/>
  </div>

  <div class="container basic-feature-container padding-bottom-md padding-top-md">
    <div class="row padding-top-lg padding-bottom-lg">
        <BasicFeature
          v-for="basicFeature in basicFeatures"
          :key="basicFeature.id"
          :feature='basicFeature'
        />
    </div>
  </div>

  <div 
    class="container-fluid padding-top-xl padding-bottom-md bg-dark-20 pricing-container px-0" 
    ref="pricingContainer"
  >
    <div class="container">
      <PricingComponent />
      <span class="margin-top-sm d-block font-sm font-color-light">* Software or Libraries as provided in supported formats with CVE.</span>
      <span class="d-block font-sm font-color-light">** Depends on customer provided software, advises how many patches behind your installed versions are.</span>
      <span class="d-block font-sm font-color-light">^ Customers unique identifiers appear in malware or intelligence reported as a threat actor</span>
      <span class="d-block font-sm font-color-light">^^ Customers industry or market is showing signs of increased malware or threat actor activity</span>
    </div>
  </div>

  <div class="container padding-bottom-xl padding-top-xl">
    <div class="login-register-section d-flex flex-lg-row flex-column align-items-center justify-content-start">
      <Modal id="loginModal" label="modal-login-header">
        <template v-slot:button="buttonProps">
          <button 
            v-bind="buttonProps" 
            class="btn-fill-primary-full font-xl font-color-light border-0"
          > 
            Login 
          </button>
        </template>
        <template v-slot:modalTitle>
          <h5 class="font-xl-b font-color-light">Login</h5>
        </template>
        <template v-slot:modalContent>
          <LoginForm />
        </template>
      </Modal>

      <span class="font-base-sb font-color-light margin-md">OR</span>

      <Modal id="registerModal" label="modal-register-header">
        <template v-slot:button="buttonProps">
          <button 
            v-bind="buttonProps" 
            class="btn-fill-primary-full font-xl font-color-light border-0"
          > 
            Register 
          </button>
        </template>
        <template v-slot:modalTitle>
          <h5 class="font-xl-b font-color-light">Register</h5>
        </template>
        <template v-slot:modalContent>
          <RegisterForm />
        </template>
      </Modal>
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
import Dropdown from "@/components/general/Dropdown.vue"
import Modal from "@/components/general/Modal.vue"

export default {
  components: {
    Hero,
    LoginForm,
    RegisterForm,
    BasicFeature,
    PricingComponent,
    Dropdown,
    Modal
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
    },
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
