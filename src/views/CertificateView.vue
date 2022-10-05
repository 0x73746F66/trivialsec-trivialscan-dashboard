<script setup>
import moment from 'moment'
import CryptoJS from 'crypto-js'
import CertificateDetail from "../components/CertificateDetail.vue";

</script>

<script>
export default {
    data() {
    return {
        loading: false,
        error: null,
        certificate: {},
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
        const req_url = `${this.api_url}/certificate/${this.$route.params.sha1_fingerprint}`
        console.log(req_url)
        const ts = moment().utc().unix()
        const url = new URL(req_url)
        const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
        console.log(canonical_string)
        const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, window.dev_secrets.api_token)
        hash.update(canonical_string)
        const mac = hash.finalize()
        const header = `HMAC id="dashboard", mac="${mac}", ts="${ts}"`
        console.log(header)

        fetch(req_url, {
        headers: {
            "Authorization": header,
            "X-Trivialscan-Account": window.dev_secrets.account_name,
        },
        method: 'GET'
        })
        .then(response => response.text())
        .then(result => {
            this.certificate =JSON.parse(result)
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
    {{ $log(certificate) }}
    <div v-if="error" class="error">{{ error }}</div>

    <div class="certificate">
        <CertificateDetail v-bind="certificate" />
    </div>
    </main>
</template>

<style scoped>
.report {
    margin: 0 auto;
}

@media (min-width: 1024px) {
    .report {
        min-height: 90vh;
        margin: 10vh 0 0 0;
        width: 100%;
        display: flex;
        align-items: center;
    }
}
div {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text);
}
</style>
