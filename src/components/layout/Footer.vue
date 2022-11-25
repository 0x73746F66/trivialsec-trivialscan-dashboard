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
          <div class="footer-social margin-top-md padding-top-md">
            <a
              target="_blank"
              href="https://gitlab.com/trivialsec"
              class="text-decoration-none footer-social-gitlab font-sm nowrap font-color-light"
            >
              <IconGitlab color="1abb9c" class="margin-right-xxs" />
              Check out our open source projects on Gitlab
            </a>
          </div>
        </div>
        <div
          class="col-6 col-lg-7 d-flex flex-lg-row flex-column justify-content-end"
        >
          <div class="d-flex flex-column">
            <span class="font-lg-sb font-color-light margin-bottom-md"
              >Social</span
            >
            <a
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              href="https://mastodon.au/@trivialsec"
              target="_blank"
              ><IconMastodon
                color="1abb9c"
                class="margin-right-xxs"
              />Mastodon</a
            >
            <a
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              href="https://discord.gg/BgqUw8Tu6a"
              target="_blank"
              ><IconDiscord color="1abb9c" class="margin-right-xxs" />Discord</a
            >
            <a
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              href="https://www.linkedin.com/company/trivialsec"
              target="_blank"
              ><IconLinkedin
                color="1abb9c"
                class="margin-left-xxs margin-right-xs"
              />LinkedIn</a
            >
            <a
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              href="https://twitter.com/TrivialSec"
              target="_blank"
              ><IconTwitter
                color="1abb9c"
                class="margin-left-xxs margin-right-xs"
              />Twitter</a
            >
          </div>
        </div>
        <div
          class="col-6 col-lg-3 d-flex flex-lg-row flex-column justify-content-end"
        >
          <div class="d-flex flex-column">
            <span class="font-lg-sb font-color-light margin-bottom-md"
              >Need Support?</span
            >
            <RouterLink
              to="/docs"
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              >Documentation</RouterLink
            >
            <a
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              :href="docsUrl"
              target="_blank"
              >API Reference</a
            >
            <RouterLink
              v-if="logged_in"
              to="/support"
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              >Support Request</RouterLink
            >
            <a
              class="margin-bottom-xs font-sm font-color-light-60 text-decoration-none"
              href="https://discord.gg/BgqUw8Tu6a"
              target="_blank"
              >Chat with a real person</a
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
import IconDiscord from "../icons/IconDiscord.vue";
import IconMastodon from "../icons/IconMastodon.vue";
import IconLinkedin from "../icons/IconLinkedin.vue";
import IconTwitter from "../icons/IconTwitter.vue";
const apiUrl = import.meta.env.VITE_API_URL.trim();

export default {
  data() {
    return {
      logged_in: false,
      account_name: null,
      member_email: null,
      docsUrl: `${apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl}/redoc`,
    };
  },
  created() {
    this.account_name = localStorage.getItem("/account/display");
    this.member_email = localStorage.getItem("/member/email");
    this.logged_in = !!localStorage.getItem("/session/key");
  },
  components: {
    IconTrivialSecurity,
    IconGitlab,
    IconDiscord,
    IconMastodon,
    IconLinkedin,
    IconTwitter,
  },
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
    &[title] {
      border-bottom: none;
    }
  }
  &-social-gitlab {
    display: inline-flex;
    align-items: center;
  }
  @media (max-width: $breakpoint-lg) {
    flex-direction: column;
  }
}
</style>
