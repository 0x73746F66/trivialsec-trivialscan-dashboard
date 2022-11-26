<template>
  <LoadingComponent class="modal-loading loading" :class="{ inactive: !loading }" />

  <form class="register-form" @submit.prevent="register">
    <ValidationMessage :message="message" :type="messageType" />

    <TextInput
      placeholder="ACME Corp."
      id="registerUsername"
      label="Organisation Name"
      :required="true"
      @change="handleName"
    />
    <EmaiInput
      placeholder="Primary contact email"
      id="id-email-2"
      label="Login Email"
      :required="true"
      @change="handleEmail"
    />
    <Button
      class="btn-outline-primary-full font-base-sb font-color-primary"
      text="Register"
    />
  </form>
</template>
<script>
import TextInput from "@/components/inputs/TextInput.vue";
import EmaiInput from "@/components/inputs/EmaiInput.vue";
import Button from "@/components/general/Button.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";

let apiUrl = import.meta.env.VITE_API_URL.trim()
apiUrl = `${apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl}`

export default {
  components: {
    TextInput,
    EmaiInput,
    Button,
    ValidationMessage,
    LoadingComponent,
  },
  data() {
    return {
      displayName: "",
      email: "",
      message: "",
      messageType: "",
      loading: false,
    };
  },
  methods: {
    handleName(v) {
      this.displayName = v.target.value;
    },
    handleEmail(v) {
      this.email = v.target.value;
    },
    async register() {
      this.loading = true;
      const payload = JSON.stringify({
        display: this.displayName,
        primary_email: this.email,
        name: "",
      });
      const response = await fetch(`${apiUrl}/account/register`, {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).catch((error) => {
        this.message = `Something went wrong, please try again later.\r\nServer responded with: ${error}`;
        this.messageType = "error";
        this.loading = false;
      });
      if (response.status === 201) {
        this.message = "Account registered with success.\r\nPlease check your e-mail inbox.";
        this.messageType = "success";
        this.loading = false;
      } else if (response.status === 409) {
        this.message = "Account already registered.";
        this.messageType = "warning";
        this.loading = false;
      } else {
        this.message = `${response.status}: ${response.statusText}. Something went wrong, please try again later.`;
        this.messageType = "warning";
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/forms";

.register-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: radius("sm");
  width: 100%;
}
</style>
