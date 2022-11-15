<template>
    <div>
        <div class="d-flex margin-top-sm">
          <button class="d-block certificate-swiper-button-prev">
            <IconChevron class="cert-icon" color="f0f0f0" />
          </button>

          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="10"
            :navigation="{
                nextEl: '.certificate-swiper-button-next',
                prevEl: '.certificate-swiper-button-prev'
            }"
          >
            <swiper-slide v-for="(chain, chainId) in slicedCerts" :key="chainId">
              <h3 class="font-color-light font-lg margin-top-sm">Certificate Chain {{ chainId+1 }}</h3>
                <div class="d-flex flex-column bg-dark-40 padding-sm border-radius-sm">
                  <span
                    v-for="(cert, id) in chain"
                    :key="id"
                    class="d-flex align-items-center font-sm margin-bottom-xs cursor-pointer word-break"
                    data-bs-toggle="modal"
                    :data-bs-target="`#cert_${cert.sha1_fingerprint}`"
                  >
                    <div class="d-flex w-100">
                      <customPill
                        class="margin-right-xxs margin-left-xxs"
                        :label="cert.type"
                        :type="cert.type"
                      />
                      <div class="d-flex flex-column w-100">
                        <span class="font-xs-sb d-flex w-100 justify-content-start">
                          <span class="font-color-light nowrap">{{ commonNameFromSubject(cert.subject) }}</span>
                          <span class="d-flex justify-content-end w-100">
                            <span v-if="cert.expired" class="font-color-danger margin-left-xxs">Expired</span>
                            <span v-if="cert.known_compromised" class="font-color-danger margin-left-xxs">Compromised</span>
                          </span>
                        </span>
                        <span class="font-xs font-color-lighter-60">{{cert.subject.split(',').filter(p=>!p.trim().startsWith('CN=')).join(',')}}</span>
                      </div>
                    </div>
                  </span>
                </div>
            </swiper-slide>
          </swiper>

          <button class="d-block certificate-swiper-button-next">
            <IconChevron class="cert-icon" color="f0f0f0" />
          </button>
        </div>
        <slidingModal
            v-for="(cert, certModalId) in certificates"
            :key="certModalId"
            :id="`cert_${cert.sha1_fingerprint}`"
        >
          <template #header>
            <div class="modal-header border-0 d-flex justify-content-start">
              <button
                type="button"
                class="btn-close m-0 p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <IconArrowPrimary color="ffffff" class='modal-icon-report-close'/>
              </button>
            </div>
          </template>
          <template #content>
            <div class="modal-body">
              <Certificate v-bind="cert" />
            </div>
          </template>
        </slidingModal>
    </div>
</template>
<script>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Certificate from "@/components/general/Certificate.vue"
import CertificateIcon from "@/components/icons/CertificateIcon.vue";
import IconChevron from "@/components/icons/IconChevron.vue";
import IconArrowPrimary from "@/components/icons/IconArrowPrimary.vue";
import slidingModal from "@/components/general/slidingModal.vue";
import customPill from "@/components/general/customPill.vue";

import 'swiper/css';

export default {
  props: {
      slicedCerts: Array
  },
  components: {
      Swiper,
      SwiperSlide,
      Certificate,
      slidingModal,
      customPill,
      CertificateIcon,
      IconChevron,
      IconArrowPrimary
  },
  setup() {
    return {
        modules: [Navigation, Pagination, Scrollbar, A11y],
    }
  },
  methods: {
      commonNameFromSubject(subject) {
          if (typeof subject !== 'string' || subject.indexOf('CN=') === -1) {
              return subject
          }
          return subject.split(',').filter(p => p.trim().startsWith('CN=')).join('').replace(/CN=/g, '')
      },
  },
  computed: {
    certificates(t) {
      const ret = new Set()
      t.slicedCerts.forEach(item => item.forEach(cert => ret.add(cert)))
      return [...ret]
    }
  }
}
</script>
<style lang="scss">
    .certificate-swiper-button-prev,
    .certificate-swiper-button-next {
        height: auto;
        background: none;
        border: none;

        .cert-icon {
            width: 25px;
            height: 25px;
        }
    }

    .swiper-button-disabled {
        filter: opacity(0.3);
    }

    .certificate-swiper-button-prev {
        .cert-icon {
            transform: rotate(180deg);
        }
    }
</style>
