<template>
    <div class="d-flex margin-top-sm flex-wrap">
        <div v-if="results?.fail > 0" class="summary-pill error">
            <IconError class="summary-icon" color="" />
            <span class="font-color-dark">{{results?.fail}}</span>
            <span class="summary-pill-legend margin-left-xxs">Failures</span>
        </div>
        <div v-if="results?.warn > 0" class="summary-pill warning">
            <IconWarning class="summary-icon" color="" />
            <span class="font-color-dark">{{results?.warn}}</span>
            <span class="summary-pill-legend margin-left-xxs">Warnings</span>
        </div>
        <div v-if="results?.pass > 0" class="summary-pill pass">
            <checkIcon class="summary-icon" color="" />
            <span class="font-color-dark">{{results?.pass}}</span>
            <span class="summary-pill-legend margin-left-xxs">Passes</span>
        </div>
        <div v-if="results?.info > 0" class="summary-pill info">
            <IconInfo class="summary-icon" color="" />
            <span class="font-color-dark">{{results?.info}}</span>
            <span class="summary-pill-legend margin-left-xxs">Informational</span>
        </div>
    </div>
</template>
<script>
import checkIcon from "@/components/icons/checkIcon.vue"
import IconError from "@/components/icons/IconError.vue"
import IconWarning from "@/components/icons/IconWarning.vue"
import IconInfo from "@/components/icons/IconInfo.vue"

export default {
    props: {
        results: Object
    },
    components: {
        checkIcon,
        IconError,
        IconWarning,
        IconInfo,
    }
}
</script>
<style lang="scss">
    .summary {
        &-icon {
            width: 25px;
            height: 25px;
            margin-right: spacers("xs");
            &-certificates,
            &-targets {
                width: 25px;
                height: 25px;
                margin-right: spacers("xxs");
            }
            &-next {
                width: 25px;
                height: 25px;
                margin-right: 0;
            }
        }
        &-pill {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0px;
            border-radius: radius("sm");
            color: color("dark");
            margin-right: spacers("sm");
            padding: spacers("xxs") spacers("xs");
            transition: 0.2s linear;
            @include media-breakpoint-down(lg){
                margin-bottom: spacers("sm");
                min-width: 40%;
            }

            &-legend {
                display: none;
            }

            &:hover {
                .summary-pill-legend {
                    display: block
                }
            }

            &.error {
                background: color("danger");
            }
            &.warning {
                background: color("warning");
            }
            &.pass {
                background: color("primary");
            }
            &.info {
                background: color("light-40");
            }
        }
    }
</style>
