<template>
  <div
    class="col-12 col-sm-6 col-lg-4 padding-sm margin-bottom-md"
    @mouseover="showLink = true"
    @mouseleave="showLink = false"
  >
    <div class="basic-feature h-100 w-100 text-center">
      <div class="padding-lg">
        <component :is="feature.icon" color="1ABB9C"></component>
        <h3
          class="font-base-sb font-color-light margin-bottom-sm margin-top-lg"
        >
          {{ feature.header }}
        </h3>
        <span class="font-xs font-color-light">{{ feature.description }}</span>
      </div>
      <RouterLink
        :to="feature.href"
        class="text-decoration-none font-sm font-color-dark basic-feature-read-more-link w-100 padding-sm"
        :class="{ hidden: !showLink }"
      >
        Read More
        <IconArrowPrimary
          color="2b2525"
          class="basic-feature-read-more-link-icon margin-left-xs"
        />
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import IconArrowPrimary from "@/components/icons/IconArrowPrimary.vue";
</script>

<script>
export default {
  components: { IconArrowPrimary },
  props: {
    feature: Object,
  },
  data() {
    return {
      showLink: false,
    };
  },
};
</script>
<style lang="scss">
.basic-feature {
  border-radius: radius("sm");
  background: color("dark-40");
  color: color("light");
  transition: 0.2s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: color("dark-60");
  }
  &-icon {
    width: 100px;
  }
  &-read-more-link {
    background: color("secondary");
    border-radius: 0 0 radius("sm") radius("sm");
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: 0.2s linear;
    &:hover {
      color: color("dark") !important;
    }
    &.hidden {
      @media (min-width: breakpoints("lg")) {
        padding: 0 spacers(sm);
        height: 0;
        overflow: hidden;
      }
    }
    &-icon {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
