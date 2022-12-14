<template>
  <div
    class="nav"
    :class="{
      'nav-logged-in': logged_in,
    }"
  >
    <div class="container">
      <div class="row">
        <div
          class="col-12 d-flex flex-lg-row flex-column justify-content-between"
        >
          <div class="d-flex justify-content-between">
            <RouterLink to="/" class="text-decoration-none d-flex align-items-center">
              <div class="d-flex align-items-center">
                <IconTrivialSecurity
                  alt="Trivial Security"
                  class="margin-right-lg"
                  width="50"
                  height=""
                />
                <span class="d-none d-lg-block font-xxl-b font-color-primary"
                  >Trivial Security</span
                >
              </div>
            </RouterLink>

            <button
              class="navbar-toggler navbar-dark d-lg-none"
              type="button"
              @click="toggleNavbar"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            class="d-lg-flex d-none flex-column flex-lg-row align-items-center nav-content"
          >
            <RouterLink
                v-if="logged_in"
                to="/dashboard"
                class="router-link font-base font-color-light text-decoration-none margin-right-md"
                >Dashboard</RouterLink
            >
            <RouterLink
                v-if="logged_in"
                to="/logout"
                class="router-link font-base font-color-light text-decoration-none margin-right-md"
                >Logout</RouterLink
            >
            <RouterLink
                v-if="!logged_in"
                to="/pricing"
                class="router-link font-base font-color-light text-decoration-none margin-right-md"
                >Pricing</RouterLink
            >
            <RouterLink
              v-if="logged_in"
              to="/profile"
              class="router-link d-flex font-color-light text-decoration-none margin-right-md d-flex nav-profile-router"
            >
              <div class="d-flex flex-column align-items-end nav-profile-router-info nowrap">
                <span class="font-base">{{ account_name }}</span>
                <span class="font-sm">{{ member_email }}</span>
              </div>
              <img
                :src="`https://www.gravatar.com/avatar/${email_md5}`"
                :alt="`${account_name} Profile Picture`"
                class="font-xs nav-profile"
              />
            </RouterLink>
            <div class="padding-sm w-100 p-lg-0" v-if="!logged_in">
              <div class="login-register-section d-flex flex-lg-row flex-column align-items-center justify-content-start">
                <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" class="btn-fill-primary-full font-xs font-color-light border-0 margin-right-md"> Login </button>
                <div class="nav-sep"></div>
                <button type="button" data-bs-toggle="modal" data-bs-target="#registerLogin" class="btn-fill-primary-full font-xs font-color-light border-0"> Register </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
      class="d-flex d-lg-none flex-column flex-lg-row align-items-center w-100 nav-transition nav-content"
      :class="{ 'nav-hidden': isNavbarHidden }"
    >
      <RouterLink
          v-if="logged_in"
          to="/dashboard"
          class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
          >Dashboard</RouterLink
      >
      <RouterLink
        v-if="logged_in"
        to="/logout"
        class="router-link font-base margin-top-xs margin-bottom-xs font-color-light text-decoration-none margin-right-md"
        >Logout</RouterLink
      >
      <RouterLink
        v-if="logged_in"
        to="/profile"
        class="router-link d-flex margin-top-xs margin-bottom-xs align-items-end font-color-light text-decoration-none margin-right-md d-flex"
      >
        <div class="d-flex flex-column margin-right-sm align-items-end">
          <span class="font-base">{{ account_name }}</span>
          <span class="font-sm">{{ member_email }}</span>
        </div>
        <img
          :src="`https://www.gravatar.com/avatar/${email_md5}`"
          :alt="`${account_name} Profile Picture`"
          class="font-xs nav-profile"
        />
      </RouterLink>
      <div v-if="!logged_in">
        <div class="padding-sm p-lg-0">
          <div class="login-register-section d-flex flex-lg-row flex-column align-items-center justify-content-start">
            <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" class="btn-fill-primary-full font-xs font-color-light border-0"> Login </button>
            <span class="font-xs-sb font-color-light margin-right-md margin-left-md margin-top-sm margin-bottom-sm my-lg-0"></span>
            <button type="button" data-bs-toggle="modal" data-bs-target="#registerLogin" class="btn-fill-primary-full font-xs font-color-light border-0"> Register </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import IconTrivialSecurity from "@/components/icons/IconTrivialSecurity.vue";

export default {
  components: { IconTrivialSecurity },
  data() {
    return {
      isNavbarHidden: true,
      logged_in: false,
      account_name: null,
      member_email: null,
    };
  },
  created() {
    this.account_name = localStorage.getItem("/account/display");
    this.member_email = localStorage.getItem("/member/email");
    this.email_md5 = localStorage.getItem("/member/email_md5");
    this.logged_in = !!localStorage.getItem("/session/key");
  },
  methods: {
    toggleNavbar() {
      this.isNavbarHidden = !this.isNavbarHidden;
    },
  },
};
</script>
<style lang="scss">
header {
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: calc(56px + (spacers("sm") * 2));
    @media (max-width: $breakpoint-lg) {
      height: 65px;
    }
  }
}
</style>
<style scoped lang="scss">
.nav {
  @extend .bg-dark-40;
  @extend .padding-md;
  width: 100%;
  z-index: 100;
  background: color("dark-40");
  backdrop-filter: blur(8px);
  position: fixed;
  transition: 0.2s linear;
  animation: showNavbar 0.5s forwards;
  height: calc(56px + (spacers("sm") * 2));
  @media (max-width: $breakpoint-lg) {
    height: 65px;
  }
  &-profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    &-router {
      background: color("dark-60");
      padding: spacers("xxs");
      border-radius: radius("lg");
      display: flex;
      align-items: center;
      justify-content: center;

      &-info {
        overflow: hidden;
        max-width: 0;
        width: auto;
        transition: 0.2s linear;
      }
      &:hover {
        .nav-profile-router-info {
          max-width: 500px;
          overflow: visible;
          @extend .margin-right-xs;
          @extend .margin-left-sm;
        }
      }
    }
  }

  &-sep {
    border-left: solid 2px color('primary');
    height: 30px;
    margin-right: 20px;
  }

  &-transition {
    position: fixed;
    top: 65px;
    transition: 0.5s linear;

    @media (max-width: $breakpoint-lg) {
      max-height: 600px;
    }
  }

  &-hidden {
    @media (max-width: $breakpoint-lg) {
      max-height: 0px;
      overflow: hidden;
    }
  }

  &-content {
    @media (max-width: $breakpoint-lg) {
      background: color("dark-40");
      backdrop-filter: blur(8px);
      z-index: 100;
    }
  }

  .router-link {
    @media (max-width: $breakpoint-lg) {
      margin-bottom: spacers("xs");
    }
  }

  .router-link-active {
    @extend .font-color-primary;
    @extend .font-base-b;
  }
}
.login-register {
  &-section {
    position: relative;
  }

  &-sep {
    background: color("dark");
    padding: padding("sm");

    @media (min-width: $breakpoint-lg) {
      &:before {
        content: "";
        z-index: -1;
        background: color("light");
        top: 25px;
        left: 50%;
        bottom: 25px;
        width: 1px;
        position: absolute;
      }
    }
  }
}
</style>
