<template>
  <svg
    :fill="`#` + color"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="100"
    height="100"
  >
    <path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z" />
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
