<script>
export default {
  props: [
    "generator",
    "version",
    "account_name",
    "client_name",
    "project_name",
    "targets",
    "date",
    "execution_duration_seconds",
    "score",
    "results",
    "certificates",
    "results_uri",
  ],
};
</script>
<template>
  <div v-if="results_uri">
    <p><a :href="results_uri">Report Summary</a></p>
  </div>
  <div v-if="generator">
    <p>generator {{ generator }}</p>
  </div>
  <div v-if="version">
    <p>version {{ version }}</p>
  </div>
  <div v-if="client_name">
    <p>client_name {{ client_name }}</p>
  </div>
  <div v-if="date">
    <p>date {{ date }}</p>
  </div>
  <div v-if="project_name">
    <p>project_name {{ project_name }}</p>
  </div>
  <div v-if="execution_duration_seconds">
    <p>execution_duration_seconds {{ execution_duration_seconds }}</p>
  </div>
  <div v-if="targets" v-for="target in targets">
    <p>
      target
      <a :href="'/hostname/' + target.split(':').join('/')">{{ target }}</a>
    </p>
  </div>
  <div v-if="score">
    <p>score {{ score }}</p>
  </div>
  <div v-if="results">
    <p>fail {{ results.fail }}</p>
    <p>warn {{ results.warn }}</p>
    <p>pass {{ results.pass }}</p>
    <p>info {{ results.info }}</p>
  </div>
  <div v-if="certificates" v-for="cert in certificates">
    <p>
      certificate <a :href="'/certificate/' + cert">{{ cert }}</a>
    </p>
  </div>
</template>
