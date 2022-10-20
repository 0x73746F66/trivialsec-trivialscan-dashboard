<template>
  <div class="custom-field h-100">
    <label :for="id">{{ this.label }}</label>
    <textarea
      :required="required"
      :id="id"
      :name="id"
      :placeholder="placeholder"
      @input="handleInput"
      maxlength="2000"
      >{{ textDefault }}</textarea
    >
  </div>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    placeholder: String,
    id: String,
    label: String,
    required: Boolean,
    textDefault: String,
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.custom-field {
  textarea {
    min-height: 190px;
  }
}

input {
  &::placeholder {
    color: color("light-60");
  }
}
</style>
