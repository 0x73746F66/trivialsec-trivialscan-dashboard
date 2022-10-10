<template>
    <div class="container border-radius-sm pricing d-none d-lg-block">
        <PricingComponentRow class="font-color-light pricing-table">
            <template v-slot:col-1>
                <div class="d-flex flex-column">
                    <h3 class="font-xl-b padding-top-lg padding-bottom-sm font-color-light">Features</h3>
                </div>
            </template>
            <template v-slot:col-2>
            </template>
            <template v-slot:col-3>
                <div class="d-flex flex-column w-100">
                    <h3 class="font-xl-b padding-top-lg padding-bottom-sm font-color-light text-center">Community Edition</h3>
                </div>
            </template>
            <template v-slot:col-4>
                <div class="d-flex flex-column w-100">
                    <!-- <span class="is-recommended font-base">
                        <IconStarPrimary color="1abb9c" class="pricing-icon margin-right-xs"/>
                        Recommended
                    </span> -->
                    <h3 class="font-xl-b padding-top-lg padding-bottom-sm font-color-light text-center">Professional</h3>
                </div>
            </template>
            <template v-slot:col-5>
                <div class="d-flex flex-column w-100">
                    <h3 class="font-xl-b padding-top-lg padding-bottom-sm font-color-light text-center">Enterprise</h3>
                </div>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
            </template>
            <template v-slot:col-3>
                <div class="d-flex flex-column justify-content-center align-items-center w-100 padding-sm">
                    <span class="font-color-primary font-base-sb text-center w-100">Free</span>
                </div>
            </template>
            <template v-slot:col-4>
                <div class="d-flex flex-column justify-content-center align-items-center w-100 padding-sm">
                    <span class="font-color-primary font-base-sb text-center w-100">USD $199 / Month </span>
                </div>
            </template>
            <template v-slot:col-5>
                <div class="d-flex flex-column justify-content-center align-items-center w-100 padding-sm">
                    <span class="font-color-primary font-base-sb text-center w-100">Contact Us</span>
                </div>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Passive Scans</h4>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">On-demand (Self-managed)</span>
            </template>
            <template v-slot:col-3>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark" />
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">On-demand (Managed)</span>
            </template>
            <template v-slot:col-3>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-4>
                <span class="font-base w-100 text-center">500 / Day</span>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Continuous Monitoring</span>
            </template>
            <template v-slot:col-3>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-4>
                <span class="font-base w-100 text-center">10 / Day</span>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Active Scans</h4>
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
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
            </template>
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
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Trivial exposures</h4>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Web/API</span>
            </template>
            <template v-slot:col-3>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Vulnerable Software</h4>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">CVE/GSD</span>
            </template>
            <template v-slot:col-3>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Alert Delivery</h4>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Email</span>
            </template>
            <template v-slot:col-3>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Service Integrations</span>
            </template>
            <template v-slot:col-3>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Auto-remediation</h4>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Webhook</span>
            </template>
            <template v-slot:col-3>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Trivial Threats</h4>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Threat Intel Feed</span>
            </template>
            <template v-slot:col-3>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Indicators of Compromise</span>
            </template>
            <template v-slot:col-3>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Brand protection<br/>Typosquatting</span>
            </template>
            <template v-slot:col-3>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">MITRE ATT&CK mappings </span>
            </template>
            <template v-slot:col-3>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Compliance</h4>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">PCI</span>
            </template>
            <template v-slot:col-3>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">CIS Benchmark</span>
            </template>
            <template v-slot:col-3>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-4>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Access</h4>
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
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Support</h4>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">Open Source Issues</span>
            </template>
            <template v-slot:col-3>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <span class="font-base font-color-light">5 Business Days Resolution</span>
            </template>
            <template v-slot:col-3>
                <span class="font-base w-100 text-center font-color-tertiary">X</span>
            </template>
            <template v-slot:col-4>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
            <template v-slot:col-5>
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>

        <PricingComponentRow class="padding-sm font-color-light pricing-table border-bottom-primary">
            <template v-slot:col-1>
            </template>
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
                <checkIcon color="1abb9c" class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>
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
        components: {checkIcon, PricingComponentRow, Dropdown, IconStarLight, IconStarPrimary, IconArrowPrimary}
    }
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
