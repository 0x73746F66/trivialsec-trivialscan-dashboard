<template>
  <div class="d-flex flex-row align-items-center justify-content-center">
    <loadingComponent class="loading" :class="{ inactive: !loading }" />
    <div v-if="errorMessage.length > 0" class="d-flex flex-column w-100">
      <ValidationMessage
          class="justify-content-start"
          :message="errorMessage"
          :type="errorMessageType"
      />
      <span class="font-xl font-color-light-80 text-center w-100 bg-dark-40 border-radius-sm d-block">No data to display</span>
    </div>
    <div>
      <button class="d-none d-lg-block certificate-swiper-button certificate-swiper-button-prev font-color-light">
        <IconChevron color="f0f0f0" />
      </button>
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="10"
      :navigation="{
          nextEl: '.certificate-swiper-button-next',
          prevEl: '.certificate-swiper-button-prev'
      }"
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: false }"
    >
      <swiper-slide
          v-for="(certificates, Certindex) in slicedCertificates"
          :key="Certindex"
      >
        <Dropdown
          v-for="(issue, index) in certificates"
          :id="`headingCertificate${Certindex}${index}`"
          :target="`collapseCertificate${Certindex}${index}`"
          parent="accordion"
          :defaultShow=false
          :defaultCollapsed=true
          :key="`${Certindex}${index}`"
          buttonClasses="font-lg text-left dashboard-dropdown font-color-light w-100 d-flex justify-content-left border-none padding-xxs"
          contentClasses=" bg-dark-20 dashboard-dropdown-content tpadding-md font-color-light font-base"
        >
          <template v-slot:header class="w-100">
            <div class="font-base d-flex flex-column justify-content-between  font-color-primary w-100 align-items-start">
                <div class="d-flex">
                  <CertificateIcon :critical="issue.result_level === 'fail'" /> 
                  <div class="d-flex flex-column">
                      <div class="margin-right-xxs font-sm-b font-color-secondary">{{issue.rule_id}}</div>
                      <span class="font-color-lighter font-xs-sb">{{issue.name}}</span>
                      <span class="font-xs font-color-light-40">{{issue.certificate.subject}}</span>
                    </div>
                </div>
              </div>
          </template>
          <template v-slot:content>
              <div class="d-flex flex-column align-items-start margin-bottom-sm">
                <div class="d-flex row">
                  <div class="col-lg-8 col-12 d-flex flex-column align-items-start margin-bottom-xs">
                    <span class="font-xs">{{issue.description}}</span>
                  </div>
                  <div class="col-lg-4 col-12">
                    <div class="bg-dark-40 border-radius-sm padding-sm">
                          <div class="d-flex flex-column font-xs-sb font-color-light">
                            <span class="d-block d-lg-none margin-bottom-sm">
                              {{issue.certificate.subject}}
                            </span>

                            <span class="font-xs-sb font-color-light margin-bottom-sm">
                              <span class="font-color-danger">{{issue.result_label}}</span>
                              <span class="margin-left-xxs">{{issue.observed}}</span>
                            </span>

                          </div>
                          <div class="font-xs font-color-light margin-bottom-sm">
                            <span class="capitalize font-sm-sb">
                              <span class="capitalize">{{issue.certificate.type}}</span> Certificate {{issue.certificate.expiry_status}}</span>
                          </div>

                          <div class="d-flex flex-column align-items-start">
                          <span class="font-color-light font-xs-sb">References</span>
                          <ul>
                            <li v-for="ref in issue.references" :key="ref" class="overflow-wrap-anywhere">
                              <a
                                :href="ref.url"
                                class="text-decoration-none font-xs font-color-primary">
                                {{ref.name}}
                              </a>
                            </li>
                          </ul>                  
                        </div>
                    </div>
                  </div>
                </div>
                  
                <div class="d-flex justify-content-end align-items-end w-100 margin-top-sm">
                  <a target="_blank"
                    :href="'/certificate/'+issue.certificate.sha1_fingerprint"
                    class="text-decoration-none font-sm font-color-primary"
                  >
                    Read More
                    <IconArrowPrimary class="basic-feature-read-more-link-icon"/>
                  </a>
                </div>
              </div>
          </template>
      </Dropdown>
      </swiper-slide>
    </swiper>
    <div>
      <button class="d-none d-lg-block certificate-swiper-button certificate-swiper-button-next font-color-light">
        <IconChevron color="f0f0f0" />
      </button>
    </div>
  </div>
</template>

<script>
import Dropdown from "@/components/general/Dropdown.vue";
import CertificateIcon from "@/components/icons/CertificateIcon.vue";
import IconChevron from "@/components/icons/IconChevron.vue";
import IconArrowPrimary from "@/components/icons/IconArrowPrimary.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";
import moment from "moment";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
    Dropdown,
    CertificateIcon,
    IconChevron,
    IconArrowPrimary,
    ValidationMessage,
    loadingComponent,
  },
  data() {
    return {
      loading: false,
      limit: 100,
      errorMessage: "",
      errorMessageType: "",
      certificates: [],
    }
  },
  setup() {
      return {
          modules: [Navigation, Pagination, Scrollbar, A11y],
      };
  },
  mounted() {
    this.fetchCertificates()
  },
  methods: {
    async fetchCertificates() {
      this.loading = true
      const response = await Api.get(`/findings/certificate?limit=${this.limit}`).catch(error => {
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
      this.certificates = data.map(item => {
        item.observed =moment(item.observed_at).fromNow()
        return item
      })
      this.loading = false
    },
  },
  computed: {
    slicedCertificates() {
      var arrays = [];
      while(this.certificates.length > 0) {
        arrays.push(this.certificates.splice(0, 10));
      }
      return arrays;
    },
  }
}
</script>

<style scoped lang="scss">
  .certificate-swiper-button {
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
