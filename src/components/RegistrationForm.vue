<script setup>
const api_url = import.meta.env.VITE_API_URL;
const register = (event) => {
  const display = event.target.querySelector('[name="display"]').value;
  const primary_email = event.target.querySelector(
    '[name="primary_email"]'
  ).value;
  const payload = JSON.stringify({ display, primary_email, name: "" });
  const req_url = `${api_url}/account/register`;

  fetch(req_url, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    method: "POST",
    body: payload,
  })
    .then((response) => response.text())
    .then((result) => {
      const account = JSON.parse(result);
      console.log(account);
    })
    .catch((errors) => {
      console.log(errors);
    });
};
</script>
<script>
export default {
  props: ["display", "primary_email", "errors"],
};
</script>

<template>
  <form @submit.prevent="register">
    <div>
      <label for="display">Account Name</label>
      <input name="display" v-model="display" placeholder="display" />
    </div>
    <div>
      <label for="primary_email">Email</label>
      <input
        name="primary_email"
        v-model="primary_email"
        placeholder="primary_email"
      />
    </div>
    <input type="submit" value="register" />
  </form>
</template>
