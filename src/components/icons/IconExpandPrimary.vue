<template>
  <svg
    :fill="`#` + color"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="100"
    height="100"
  >
    <path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" />
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
