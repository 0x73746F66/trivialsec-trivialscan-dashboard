<template>
    <div class="d-none d-lg-flex h-100 row">
        <div class="col-4 h-100 d-flex flex-column justify-content-around">
            <div class="h-100 d-flex align-items-center justify-content-center w-100">
                <div
                    class="d-flex flex-column threat-item threat-item-has-description align-items-center justify-content-center"
                    :class="{'threat-item-has-description': threatDescription?.length > 0, 'threat-item-has-description-and-subtech': threat?.sub_technique_description?.length > 0 }"
                    v-if="threatId"
                >
                    <span class="font-xxs-sb threat-standard">{{threat?.standard}} {{threat?.version}}</span>
                    <span class="font-xs-b text-center" v-if="threatLabel">
                        {{threatLabel}}
                        <a
                            v-if="threatId"
                            :href="threaturl"
                            class="font-color-secondary font-xxs"
                        >
                            ({{threatId}})
                        </a>
                    </span>
                </div>
            </div>

            <div
                class="threat-separator-container mt-0 mb-0"
                v-if="threat?.sub_technique_description?.length > 0"
            >
                <span class="threat-separator"></span>
            </div>

            <div class="h-100 d-flex align-items-center justify-content-center w-100" v-if="threat?.sub_technique">
                <div
                    class="threat-subtech-item w-100 text-center padding-top-xs"
                    :class="{'threat-subtech-item-has-description': threat?.sub_technique_description?.length > 0 }"
                >
                    <span class="font-xxs-sb threat-standard">Subtechnique</span>
                    <span class="font-xxs-b">
                        <span class="text-center">{{threat?.sub_technique}}</span>
                        <a
                            v-if="threat?.sub_technique_id"
                            :href="threat?.sub_technique_url"
                            class="font-color-light font-xxs-b"
                            >
                            ({{threat?.sub_technique_id}})
                        </a>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-8 padding-left-md d-flex flex-column align-items-center justify-content-between h-100">
            <div class="h-100 d-flex align-items-center justify-content-center w-100">
                <div
                    class="threat-description font-xs text-center w-100 pre-line"
                    :class="{'margin-bottom-sm': threat?.sub_technique_description?.length > 0}"
                    v-if="threatDescription"
                    v-html="threatDescription">
                </div>
            </div>
            <span style="height:15px"></span>
            <!-- subtech section -->
            <div class="h-100 d-flex align-items-center justify-content-center w-100" v-if="threat?.sub_technique_description">
                <div class="threat-description font-xs text-center w-100 pre-line" v-html="threat?.sub_technique_description"></div>
            </div>
        </div>
    </div>
    <div class="d-flex d-lg-none flex-column h-100">
        <div class="w-100 h-100 d-flex flex-column justify-content-around">
            <div class="h-100 d-flex align-items-center justify-content-center w-100">
                <div
                    class="d-flex flex-column threat-item threat-item-has-description align-items-center justify-content-center"
                    :class="{'threat-item-has-description': threatDescription?.length > 0, 'threat-item-has-description-and-subtech': threat?.sub_technique_description?.length > 0 }"
                    v-if="threatId"
                    data-bs-toggle="modal"
                    :data-bs-target="`#threat${evalIndex}${threatIndex}${threatId}`"
                >
                    <span class="font-xxs-sb threat-standard">{{threat?.standard}} {{threat?.version}}</span>
                    <span class="font-xs-b text-center" id="threat-label" v-if="threatLabel">
                        {{threatLabel}}
                        <a
                            v-if="threatId"
                            :href="threaturl"
                            class="font-color-secondary font-xxs"
                        >
                            ({{threatId}})
                        </a>
                    </span>
                </div>
            </div>

            <div class="threat-separator-container padding-left-sm padding-right-sm" v-if="threat?.sub_technique">
                <span class="threat-separator"></span>
            </div>

            <div class="h-100 d-flex align-items-center justify-content-center w-100" v-if="threat?.sub_technique">
                <div
                    class="threat-subtech-item w-100 text-center padding-top-xs"
                    :class="{'threat-subtech-item-has-description': threat?.sub_technique_description?.length > 0 }"
                    data-bs-toggle="modal"
                    :data-bs-target="`#subthreat${evalIndex}${threatIndex}${threat?.sub_technique_id}`"
                >
                    <span class="font-xxs-sb threat-standard">Subtechnique</span>
                    <span class="font-xxs-b">
                        <span class="text-center">{{threat?.sub_technique}}</span>
                        <a
                            v-if="threat?.sub_technique_id"
                            :href="threat?.sub_technique_url"
                            class="font-color-light font-xxs-b"
                            >
                            ({{threat?.sub_technique_id}})
                        </a>
                    </span>
                </div>
            </div>
        </div>
        <div
            v-if="threatDescription?.length > 0"
            class="modal fade"
            :id="`threat${evalIndex}${threatIndex}${threatId}`"
            tabindex="-1"
            aria-labelledby="threat-label"
            aria-hidden="true"
        >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 d-flex justify-content-start">
                <button
                    type="button"
                    class="btn-close m-0 p-0"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <IconArrowPrimary color="ffffff" class='modal-icon-close'/>
                </button>
                </div>
                <div class="modal-body">
                <span class="font-color-light font-base pre-line" v-html="threatDescription"></span>
                </div>
            </div>
        </div>
        </div>

        <div
            v-if="threat?.sub_technique_description?.length > 0"
            class="modal fade"
            :id="`subthreat${evalIndex}${threatIndex}${threat?.sub_technique_id}`"
            tabindex="-1"
            aria-labelledby="subthreat-label"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0 d-flex justify-content-start">
                    <button
                        type="button"
                        class="btn-close m-0 p-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <IconArrowPrimary color="ffffff" class='modal-icon-close'/>
                    </button>
                    </div>
                    <div class="modal-body">
                    <span class="font-color-light font-base pre-line" v-html="threat?.sub_technique_description"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import IconArrowPrimary from "../icons/IconArrowPrimary.vue";

