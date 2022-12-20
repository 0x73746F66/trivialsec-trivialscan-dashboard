<template>
  <div class="d-flex flex-row align-items-center justify-content-center">
    <LoadingComponent class="loading" :class="{ inactive: !loading }" />
    <div v-if="errorMessage.length > 0" class="d-flex flex-column w-100">
      <ValidationMessage
        class="justify-content-start"
        :message="errorMessage"
        :type="errorMessageType"
      />
      <span
        class="font-xl font-color-light-80 text-center w-100 bg-dark-40 border-radius-sm d-block"
        >No data to display</span
      >
    </div>
    <div>
      <button
        class="d-none d-lg-block target-swiper-button target-swiper-button-prev font-color-light"
      >
        <IconChevron color="f0f0f0" />
      </button>
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="10"
      :navigation="{
        nextEl: '.target-swiper-button-next',
        prevEl: '.target-swiper-button-prev',
      }"
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      :breakpoints="{}"
    >
      <swiper-slide
        class="target-slide"
        v-for="(target, index) in slicedTargets"
        :key="index"
      >
        <div
          class="slide-target-item margin-bottom-sm"
          v-for="(t, i) in target"
          :key="i"
        >
          <a
            target="_blank"
            :href="`/hostname/${t.transport.hostname}/${t.transport.port}`"
            class="text-decoration-none target-icon-link font-color-secondary w-100"
          >
            <div class="d-flex flex-column justify-content-between w-100">
              <div class="">
                <IconTarget
                  class="margin-right-sm target-icon"
                  color="e2c878"
                />
                <div class="d-flex flex-column">
                  <span
                    v-for="(http, id) in t.http"
                    :key="id"
                    class="http-status"
                    :class="{
                      'font-color-primary': http.status_code === 200,
                      'font-color-danger': http.status_code !== 200,
                    }"
                  >
                    {{ http.title }}
                    <span
                      class="pill padding-xxs font-color-light status-code-pill"
                      :class="{ success: http.status_code[0] === 2 }"
                    >
                      {{ http.status_code }}
                    </span>
                  </span>
                  <span class="d-block"
                    >{{ t.transport.hostname }}:{{ t.transport.port }}</span
                  >
                  <span v-if="t.error" class="d-block font-color-tertiary"
                    >{{ t.error[0] }} {{ t.error[1] }}</span
                  >
                  <span class="d-block font-color-light-20">{{
                    t.transport.peer_address
                  }}</span>
                </div>
              </div>
              <div class="font-color-light-40">
                {{ t.timeago }}
              </div>
            </div>
          </a>
        </div>
      </swiper-slide>
    </swiper>
    <div>
      <button
        class="d-none d-lg-block target-swiper-button target-swiper-button-next font-color-light"
      >
        <IconChevron color="f0f0f0" />
      </button>
    </div>
  </div>
</template>

<script>
import IconTarget from "@/components/icons/IconTarget.vue";
import IconChevron from "@/components/icons/IconChevron.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import moment from "moment";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    IconTarget,
    IconChevron,
    ValidationMessage,
    LoadingComponent,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      errorMessageType: "",
      targets: [],
    };
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  mounted() {
    this.fetchHosts();
  },
  methods: {
    async fetchHosts() {
      this.loading = true;
      try {
        const response = await Api.get("/hosts?return_details=true", {
          timeout: 30000,
        });
        if (response.status !== 200) {
          this.errorMessage = `${response.status} ${response.statusText}`;
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        const data = await response.json();
        this.targets = data.map((host) => {
          host.timeago = moment.utc(host.last_updated).fromNow();
          return host;
        });
      } catch (error) {
        this.errorMessage =
          error.name === "AbortError"
            ? "Request timed out, please try refreshing the page."
            : `${error.name} ${error.message}. Couldn't complete this action.`;
        this.errorMessageType = "error";
      }
      this.loading = false;
    },
  },
  computed: {
    slicedTargets() {
      var arrays = [];
      while (this.targets.length > 0) {
        arrays.push(this.targets.splice(0, 15));
      }
      return arrays;
    },
  },
};
</script>
<style scoped lang="scss">
.target-slide {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;

  @media (max-width: breakpoints("lg")) {
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
  border-radius: radius("sm");
  padding: spacers("xs");
  width: 30%;
  font-size: sizes("xs");
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: breakpoints("lg")) {
    width: 100%;
  }
}

.target-icon {
  height: 25px;
  width: 25px;
}

.target-swiper-button {
  position: relative;
  border-radius: radius("sm");
  padding: spacers("xs");
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
    color: color("secondary");
  }

  &:disabled {
    color: color("light-20");
    background: none;
    display: none;
  }
}

.status-code-pill {
  padding: 0 spacers("xxs") !important;

  &.success {
    background: color("primary");
  }
}
</style>
