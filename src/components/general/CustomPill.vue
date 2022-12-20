<template>
  <div>
    <span
      :class="`

            custom-pill
            custom-pill-${type}`"
    >
      {{ label }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    type: String,
  },
};
</script>
<style lang="scss">
.custom-pill {
  font-size: sizes("xs");
  font-weight: 800;
  font-family: Montserrat-bold, sans-serif;
  padding-left: spacers("xs");
  padding-right: spacers("xs");
  padding-top: 0;
  padding-bottom: 0;
  text-transform: capitalize;
  border-radius: radius("sm");
  color: color("dark");
  min-width: 125px;
  max-width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  &-danger {
    background-color: color("danger");
  }

  &-success {
    background-color: color("primary");
  }

  &-warning,
  &-root {
    background-color: color("secondary");
  }

  &-leaf {
    background-color: color("primary");
  }

  &-intermediate {
    background-color: color("secondary-80");
  }
}
</style>
