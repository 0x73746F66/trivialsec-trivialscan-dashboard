<script setup>
import { RouterLink, RouterView } from "vue-router";
import MainHeading from "./components/MainHeading.vue";
</script>

<template>
  <header>
    <RouterLink to="/" v-slot="{ href }">
      <a :href="href"><img
        alt="logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      /></a>
    </RouterLink>
    <div class="wrapper">
      <MainHeading text="Trivial Security" />
      <nav>
        <RouterLink to="/" class="font-base-sb btn-outline-primary-small">Home</RouterLink>
        <RouterLink to="/results">Reports</RouterLink>
        <RouterLink v-if="$route.params.report_id" :to="{name: 'summary', params: {report_id: $route.params.report_id}}">Summary</RouterLink>
        <RouterLink v-if="$route.params.report_id" :to="{name: 'detail', params: {report_id: $route.params.report_id}}">Full Report</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
header {
  line-height: 1;
  width: 100%;
}

.logo {
  display: block;
  margin: 0 auto;
}

nav {
  width: 100%;
  text-align: center;
}

nav a.router-link-exact-active {
  color: white;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 0.5rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    max-height: 10vh;
    position: fixed;
    top: 0;
  }

  .logo {
    margin: 0 1rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -0.5rem;
  }
}
</style>
