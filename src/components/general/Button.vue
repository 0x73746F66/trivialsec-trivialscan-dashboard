<template>
  <button :disabled="disabled" :required="required">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
};
</script>
