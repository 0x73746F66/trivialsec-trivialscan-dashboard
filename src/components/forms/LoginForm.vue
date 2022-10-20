<template>
  <loadingComponent class="loading" :class="{ inactive: !loading }" />

  <form class="login-form" @submit.prevent="login">
    <ValidationMessage
      class="justify-content-between"
      :message="message"
      :type="messageType"
    />

    <EmaiInput
      placeholder="Send an email with login link"
      id="id-email-1"
      label="Email"
      :required="true"
      :model="email"
      @change="handleEmail"
    />

    <Button
      class="btn-outline-primary-full font-xl-sb font-color-primary"
      text="Login"
      @click="submit"
    />
  </form>
</template>
<script>
import EmaiInput from "../inputs/EmaiInput.vue";
import Button from "../general/Button.vue";
import ValidationMessage from "../general/ValidationMessage.vue";
import loadingComponent from "../general/loadingComponent.vue";

export default {
  components: { EmaiInput, Button, ValidationMessage, loadingComponent },
  data() {
    return {
      emailField: "",
      message: "",
      messageType: "",
      api_url: import.meta.env.VITE_API_URL,
      loading: false,
    };
  },
  methods: {
    handleEmail(v) {
      this.emailField = v.target.value;
    },
    async login() {
      this.loading = true;
      const payload = JSON.stringify({
        email: this.emailField,
      });
      const response = await fetch(`${this.api_url}/magic-link`, {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch((errors) => {
        console.log(errors);
        this.message = "An error has occured, please try again.";
        this.messageType = "error";
        this.loading = false;
      });
      const data = await response.json();
      if (response.status === 202) {
        this.message = "Please check you e-mail to complete login.";
        this.messageType = "success";
        this.loading = false;
        setTimeout(() => (window.location.href = "/"), 3000);
      } else {
        console.log(data);
        this.message = `Something went wrong, please try again later.`;
        this.messageType = "error";
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/forms";

.login-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: radius("sm");
  width: 100%;
}
</style>