export default {
    components: {
        IconArrowPrimary
    },
    props: {
        threat: Object,
        threatIndex: Number,
        evalIndex: Number
    },
    computed: {
        threatId() {
            let id;
            if(this.threat.tactic_id) {
                id = this.threat.tactic_id
            } else if (this.threat.data_source_id) {
                id = this.threat.data_source_id
            } else if (this.threat.technique_id) {
                id = this.threat.technique_id
            }
            return id;
        },
        threaturl() {
            let url;
            if(this.threat.tactic_url) {
                url = this.threat.tactic_url
            } else if (this.threat.data_source_url) {
                url = this.threat.data_source_url
            } else if (this.threat.technique_url) {
                url = this.threat.technique_url
            }
            return url;
        },
        threatLabel() {
            let label;
            if(this.threat.data_source) {
                label = this.threat.data_source
            } else if (this.threat.technique) {
                label = this.threat.technique
            } else if (this.threat.tactic) {
                label = this.threat.tactic
            }
            return label;
        },
        threatDescription() {
            let desc;
            if(this.threat.tactic_description) {
                desc = this.threat.tactic_description
            } else if (this.threat.technique_description) {
                desc = this.threat.technique_description
            } else if (this.threat.data_source_description) {
                desc = this.threat.data_source_description
            }
            return desc;
        }
    }
}
</script>
<style lang="scss">
.modal-icon-close {
    width: 25px;
    height: 25px;
    transform: rotate(180deg);
}
.threat {
  &-item {
    // margin-bottom: spacers("sm");
    background: color("dark-40");
    border-radius: radius("lg");
    border: 4px solid color("primary");
    padding: spacers("xs") spacers("sm");
    position: relative;
    width: 100%;
    // margin-top: 20px;
    padding-top: 20px;
    // margin-bottom: 30px;
    // padding-bottom: 20px;
    min-height: 70px;

    &-has-description {
        &:after {
          @media (min-width: $breakpoint-lg){
            content: "";
            position: absolute;
            right: -40px;
            left: 101%;
            z-index: -1;
            height: 1px;
            top: calc(50% - 1px);
            border: 1px solid color("primary");
        }
      }
    }

    &-container {
        display: flex;
        align-items: center;
    }
  }
  &-standard {
    position: absolute;
    top: -20px;
    left: 0;
    padding: spacers("xxs") spacers("xs");
    border-radius: radius("lg");
    border: 2px solid color("secondary");
    background: color("secondary");
    color: color('dark');
  }
  &-subtech-item {
    // position: absolute;
    // bottom: -20px;
    // right: 0;
    position: relative;
    padding: spacers("xxs") spacers("xs");
    border-radius: radius("lg");
    border: 2px solid color("primary");
    background: color("dark");
    color: color('primary');
    width: 100%;

    &-has-description{
        &:after {
              @media (min-width: $breakpoint-lg){
                content: "";
                position: absolute;
                right: -37px;
                left: 100%;
                z-index: -1;
                height: 1px;
                top: calc(50% - 1px);
                border: 1px solid color("primary");
            }
        }
    }
  }
  &-separator {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: color("primary");
    margin-left: auto;
    margin-right: auto;
    &-container {
      margin-bottom: 30px;
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: center

    }
  }
  &-description {
    padding: spacers("xs") spacers("sm");
    background: color("dark-40");
    border: 4px solid color("primary");
    position: relative;
    // margin-top: 20px;
    // margin-bottom: 30px;
  }
}
</style>
