<template>
  <div>
    <div
      class=""
      :class="[{ collapsed: defaultCollapsed }, buttonClasses]"
      :id="id"
      data-bs-toggle="collapse"
      :data-bs-target="`#` + target"
      aria-expanded="true"
      :aria-controls="target"
    >
      <div class="w-100">
        <slot name="header"></slot>
      </div>
      <IconExpandPrimary class="expand-icon" />
    </div>
    <div
      class="collapse"
      :class="[{ show: defaultShow }, contentClasses]"
      :id="target"
      :aria-labelledby="id"
      :data-bs-parent="`#` + parent"
    >
      <div>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Collapse } from 'bootstrap'
</script>
<script>
import IconExpandPrimary from "@/components/icons/IconExpandPrimary.vue";

export default {
  components: { IconExpandPrimary },
  props: {
    id: String,
    target: String,
    parent: String,
    defaultShow: Boolean,
    defaultCollapsed: Boolean,
    buttonClasses: String,
    contentClasses: String
  },
};
</script>
<style lang="scss">
.feature-dropdown {
  background: color("dark-20");
  border-bottom: 1px solid color("dark-60");
  align-items: center;
  padding: spacers("xs");

  .expand-icon {
    transform: rotate(180deg);
    width: 25px;
    height: 25px;
  }

  &.collapsed {
    .expand-icon {
      transform: rotate(0deg);
    }
  }
  &-content {
    border-bottom: 1px solid color("dark-60");
    padding: spacers("xs");
  }
}
.custom-accordion {
  &-button {
    border-radius: radius("sm") radius("sm") 0 0;
    background: color("dark-40");
    display: flex;
    align-items: center;
    justify-content: space-between;
    .expand-icon {
      transition: 0.2s linear;
      transform: rotate(180deg);
      max-width: 50px;
      max-height: 50px;
    }

    &.collapsed {
      border-radius: radius("sm");
      background: color("dark-20");
      .expand-icon {
        transform: rotate(0deg);
      }
    }
  }
  &-content {
    border-radius: 0 0 radius("sm") radius("sm");
  }
}
</style>
