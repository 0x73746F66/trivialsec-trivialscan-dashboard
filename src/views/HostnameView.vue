<script setup>
import moment from 'moment'
import CryptoJS from 'crypto-js'
import HostDetail from "../components/HostDetail.vue";
</script>

<script>
export default {
    data() {
    return {
        loading: false,
        error: null,
        host: {},
        api_url: import.meta.env.VITE_API_URL,
    }
    },
    created() {
    // watch the params of the route to fetch the data again
    this.$watch(
        () => this.$route.params,
        () => {
        this.fetchData();
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
    );
    },
    methods: {
    fetchData() {
        this.loading = true
        const req_url = `${this.api_url}/host/${this.$route.params.hostname}?port=${this.$route.params.port}`
        const ts = moment().utc().unix()
        const url = new URL(req_url)
        const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
        console.log(canonical_string)
        const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
        hash.update(canonical_string)
        const mac = hash.finalize()
        const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
        console.log(header)

        fetch(req_url, {
        headers: {
            "Authorization": header,
            "X-Trivialscan-Account": localStorage.getItem('/account/name'),
        },
        method: 'GET'
        })
        .then(response => response.text())
        .then(result => {
            this.host =JSON.parse(result)
            this.loading = false
        })
        .catch(error => {
            this.error = error
            this.loading = false
        })
    },
    },
};
</script>

<template>
<main>
    <div v-if="loading" class="loading">Loading...</div>
    {{ $log(host) }}
    <div v-if="error" class="error">{{ error }}</div>

    <div class="host">
        <HostDetail v-bind="host" />
    </div>
</main>
</template>

<style scoped>
.host {
    margin: 0 auto;
}

@media (min-width: 1024px) {
.host {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text);
    line-height: 1.5rem;
}
}
</style>
