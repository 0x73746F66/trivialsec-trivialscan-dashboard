<template>
  <svg
    :fill="`#` + color"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="100"
    height="100"
  >
    <path
      d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "f0f0f0",
    },
  },
};
</script>
