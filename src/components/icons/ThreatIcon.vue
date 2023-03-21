<template>
    <div>
        <IconError v-if="severity=='high'" color="f45e5e" class="threat-icon" />
        <IconWarning v-if="severity=='medium'" color="e2c878" class="threat-icon" />
        <IconInfo v-if="!severity||severity=='info'" color="f0f0f099" class="threat-icon"/>
        <checkIcon v-if="severity=='pass'" color="1abb9c" class="threat-icon"/>
    </div>
</template>
<script>
import IconError from "./IconError.vue"
import checkIcon from "./checkIcon.vue"
import IconWarning from "./IconWarning.vue"
import IconInfo from "./IconInfo.vue"

export default {
    props: {
        severity: String
    },
    components: {
        IconError,
        checkIcon,
        IconWarning,
        IconInfo
    },
}
</script>
<style lang="scss">
    .threat-icon {
        width: 25px;
        height: 25px;
        margin-right: spacers("xs");
    }
</style>