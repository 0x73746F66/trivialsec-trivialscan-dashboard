<script>
export default {
  props: [
    'report',
  ]
}
</script>
<template>
  <div v-if="report.report_id" class="content">
    <p>report_id {{ report.report_id }}</p>
  </div>
  <div v-if="report.report_url" class="content">
    <p>report_url {{ report.report_url }}</p>
  </div>
</template>
