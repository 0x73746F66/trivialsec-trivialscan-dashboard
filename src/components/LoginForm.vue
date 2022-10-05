<script setup>
const api_url = import.meta.env.VITE_API_URL
const login = (event) => {
    const email = event.target.querySelector('[name="email"]').value
    const payload = JSON.stringify({ email })
    const req_url = `${api_url}/magic-link`

    fetch(req_url, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method: 'POST',
        body: payload
    })
    .then(response => response.text())
    .then(result => {
        const account = JSON.parse(result)
        console.log('account')
        console.log(account)

    })
    .catch(errors => {
        console.log('errors')
        console.log(errors)

    })
}
</script>
<script>
export default {
    props: ['email', 'errors'],
}
</script>

<template>
    <form @submit.prevent="login">
        <div>
            <label for="email">Email</label>
            <input name="email" v-model="email" placeholder="email">
        </div>
        <input type="submit" value="login">
    </form>
</template>
