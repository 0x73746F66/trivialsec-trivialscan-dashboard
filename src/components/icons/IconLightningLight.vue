<template>
  <svg
    :fill="`#` + color"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="100"
    height="100"
  >
    <path d="M20 46V28h-6V4h20l-8 18h8Z" />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "1abb9c",
    },
  },
};
</script>
