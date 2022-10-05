<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greeting">
    <h1>{{ text }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  color: var(--color-primary);
}

h3 {
  font-size: 1.2rem;
}

.greeting h1,
.greeting h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greeting h1,
  .greeting h3 {
    text-align: left;
  }
}
</style>
