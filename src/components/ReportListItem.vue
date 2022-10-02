<script>
export default {
  props: [
    'reports',
  ]
}
</script>
<template>
  <div v-if="reports" class="content">
    <p>reports {{ reports }}</p>
  </div>

</template>
