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
        <button class="d-none d-lg-block issue-swiper-button issue-swiper-button-prev font-color-light">
          <IconChevron color="f0f0f0" />
        </button>
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        :navigation="{
            nextEl: '.issue-swiper-button-next',
            prevEl: '.issue-swiper-button-prev'
        }"
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: false }"
    >
        <swiper-slide
            v-for="(issues, IssueIndex) in slicedIssues"
            :key="IssueIndex"
        >
          <Dropdown
            v-for="(issue, index) in issues"
            :id="`headingIssue${IssueIndex}${index}`"
            :target="`collapseIssue${IssueIndex}${index}`"
            parent="accordion"
            :defaultShow=false
            :defaultCollapsed=true
            :key="`${IssueIndex}${index}`"
          >
            <template v-slot:header class="w-100">
                <div class="font-base d-flex flex-column justify-content-between  font-color-primary w-100 align-items-start">
                  <div class="d-flex align-items-start">
                    <ThreatIcon :severity="issue.severity" />

                    <div class="margin-right-xxs font-sm font-color-secondary">{{issue.rule_id}}</div>
                    <span class="font-color-lighter font-base">{{issue.name}}</span>
                  </div>
                  <div class="align-items-center font-xs font-color-light-60">
                    {{issue.transport.hostname}}:{{issue.transport.port}} ({{issue.transport.peer_address}})
                  </div>
                </div>
            </template>
            <template v-slot:content>
                <div class="d-flex row">
                  <div class="col-lg-8 col-12 d-flex flex-column align-items-start margin-bottom-xs">
                    <span class="font-sm">{{issue.description}}</span>
                  </div>
                  
                  <div class="col-lg-4 col-12 margin-bottom-sm">
                    <div class="bg-dark-40 border-radius-sm  d-flex flex-column align-items-start padding-sm">
                      <span class="font-sm-sb font-color-light margin-bottom-sm">
                          <span class="font-color-danger">{{issue.result_label}}</span>
                          <span class="margin-left-xxs">{{issue.observed}}</span>
                      </span>

                      <span class="font-color-lighter">References:</span>

                      <ul>
                        <li v-for="ref in issue.references" :key="ref.id" class="overflow-wrap-anywhere">
                          <a
                            :href="ref.url"
                            target="_blank"
                            class="text-decoration-none font-xs font-color-primary">
                            {{ref.name}}
                          </a>
                        </li>
                      </ul>
                  </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end align-items-end w-100 margin-top-sm">
                  <a target="_blank"
                    :href="`/result/${issue.report_id}/detail`"
                    class="text-decoration-none font-sm font-color-primary"
                  >
                    Read More
                    <IconArrowPrimary class="basic-feature-read-more-link-icon"/>
                  </a>
                </div>
            </template>
        </Dropdown>
        </swiper-slide>
      </swiper>
      <div>
        <button class="d-none d-lg-block issue-swiper-button issue-swiper-button-next font-color-light">
          <IconChevron color="f0f0f0" />
        </button>
      </div>
    </div>

</template>

<script>
import IconTarget from "@/components/icons/IconTarget.vue";
import Dropdown from "@/components/general/Dropdown.vue";
import ThreatIcon from "@/components/icons/ThreatIcon.vue";
import IconChevron from "@/components/icons/IconChevron.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import IconArrowPrimary from "@/components/icons/IconArrowPrimary.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";
import moment from "moment";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
    IconTarget,
    Dropdown,
    ThreatIcon,
    IconChevron,
    ValidationMessage,
    loadingComponent,
    IconArrowPrimary
  },
  data() {
    return {
      loading: false,
      limit: 50,
      errorMessage: "",
      errorMessageType: "",
      issues: [],
    }
  },
  setup() {
      return {
          modules: [Navigation, Pagination, Scrollbar, A11y],
      };
  },
  created() {
    this.fetchFindings()
  },
  methods: {
    async fetchFindings() {
      this.loading = true
      const response = await Api.get(`/findings/latest?limit=${this.limit}`).catch(error => {
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
      this.issues = data.map(item => {
        if (item.result_level === "fail") {
          item.severity = "high"
        } else if (item.result_level === "warn") {
          item.severity = "medium"
        } else if (item.result_level === "info") {
          item.severity = "low"
        }
        item.observed =moment(item.observed_at).fromNow()
        return item
      })
      this.loading = false
    },
  },
  computed: {
    slicedIssues() {
      var arrays = [];
      while(this.issues.length > 0) {
        arrays.push(this.issues.splice(0, 10));
      }
      return arrays;
    },
  }
}
</script>

<style scoped lang="scss">
  .issue-swiper-button {
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
  .target-dropdown-icon {
    width: 15px;
    height: 15px;
  }
</style>
