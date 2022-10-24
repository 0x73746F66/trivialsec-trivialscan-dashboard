<template>
    <div>
        <IconCertificate v-if="critical" color="f45e5e" class="threat-icon" />
        <IconCertificate  v-else color="1abb9c" class="threat-icon"/>
    </div>
</template>
<script>
import IconError from "./IconError.vue"
import IconCertificate from "./IconCertificate.vue"
import IconWarning from "./IconWarning.vue"

export default {
    props: {
        critical: Boolean
    },
    components: {
        IconError,
        IconCertificate,
        IconWarning
    }
}
</script>
<style lang="scss">
    .threat-icon {
        width: 25px;
        height: 25px;
        margin-right: spacers("xs");
    }
</style>