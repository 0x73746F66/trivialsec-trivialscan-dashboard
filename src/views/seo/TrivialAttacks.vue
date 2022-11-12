<template>
  <div class="container padding-top-lg">
      <div class="row">
          <div class="col-12 feature-container margin-bottom-lg">
              <div class="font-color-light feature-name-bg">
                  <h1 class="font-color-light font-xxl-b">Passive Scanning</h1>
                  <div class="font-color-light font-lg-sb">
                    Lorem ipsum dolor sit amet. Est aperiam corrupti in ipsum earum sed eligendi ratione
                  </div>
              </div>
          </div>

          <div class="col-12 margin-bottom-lg">
              <div class="font-sm d-flex flex-column justify-content-between font-color-primary w-100 align-items-start">
                <span class="font-color-lighter font-sm">
                  <p>Lorem ipsum dolor sit amet. Est aperiam corrupti in ipsum earum sed eligendi ratione sit placeat porro aut obcaecati dolorem. Est laborum provident qui harum rerum quo temporibus quaerat. Vel blanditiis illo qui temporibus dolorum 33 itaque blanditiis et commodi error et molestiae maiores qui omnis illo id ipsam repellendus. Ex consequatur assumenda non laborum nisi sed voluptate illo non atque facilis aut omnis fugit. </p>
                  <p>Ex explicabo omnis ab nihil rerum non deserunt modi et voluptatibus incidunt. Hic atque quasi aut praesentium inventore sit sapiente quasi. A repellendus facilis est distinctio laborum in distinctio inventore ut voluptas ipsum sit ratione galisum. Et velit eligendi est dolor eius qui omnis sequi. </p>
                </span>
              </div>
          </div>
          <div class="col-12 d-flex">
            <FeatureSlider :length="3">
              <template #slide1>
                <div class="row">
                    <div class="col-12 justify-content-center align-items-start d-flex flex-column feature-parra font-sm font-color-light">
                      <img src="../../assets/media/dashboard.png" class="img-fluid feature-image" alt="Description of image">
                      <p>Lorem ipsum dolor sit amet. Est aperiam corrupti in ipsum earum sed eligendi ratione sit placeat porro aut obcaecati dolorem. Est laborum provident qui harum rerum quo temporibus quaerat. Vel blanditiis illo qui temporibus dolorum 33 itaque blanditiis et commodi error et molestiae maiores qui omnis illo id ipsam repellendus. Ex consequatur assumenda non laborum nisi sed voluptate illo non atque facilis aut omnis fugit. </p>
                      <p>Ex explicabo omnis ab nihil rerum non deserunt modi et voluptatibus incidunt. Hic atque quasi aut praesentium inventore sit sapiente quasi. A repellendus facilis est distinctio laborum in distinctio inventore ut voluptas ipsum sit ratione galisum. Et velit eligendi est dolor eius qui omnis sequi. </p>
                    </div>
                  </div>
              </template>
              <template #slide2>
                <div class="row">
                  <div class="col-12 justify-content-center align-items-start d-flex flex-column feature-parra font-sm font-color-light">
                    <p>Lorem ipsum dolor sit amet. Est aperiam corrupti in ipsum earum sed eligendi ratione sit placeat porro aut obcaecati dolorem. Est laborum provident qui harum rerum quo temporibus quaerat. Vel blanditiis illo qui temporibus dolorum 33 itaque blanditiis et commodi error et molestiae maiores qui omnis illo id ipsam repellendus. Ex consequatur assumenda non laborum nisi sed voluptate illo non atque facilis aut omnis fugit. </p>
                    <p>Ex explicabo omnis ab nihil rerum non deserunt modi et voluptatibus incidunt. Hic atque quasi aut praesentium inventore sit sapiente quasi. A repellendus facilis est distinctio laborum in distinctio inventore ut voluptas ipsum sit ratione galisum. Et velit eligendi est dolor eius qui omnis sequi. </p>
                    <img src="../../assets/media/dashboard.png" class="img-fluid feature-image" alt="Description of image">
                  </div>
                </div>
              </template>
              <template #slide3>
                <div class="row">
                  <div class="col-12 justify-content-center align-items-start d-flex flex-column feature-parra font-sm font-color-light">
                    <p>Lorem ipsum dolor sit amet. Est aperiam corrupti in ipsum earum sed eligendi ratione sit placeat porro aut obcaecati dolorem. Est laborum provident qui harum rerum quo temporibus quaerat. Vel blanditiis illo qui temporibus dolorum 33 itaque blanditiis et commodi error et molestiae maiores qui omnis illo id ipsam repellendus. Ex consequatur assumenda non laborum nisi sed voluptate illo non atque facilis aut omnis fugit. </p>
                    <p>Ex explicabo omnis ab nihil rerum non deserunt modi et voluptatibus incidunt. Hic atque quasi aut praesentium inventore sit sapiente quasi. A repellendus facilis est distinctio laborum in distinctio inventore ut voluptas ipsum sit ratione galisum. Et velit eligendi est dolor eius qui omnis sequi. </p>
                    <img src="../../assets/media/dashboard.png" class="img-fluid feature-image" alt="Description of image">
                  </div>
                </div>
              </template>
            </FeatureSlider>
          </div>
          <div class="col-12 padding-top-sm margin-bottom-lg">
              <h3 class="font-color-light font-xl-sb">How Passive Scanning works</h3>
              <div class="font-base d-flex flex-column justify-content-between  font-color-primary w-100 align-items-start">
                <span class="font-color-lighter">
                  <p>Lorem ipsum dolor sit amet. Est aperiam corrupti in ipsum earum sed eligendi ratione sit placeat porro aut obcaecati dolorem. Est laborum provident qui harum rerum quo temporibus quaerat. Vel blanditiis illo qui temporibus dolorum 33 itaque blanditiis et commodi error et molestiae maiores qui omnis illo id ipsam repellendus. Ex consequatur assumenda non laborum nisi sed voluptate illo non atque facilis aut omnis fugit. </p>
                  <p>Ex explicabo omnis ab nihil rerum non deserunt modi et voluptatibus incidunt. Hic atque quasi aut praesentium inventore sit sapiente quasi. A repellendus facilis est distinctio laborum in distinctio inventore ut voluptas ipsum sit ratione galisum. Et velit eligendi est dolor eius qui omnis sequi. </p>
                  <p>Cum possimus vero et perspiciatis magnam qui veritatis cupiditate et fuga voluptatibus rem iste commodi aut iusto repellendus quo eligendi perspiciatis? Id dolor soluta in tempore quos et voluptatem nisi ea aliquid incidunt non enim magni eum dolorem nihil. </p>

                </span>
              </div>
          </div>

          <div class="col-12 padding-top-sm margin-bottom-lg">
              <h3 class="font-color-light font-xl-sb">FAQs</h3>
              <Dropdown v-for="(faq, faqIndex) in FAQs" :id="`faq${faqIndex}`" :target="`faq${faqIndex}`" parent="accordion" :defaultShow=false :defaultCollapsed=true :key="`${faqIndex}`" buttonClasses="font-lg text-left feature-dropdown font-color-light w-100 d-flex justify-content-left border-none padding-xxs" contentClasses=" bg-dark-20 feature-dropdown-content padding-md font-color-light font-base">
                  <template v-slot:header class="w-100">
                      <div class="font-base d-flex flex-column justify-content-between  font-color-primary w-100 align-items-start">
                          <span class="font-color-lighter nowrap">{{ faq.question }}</span>
                      </div>
                  </template>

                  <template v-slot:content>
                      <div class="d-flex flex-column align-items-start">
                          <span class="font-xs pre-line">{{ faq.answer }}</span>
                      </div>
                  </template>
              </Dropdown>
          </div>
          <div class="col-12 col-lg-6 sendgrid-embed">
              <iframe
                frameborder="0"
                scrolling="no"
                seamless="seamless"
                height="100%"
                src="https://cdn.forms-content.sg-form.com/05ba6de3-5bd7-11ed-9441-a2114a0392f3"
              />
          </div>
          <div class="col-12 col-lg-6 contact-us margin-bottom-lg">
              <h3 class="font-color-light font-base-sb">Additional Resources</h3>
              <span class="font-color-light">
                  <ul>
                      <li><a class="text-decoration-none font-color-primary font-sm" href="#">Trivial Scanner vs ImmuniWeb vs Qualys SSL Labs</a></li>
                      <li><a class="text-decoration-none font-color-primary font-sm" href="#">Trivial Scanner vs SSLyze vs testssl.sh</a></li>
                      <li><a class="text-decoration-none font-color-primary font-sm" href="#">How most SSL/TLS scanners are more harmful than helpful</a></li>
                  </ul>
              </span>
          </div>
      </div>
  </div>
  </template>

  <script setup>
  import Dropdown from "@/components/general/Dropdown.vue"
  import FeatureSlider from "@/components/general/FeatureSlider.vue"
  </script>

  <script>
  export default {
    components: {
      Dropdown,
      FeatureSlider
    },
    data() {
      return {
        FAQs: [
          {
            question: "What's a cyber security?",
            answer: "No, seriously"
          },
          {
            question: "What number am I thinking of?",
            answer: "3."
          },
          {
            question: "What's Austrlians favourite movie?",
            answer: "The Melbourne Identity"
          },
        ]
      }
    }
  };
  </script>

  <style scoped lang="scss">
  .feature {
    &-parra {
      @extend .margin-top-lg;
      @extend .margin-bottom-lg;
    }

    &-image-container {
      @extend .margin-top-lg;
      @extend .margin-bottom-lg;
    }

    &-image {
      object-fit: contain;
      width: 100%;
      @media (min-width: $breakpoint-lg) and (max-width: $breakpoint-xl) {
        min-width: 700px;
      }
      @media (min-width: $breakpoint-xl) and (max-width: $breakpoint-xxl)  {
        min-width: 850px;
      }
      @media (min-width: $breakpoint-xxl)  {
        min-width: 950px;
      }
    }

    &-container {
      overflow: hidden;
    }
  }
  .sendgrid-embed {
    padding: 0;
    margin: 0;

    iframe {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 500px;
    }
  }
  </style>
