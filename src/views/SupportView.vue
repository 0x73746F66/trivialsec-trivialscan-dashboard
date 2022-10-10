<template>
  <div class="support-section container">
    <div class="padding-top-lg padding-bottom-lg">
      <h2 class="font-color-light">Need help? Reach out to us!</h2>
      <ContactForm />
    </div>
  </div>
</template>

<script setup>
  import ContactForm from '../components/forms/ContactForm.vue';
</script>

<script>
  export default {
    components: {ContactForm}
  };
</script>

<style scoped lang="scss">
  .support-section {
    min-height: 50vh;
  }
</style>
