<template>
  <div class="d-flex flex-row align-items-center justify-content-center">
      <loadingComponent class="loading" :class="{ inactive: !loading }" />
      <ValidationMessage
          v-if="errorMessage.length > 0"
          class="justify-content-start"
          :message="errorMessage"
          :type="errorMessageType"
      />
      <div>
        <button class="d-none d-lg-block target-swiper-button target-swiper-button-prev font-color-light">
          <IconChevron color="f0f0f0" />
        </button>
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        :navigation="{
            nextEl: '.target-swiper-button-next',
            prevEl: '.target-swiper-button-prev'
        }"
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        :breakpoints="{
        }"
    >
        <swiper-slide
            class="target-slide"
            v-for="(target, index) in slicedTargets"
            :key="index"
        >
          <div class="slide-target-item margin-bottom-sm" v-for="(t, i) in target" :key="i">
            <a :href="t.href" class="text-decoration-none target-icon-link font-color-secondary">
              <IconTarget class="margin-right-sm target-icon" color="e2c878"/>{{t.label}}
            </a>
          </div>
        </swiper-slide>
      </swiper>
      <div>
        <button class="d-none d-lg-block target-swiper-button target-swiper-button-next font-color-light">
          <IconChevron color="f0f0f0" />
        </button>
      </div>
    </div>
</template>

<script>
import IconTarget from "@/components/icons/IconTarget.vue";
import IconChevron from "@/components/icons/IconChevron.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
    IconTarget,
    IconChevron,
    ValidationMessage,
    loadingComponent,
  },
  props: ['generator', 'version', 'account_name', 'client_name', 'project_name', 'targets', 'date', 'execution_duration_seconds', 'score', 'results', 'certificates', 'results_uri'],
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      targets: [],
    }
  },
  setup() {
      return {
          modules: [Navigation, Pagination, Scrollbar, A11y],
      };
  },
  created() {
    this.fetchHosts()
  },
  methods: {
    async fetchHosts() {
      this.loading = true
      const response = await Api.get("/hosts").catch(error => {
        this.errorMessage = error
        this.errorMessageType = "error"
      });
      if (response.status !== 200) {
        this.errorMessage = `${response.status} ${response.statusText}`
        this.errorMessageType = "error";
        this.loading = false
        return;
      }
      const data = await response.json();
      console.log(data);
      this.targets = data.map(host => ({"href": `/hostname/${host.transport.hostname}/${host.transport.port}`, "label": `${host.transport.hostname}:${host.transport.port}`}))
      this.loading = false
    },
  },
  computed: {
    slicedTargets() {
      var arrays = [];
      while(this.targets.length > 0) {
        arrays.push(this.targets.splice(0, 9));
      }
      return arrays;
    },
  }
}
</script>

<style scoped lang="scss">
  .target-slide {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
    @media (max-width: $breakpoint-lg) {
      flex-direction: column;
    }
    &:last-of-type {
      &:after {
        content: "";
        width: 30%;
      }
    }
  }
  .slide-target-item {
    background: color("dark-20");
    border-radius: radius('sm');
    padding: spacers("xs");
    width: 30%;
    @extend .font-xs;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media (max-width: $breakpoint-lg) {
      width: 100%;
    }
  }
  .target-icon {
    height: 25px;
    width: 25px;
  }
  .target-swiper-button {
    position: relative;
    border-radius: radius('sm');
    padding: padding('xs');
    background: none;
    color: color(light);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s linear;
    border: none;
    &-prev {
      transform: rotate(180deg);
    }
    svg {
      width: 25px;
      height: 25px;
    }
    &:hover {
        color: color('secondary');
    }
    &:disabled {
        color: color("light-20");
        background: none;
        display: none;
    }
  }
</style>
