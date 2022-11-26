<template>
  <div
    v-if="message.length > 0"
    class="w-100 validation-message d-flex justify-content-between align-items-center"
  >
    <span :class="messageClassType">
      {{ message }}
    </span>
    <span class="validation-message-icon">
      <checkIcon v-if="type === 'success'" color="1abb9c" />
      <IconError v-if="type === 'error'" color="f45e5e" />
      <IconWarning v-if="type === 'warning'" color="f1ca67" />
    </span>
  </div>
</template>
<script>
import checkIcon from "@/components/icons/checkIcon.vue";
import IconError from "@/components/icons/IconError.vue";
import IconWarning from "@/components/icons/IconWarning.vue";

export default {
  props: {
    message: String,
    type: String,
  },
  components: { checkIcon, IconWarning, IconError },
  computed: {
    messageClassType() {
      return "validation-message-" + this.type;
    },
  },
};
</script>
<style lang="scss">
.validation-message {
  &-icon {
    border-radius: radius("sm");
    padding: spacers("sm") spacers("xs");

    svg {
      width: 25px;
      height: 25px;
    }
  }
  &-success {
    @extend .font-color-primary;
  }
  &-warning {
    @extend .font-color-warning;
  }
  &-error {
    @extend .font-color-danger;
  }
}
</style>
