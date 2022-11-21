<template>
    <div class="threat-item" v-if="threatId">
        <div class="hexa-container" 
            data-bs-toggle="modal"
            :data-bs-target="`#threat${evalIndex}${threatIndex}${threatId}`"
        >
            <span class="threat-index">{{threatIndex+1}}</span>
            <span class="font-xxs-sb threat-standard">{{threatType}}</span>
            <span class="font-xs-b text-center" v-if="threatLabel">
                {{threatLabel}}
            </span>
            <a v-if="threatId" :href="threaturl" class="font-color-secondary font-xxs">
                ({{threatId}})
            </a>
        </div>
    </div>
    <div class="threat-subtech-item" v-if="threat?.sub_technique">
        <div class="hexa-container" data-bs-toggle="modal" :data-bs-target="`#subthreat${evalIndex}${threatIndex}${threatId}`">
            <span class="font-xxs-sb threat-standard">Subtechnique</span>
            <span class="font-xxs-b"><span class="text-center">{{threat?.sub_technique}}</span></span>
            <a v-if="threat?.sub_technique_id" :href="threat?.sub_technique_url" class="font-color-light font-xxs-b">
                ({{threat?.sub_technique_id}})
            </a>
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
                <div class="modal-header border-0 d-flex justify-content-end">
                <button
                    type="button"
                    class="btn-close m-0 p-0"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <iconCancel color="ffffff" class='modal-icon-close' />
                </button>
                </div>
                <div class="modal-body d-flex flex-column">
                    <span v-html="threatType" class="font-color-secondary font-sm"></span>
                    <div class="d-flex align-items-center justify-content-start margin-bottom-sm">    
                        <span class="font-base margin-right-xs">{{threatLabel}}</span>
                        <a v-if="threatId" :href="threaturl" class="font-color-secondary font-xxs">
                            ({{threatId}})
                        </a>
                    </div>
                    <span class="font-color-light font-sm pre-line" v-html="threatDescription"></span>
                </div>
            </div>
        </div>
    </div>
    <div
        v-if="threat?.sub_technique_description?.length > 0"
        class="modal fade"
        :id="`subthreat${evalIndex}${threatIndex}${threatId}`"
        tabindex="-1"
        aria-labelledby="subthreat-label"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 d-flex justify-content-end">
                <button
                    type="button"
                    class="ml-auto mr-0 btn-close m-0 p-0"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <iconCancel color="ffffff" class='modal-icon-close' />
                </button>
                </div>
                <div class="modal-body d-flex flex-column">
                    <a v-if="threat?.sub_technique_id" :href="threat?.sub_technique_url" class="font-color-secondary font-xxs-b">
                        ({{threat?.sub_technique_id}})
                    </a>
                    <span v-html="threat?.sub_technique" class="font-base margin-bottom-sm"></span>
                    <span class="font-color-light font-sm pre-line" v-html="threat?.sub_technique_description"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import iconCancel from "../icons/IconCancel.vue";

export default {
    components: {
        iconCancel
    },
    props: {
        threat: Object,
        threatIndex: Number,
        evalIndex: Number,
        threatIndex: Number
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
        threatType() {
            let label;
            if(this.threat.data_source) {
                label = "Data Source"
            } else if (this.threat.technique) {
                label = "Technique"
            } else if (this.threat.tactic) {
                label = "Tactic"
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
$size: 150px;
$margin: spacers("xs");
$f: calc($size * 1.732 + 4 * $margin - 1px);

.modal-icon-close {
    width: 25px;
    height: 25px;
    transform: rotate(180deg);
}

.hexagon-main {
    display: flex;
    margin-bottom: spacers('lg');
}

.hexagon-container {
    font-size: 0 !important;
    padding-bottom: spacers('xl');
    
    &:before {
        content: "";
        width: calc($size/2 + $margin);
        float: left;
        height: 100%;
        shape-outside: repeating-linear-gradient(#0000 0 calc($f - 3px), #000 0 $f);
    }
}

.btn-close {
    height: auto;
    width: auto;
}

.hexa-container {
    position: absolute;
    height: calc($size * 1.1547 - 20px);
    width: calc($size - 20px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: color("dark-60");
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
    transition: 0.2s ease-in;
    overflow: hidden;
    cursor: pointer;
    &:hover {
        background: color("dark");
        height: calc($size * 1.1547 - 10px);
        width: calc($size - 10px);
    }
}

.threat {
    &-index {
        position: absolute;
        top: -2%;
        padding-top: spacers("xxs");
        left: calc(50% - calc(15px/2));
        background: color("light-20");
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        height: auto;
        width: 15px;
        border-radius: radius('sm');
        z-index: 5;
        color: color("light");
    }
    &-item, &-subtech-item {
        width: $size;
        margin: $margin;
        height: calc($size * 1.1547);
        display: inline-flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        font-size: initial;
        clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
        margin-bottom: calc($margin - $size * 0.2886); 
        background: color("primary");
        text-align: center;
        position: relative;
    }

    &-standard {
        background: color("secondary");
        color: color('dark');
        padding: 0 spacers("xxs");
        border-radius: radius("sm");
    }

    &-subtech-item {
        background: color("secondary");
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
