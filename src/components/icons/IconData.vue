<template>
  <svg
    :fill="`#` + color"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="100"
    height="100"
  >
    <path
      d="M14.2 34.15h3V23.9h-3Zm16.6 0h3v-21h-3Zm-8.3 0h3v-5.9h-3Zm0-10.25h3v-3h-3ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z"
    />
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
