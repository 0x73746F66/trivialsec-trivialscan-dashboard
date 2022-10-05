<script>
export default {
    props: ['last_updated', 'tls', 'http', 'transport']
}
</script>
<template>

    <div v-if="last_updated">
        last_updated: {{ last_updated }}
    </div>
    <div v-if="transport">
        transport: {{ transport }}
    </div>
    <div v-if="tls">
        tls: {{ tls }}
    </div>
    <div v-if="http" v-for="req in http">
        http request: {{ req }}
    </div>

</template>
