<template>
    <div class="container border-radius-sm pricing d-none d-lg-block">
        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <div class="d-flex flex-column">
                    <h3 class="font-xl-b padding-top-lg padding-bottom-sm font-color-light">Services</h3>
                    <span class="font-base font-color-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, laudantium deleniti! 
                    </span>
                </div>
            </template>
            <template v-slot:col-2>
                <div class="d-flex flex-column">
                    <h3 class="font-xl-b padding-top-lg padding-bottom-sm font-color-light">Package 1</h3>
                    <span class="font-base font-color-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, laudantium deleniti!
                    </span>
                </div>
            </template>
            <template v-slot:col-3>
                <div class="d-flex flex-column">
                    <span class="is-recommended">
                        <IconStarPrimary color="F0F0F0" class="pricing-icon margin-right-xs"/>
                        Recommended
                    </span>
                    <h3 class="font-xl-b padding-top-lg padding-bottom-sm font-color-light">Package 2</h3>
                    <span class="font-base font-color-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, laudantium deleniti!
                    </span>
                </div>
            </template>
            <template v-slot:col-4>
                <div class="d-flex flex-column">
                    <h3 class="font-xl-b padding-top-lg padding-bottom-sm font-color-light">Package 3</h3>
                    <span class="font-base font-color-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, laudantium deleniti!
                    </span>
                </div>
            </template>
        </PricingComponentRow>
        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Task 1</h4>
            </template>
            <template v-slot:col-2>
                <checkIcon class="pricing-checkmark"/>
            </template>
            <template v-slot:col-3>
                <checkIcon class="pricing-checkmark pricing-checkmark-is-recommended"/>
            </template>
            <template v-slot:col-4>
                <checkIcon class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>
        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Task 2</h4>
            </template>
            <template v-slot:col-2>
                <checkIcon class="pricing-checkmark"/>
            </template>
            <template v-slot:col-3>
                <checkIcon class="pricing-checkmark pricing-checkmark-is-recommended"/>
            </template>
            <template v-slot:col-4>
                <checkIcon class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>
        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Task 2</h4>
            </template>
            <template v-slot:col-2>
            </template>
            <template v-slot:col-3>
                <checkIcon class="pricing-checkmark pricing-checkmark-is-recommended"/>
            </template>
            <template v-slot:col-4>
                <checkIcon class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>
        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Task 2</h4>
            </template>
            <template v-slot:col-2>
            </template>
            <template v-slot:col-3>
                <checkIcon class="pricing-checkmark pricing-checkmark-is-recommended"/>
            </template>
            <template v-slot:col-4>
                <checkIcon class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>
        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Task 2</h4>
            </template>
            <template v-slot:col-2>
            </template>
            <template v-slot:col-3>
            </template>
            <template v-slot:col-4>
                <checkIcon class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>
        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
                <h4 class="font-xl padding-top-sm padding-bottom-sm font-color-light">Task 2</h4>
            </template>
            <template v-slot:col-2>
            </template>
            <template v-slot:col-3>
            </template>
            <template v-slot:col-4>
                <checkIcon class="pricing-checkmark"/>
            </template>
        </PricingComponentRow>
        <PricingComponentRow class="padding-sm font-color-light pricing-table">
            <template v-slot:col-1>
            </template>
            <template v-slot:col-2>
                <div class="text-center pricing-label w-100">
                    <span class="font-xl">
                        Starting at <span class="font-xl-b font-color-primary">$200.00</span>
                    </span>
                </div>
            </template>
            <template v-slot:col-3>
                <div class="text-center pricing-label w-100 pricing-label-is-recommended">
                    <span class="font-xl">
                        Starting at <span class="font-xl-b font-color-light">$200.00</span>
                    </span>
                </div>
            </template>
            <template v-slot:col-4>
                <div class="text-center pricing-label w-100">
                    <span class="font-xl">
                        Starting at <span class="font-xl-b font-color-primary">$200.00</span>
                    </span>
                </div>
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
                    :defaultShow=true
                    :defaultCollapsed=false
                >
                    <template v-slot:header>
                        Package 1
                    </template>
                    <template v-slot:content>
                        <div class="d-flex flex-column align-items-end">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa aspernatur similique voluptatem aut cum magni. Distinctio error officia, aliquam magnam necessitatibus totam eligendi accusamus perspiciatis dolore expedita. Quod, voluptatem veritatis.
                            <a href="/" class="font-color-primary text-decoration-none">
                                See more details
                                <IconArrowPrimary class="pricing-icon" />
                            </a>
                        </div>
                    </template>
                </Dropdown>
            </div>
            <div class="margin-bottom-md">
                <Dropdown 
                    id="headingTwo"
                    target="collapseTwo"
                    parent="accordion"
                    :defaultShow=false
                    :defaultCollapsed=true
                >
                    <template v-slot:header>
                        <div class="text-sm d-flex margin-bottom-sm d-flex font-xs font-color-primary align-items-center"> 
                            <IconStarPrimary class="pricing-icon-responsive margin-right-sm"/>
                            Recommended
                        </div>
                        Package 2
                    </template>
                    <template v-slot:content>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa aspernatur similique voluptatem aut cum magni. Distinctio error officia, aliquam magnam necessitatibus totam eligendi accusamus perspiciatis dolore expedita. Quod, voluptatem veritatis.
                    </template>
                </Dropdown>
            </div>
            <div class="margin-bottom-md">
                <Dropdown 
                    id="headingThree"
                    target="collapseThree"
                    parent="accordion"
                    :defaultShow=false
                    :defaultCollapsed=true
                >
                    <template v-slot:header>
                        Package 3
                    </template>
                    <template v-slot:content>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa aspernatur similique voluptatem aut cum magni. Distinctio error officia, aliquam magnam necessitatibus totam eligendi accusamus perspiciatis dolore expedita. Quod, voluptatem veritatis.
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
            @extend .font-color-light;
            @extend .bg-primary;
            position: absolute;
            top: -50px;
            left: 0;
            right: 0;
            display: flex;
            padding: spacers('sm') 0;
            align-items: center;
            justify-content: center;
            border-radius: radius("sm") radius("sm") 0 0;
        }
        &-checkmark {
            height: 50px;
            width: 50px;
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
    }
</style>
