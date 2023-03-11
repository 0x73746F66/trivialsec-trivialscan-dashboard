<template>
  <div class="fix-gauge">
    <div
      class="gauge"
      :style="{ transform: 'rotate(' + rotatePercent + 'deg)' }"
      :class="{
        'gauge-success': usePercent >= 60,
        'gauge-warning': usePercent > 30 && usePercent < 60,
        'gauge-error': usePercent <= 30,
      }"
    >
      <span
        class="gauge-legend font-xl-sb font-color-light d-block w-100 text-center"
        :style="{ transform: 'rotate(' + invertedPercent + 'deg)' }"
      >
        {{ inUse }}/{{ available }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    inUse: Number,
    available: Number,
  },
  computed: {
    usePercent() {
      return (this.inUse * 100) / this.available;
    },
    rotatePercent() {
      let perc = (this.inUse * 100) / this.available;
      return (perc * 360) / 100;
      // if (perc <= 30) return "-70";
      // if (perc > 30 && perc < 60) return "0";
      // if (perc >= 60) return "70";
    },
    invertedPercent() {
      return -this.rotatePercent;
    },
  },
};
</script>
<style lang="scss">
.fix-gauge {
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  // padding-top: spacers("md");
  // overflow: hidden;
  @media (max-width: breakpoints("lg")) {
    align-items: center;
  }
}

.gauge {
  border-radius: 50%;
  border-width: 3px;
  border-style: solid;
  height: 270px;
  width: 270px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  @media (max-width: breakpoints("lg")) {
    height: 200px;
    width: 200px;
  }

  &:before {
    content: "";
    width: 30px;
    height: 30px;
    top: -15px;
    left: calc(50% - 15px);
    border-radius: 50%;
    position: absolute;
  }

  &-success {
    border-color: color("primary");
    &:before {
      background: color("primary");
    }
  }
  &-warning {
    border-color: color("secondary");
    &:before {
      background: color("secondary");
    }
  }
  &-error {
    border-color: color("danger");
    &:before {
      background: color("danger");
    }
  }
}
</style>
