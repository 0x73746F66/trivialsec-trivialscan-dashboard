<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 margin-bottom-lg col-lg-2">
          <IconTrivialSecurity
            alt="Trivial Security"
            class=""
            width="50"
            height=""
          />
          <div
            class="footer-social margin-top-md padding-top-md d-flex align-items-center"
          >
            <a
              target="_blank"
              href="https://gitlab.com/trivialsec"
              class="footer-social-link"
            >
              <IconGitlab color="1abb9c" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/trivialsec"
              class="footer-social-link"
            >
              <IconLinkedin color="1abb9c" />
            </a>
            <a
              target="_blank"
              href="https://twitter.com/TrivialSec"
              class="footer-social-link"
            >
              <IconTwitter color="1abb9c" />
            </a>
          </div>
        </div>
        <div
          class="col-12 col-lg-10 d-flex flex-lg-row flex-column justify-content-end"
        >
          <div class="d-flex flex-column margin-right-lg margin-bottom-lg">
            <span class="font-lg-sb font-color-light margin-bottom-md"
              >Quick Links</span
            >
            <RouterLink
              to="/privacy"
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              >Privacy Policy</RouterLink
            >
            <RouterLink
              v-if="logged_in"
              to="/results"
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              >Reports</RouterLink
            >
            <RouterLink
              v-if="$route.params.report_id"
              :to="{
                name: 'summary',
                params: { report_id: $route.params.report_id },
              }"
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              >Summary</RouterLink
            >
            <RouterLink
              v-if="$route.params.report_id"
              :to="{
                name: 'detail',
                params: { report_id: $route.params.report_id },
              }"
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              >Full Report</RouterLink
            >
          </div>
          <div class="d-flex flex-column">
            <span class="font-lg-sb font-color-light margin-bottom-md"
              >Need Support?</span
            >
            <RouterLink
              to="/docs"
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              >Documentation</RouterLink
            >
            <RouterLink
              v-if="logged_in"
              to="/support"
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              >Support Page</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
import IconTrivialSecurity from "../icons/IconTrivialSecurity.vue";
import IconGitlab from "../icons/IconGitlab.vue";
import IconLinkedin from "../icons/IconLinkedin.vue";
import IconTwitter from "../icons/IconTwitter.vue";

export default {
  data() {
    return {
      logged_in: false,
      account_name: null,
      member_email: null,
    };
  },
  created() {
    this.account_name = localStorage.getItem("/account/display");
    this.member_email = localStorage.getItem("/member/email");
    this.logged_in = !!localStorage.getItem("/session/key");
  },
  components: { IconTrivialSecurity, IconGitlab, IconLinkedin, IconTwitter },
};
</script>
<style lang="scss">
.footer {
  @extend .bg-dark-40;
  @extend .padding-md;

  &-social {
    border-top: 1px solid color("light");
  }
  &-social-link {
    @extend .margin-right-sm;
    width: 30px;
  }
  @media (max-width: $breakpoint-lg) {
    flex-direction: column;
  }
}
</style>
