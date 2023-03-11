<template>
  <div
    class="login-register-section d-flex flex-lg-row flex-column align-items-center justify-content-start"
  >
    <Modal :id="loginModalId" label="modal-login-header">
      <template v-slot:button="buttonProps">
        <button
          v-bind="buttonProps"
          class="btn-fill-primary-full font-xs font-color-light border-0"
        >
          Login
        </button>
      </template>
      <template v-slot:modalTitle>
        <h5 class="font-xs-b font-color-light">Login</h5>
      </template>
      <template v-slot:modalContent>
        <LoginForm />
      </template>
    </Modal>

    <slot name="separator">
      <span
        class="font-xs-sb font-color-light margin-right-md margin-left-md margin-top-sm margin-bottom-sm my-lg-0"
        >OR</span
      >
    </slot>

    <Modal :id="registerModalId" label="modal-register-header">
      <template v-slot:button="buttonProps">
        <button
          v-bind="buttonProps"
          class="btn-fill-primary-full font-xs font-color-light border-0"
        >
          Register
        </button>
      </template>
      <template v-slot:modalTitle>
        <h5 class="font-xs-b font-color-light">Register</h5>
      </template>
      <template v-slot:modalContent>
        <RegisterForm />
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/general/Modal.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";

export default {
  components: {
    Modal,
    RegisterForm,
    LoginForm,
  },
  props: {
    loginModalId: String,
    registerModalId: String,
  },
};
</script>
<style scoped lang="scss">
.modal {
  overflow: initial;
}
.login-register {
  &-section {
    position: relative;
  }

  &-sep {
    background: color("dark");
    padding: spacers("sm");

    @media (min-width: breakpoints("lg")) {
      &:before {
        content: "";
        z-index: -1;
        background: color("light");
        top: 25px;
        left: 50%;
        bottom: 25px;
        width: 1px;
        position: absolute;
      }
    }
  }
}
</style>
