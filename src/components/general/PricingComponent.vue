<template>
  <div class="container border-radius-sm pricing d-none d-lg-block">
    <PricingComponentRow class="font-color-light pricing-table">
      <template v-slot:col-1>
        <div class="d-flex flex-column">
          <h3
            class="font-xl-b padding-top-lg padding-bottom-sm font-color-light"
          >
            Features
          </h3>
        </div>
      </template>
      <template v-slot:col-2> </template>
      <template v-slot:col-3>
        <div class="d-flex flex-column w-100">
          <h3
            class="font-xl-b padding-top-lg padding-bottom-sm font-color-light text-center"
          >
            Community Edition
          </h3>
        </div>
      </template>
      <template v-slot:col-4>
        <div class="d-flex flex-column w-100">
          <!-- <span class="is-recommended font-base">
                        <IconStarPrimary color="1abb9c" class="pricing-icon margin-right-xs"/>
                        Recommended
                    </span> -->
          <h3
            class="font-xl-b padding-top-lg padding-bottom-sm font-color-light text-center"
          >
            Professional
          </h3>
        </div>
      </template>
      <template v-slot:col-5>
        <div class="d-flex flex-column w-100">
          <h3
            class="font-xl-b padding-top-lg padding-bottom-sm font-color-light text-center"
          >
            Enterprise
          </h3>
        </div>
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1> </template>
      <template v-slot:col-2> </template>
      <template v-slot:col-3>
        <div
          class="d-flex flex-column justify-content-center align-items-center w-100 padding-sm"
        >
          <span class="font-color-primary font-base-sb text-center w-100"
            >Free</span
          >
        </div>
      </template>
      <template v-slot:col-4>
        <div
          class="d-flex flex-column justify-content-center align-items-center w-100 padding-sm"
        >
          <span class="font-color-primary font-base-sb text-center w-100"
            >USD $199 / Month
          </span>
        </div>
      </template>
      <template v-slot:col-5>
        <div
          class="d-flex flex-column justify-content-center align-items-center w-100 padding-sm"
        >
          <span class="font-color-primary font-base-sb text-center w-100"
            >Contact Us</span
          >
        </div>
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Passive Scans
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">On-demand (Self-managed)</span>
      </template>
      <template v-slot:col-3>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">On-demand (Managed)</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center"
          >All Hosts Initial Scan Free</span
        >
        <span class="font-base w-100 text-center"
          >$15 / Month Unlimited Rescans</span
        >
      </template>
      <template v-slot:col-4>
        <span class="font-base w-100 text-center">500 / Day</span>
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Continuous Monitoring</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center">1 Free / Day</span>
        <span class="font-base w-100 text-center">$3 / Month per Host</span>
      </template>
      <template v-slot:col-4>
        <span class="font-base w-100 text-center">10 / Day</span>
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Active Scans
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">On-demand (Managed)</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <span class="font-base w-100 text-center">50 / Day</span>
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Continuous Monitoring</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <span class="font-base w-100 text-center">10 / Day</span>
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Trivial exposures
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Web/API</span>
      </template>
      <template v-slot:col-3>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Vulnerable Software
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">CVE/GSD</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Alert Delivery
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Email</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Service Integrations</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Auto-remediation
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Webhook</span>
      </template>
      <template v-slot:col-3>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Trivial Threats
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Threat Intel Feed</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Indicators of Compromise</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light"
          >Brand protection<br />Typosquatting</span
        >
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">MITRE ATT&CK mappings </span>
      </template>
      <template v-slot:col-3>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Compliance
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">PCI DSS (v3.2.1, 4.0)</span>
      </template>
      <template v-slot:col-3>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-tabley">
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">NIST SP800-131A</span>
      </template>
      <template v-slot:col-3>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">FIPS 140-2</span>
      </template>
      <template v-slot:col-3>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Branded Reports</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Access
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">SAML SSO</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1>
        <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">
          Support
        </h4>
      </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">Open Source Issues</span>
      </template>
      <template v-slot:col-3>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow class="padding-sm font-color-light pricing-table">
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light"
          >5 Business Days Resolution</span
        >
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>

    <PricingComponentRow
      class="padding-sm font-color-light pricing-table border-bottom-primary"
    >
      <template v-slot:col-1> </template>
      <template v-slot:col-2>
        <span class="font-base font-color-light">48 Hours Resolution</span>
      </template>
      <template v-slot:col-3>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-4>
        <span class="font-base w-100 text-center font-color-tertiary">X</span>
      </template>
      <template v-slot:col-5>
        <checkIcon color="1abb9c" class="pricing-checkmark" />
      </template>
    </PricingComponentRow>
  </div>

  <div class="d-block d-lg-none">
    <div class="accordion">
      <div class="margin-bottom-md">
        <Dropdown
          id="headingOne"
          target="collapseOne"
          parent="accordion"
          :defaultShow="true"
          :defaultCollapsed="false"
          buttonClasses="font-lg text-left padding-left-sm font-color-light w-100 d-flex justify-content-left border-none custom-accordion-button padding-xxs"
          contentClasses="custom-according-content bg-dark-20 padding-md font-color-light font-base"
          >
          <template v-slot:header>
            <div
              class="font-base font-color-light d-flex d-flex flex-column font-color-primary align-items-start"
            >
              Community Edition (CE)
              <span class="text-xs font-color-primary">Free</span>
            </div>
          </template>
          <template v-slot:content>
            <div class="d-flex flex-column align-items-start">
              Get the Professional plan upgrade to enable Active Scans.
              <br /><br />
              CE includes On-demand self-hosted Passive Scans or the managed
              initial Scan for all hosts is Free (Add USD $15/Month for
              Unlimited Rescans)
              <br /><br />
              CE has 1 Free / Day Continuous Monitoring, (Add USD $3/Month per
              additional Host)
              <br /><br />
              What you will get; Web/API Trivial exposures, MITRE ATT&CK
              mappings, Auto-Remediation via Webhooks, Compliance (PCI, NIST
              SP800-131A, FIPS 140-2), and Open Source Issue reports.
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="margin-bottom-md">
        <Dropdown
          id="headingTwo"
          target="collapseTwo"
          parent="accordion"
          :defaultShow="false"
          :defaultCollapsed="true"
          buttonClasses="font-lg text-left padding-left-sm font-color-light w-100 d-flex justify-content-left border-none custom-accordion-button padding-xxs"
          contentClasses="custom-according-content bg-dark-20 padding-md font-color-light font-base"
        >
          <template v-slot:header>
            <!-- <div class="text-sm d-flex margin-bottom-sm d-flex font-xs font-color-primary align-items-center">
                            <IconStarPrimary class="pricing-icon-responsive margin-right-sm"/>
                            Recommended
                        </div> -->
            <div
              class="font-base font-color-light d-flex d-flex flex-column font-color-primary align-items-start"
            >
              Professional (PRO)
              <span class="text-xs font-color-primary">USD $199/Month</span>
            </div>
          </template>
          <template v-slot:content>
            <div class="d-flex flex-column align-items-start">
              All Community Edition inclusions plus; 500/Day On-demand managed
              Passive Scans, 50/Day Active Scans, and 10/Day Continuous
              Monitoring for both.
              <br />
              <br />
              Additionally PRO unlocks Vulnerable Software CVE/GSD alerts via
              Email and Service Integrations, with 5 Business Days Resolution
              support SLA.
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="margin-bottom-md">
        <Dropdown
          id="headingThree"
          target="collapseThree"
          parent="accordion"
          :defaultShow="false"
          :defaultCollapsed="true"
          buttonClasses="font-lg text-left padding-left-sm font-color-light w-100 d-flex justify-content-left border-none custom-accordion-button padding-xxs"
          contentClasses="custom-according-content bg-dark-20 padding-md font-color-light font-base"
        >
          <template v-slot:header>
            <div
              class="font-base font-color-light d-flex d-flex flex-column font-color-primary align-items-start"
            >
              Enterprise
              <span class="text-xs font-color-primary">Contact Us</span>
            </div>
          </template>
          <template v-slot:content>
            <div class="d-flex flex-column align-items-start">
              All Professional Edition inclusions plus; Restriction free,
              Unlimited, Active and Passive Scans both Managed On-demand and
              Continuous Monitoring
              <br />
              Branded Reports on Compliance
              <br />
              SAML SSO Access
              <br />
              <br />
              Support SLA 48 Hours Resolution
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import checkIcon from "../icons/checkIcon.vue";
import IconStarLight from "../icons/IconStartLight.vue";
import IconStarPrimary from "../icons/IconStartPrimary.vue";
import IconArrowPrimary from "../icons/IconArrowPrimary.vue";
import PricingComponentRow from "./PricingComponentRow.vue";
import Dropdown from "./Dropdown.vue";

export default {
  components: {
    checkIcon,
    PricingComponentRow,
    Dropdown,
    IconStarLight,
    IconStarPrimary,
    IconArrowPrimary,
  },
};
</script>
<style lang="scss">
.pricing {
  &-list {
    list-style: none;
    li {
      @extend .padding-bottom-md;
      @extend .font-lg;
    }
  }
  &-icon {
    max-width: 25px;
    height: 25px;
    &-responsive {
      width: 15px;
      height: 15px;
    }
  }
  .is-recommended {
    @extend .font-color-primary;
    position: absolute;
    top: -25px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &-checkmark {
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    &-is-recommended {
      @extend .bg-primary;
      border-radius: 50%;
    }
  }
  &-label {
    @extend .padding-lg;
    &-is-recommended {
      border-radius: 0 0 radius("sm") radius("sm");
      background: color("primary");
    }
  }
  &-table {
  }
}
</style>
