<template>
  <svg
    :fill="`#` + color"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="100"
    height="100"
  >
    <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "F0F0F0",
    },
  },
};
</script>
