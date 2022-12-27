<template>
  <div class="container padding-top-xl padding-bottom-xl">
    <div class="row">
      <div class="col-12 feature-container margin-bottom-md">
        <div class="font-color-light feature-name-bg">
          <h1 class="font-color-light font-xxl-b">Passive Scanning</h1>
          <div class="font-color-light font-lg-sb">
            Get visibility into all of your Internet-facing certificates and
            SSL/TLS configurations
          </div>
        </div>
      </div>

      <div
        class="col-lg-3 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
      >
        <p>
          Most organizations lack visibility into their certificates: They don't
          know where they are, how many they have nor what purpose they serve.
          This makes certificates difficult to manage.
        </p>
        <p>
          Identify out-of-policy certificates with weak signatures or key
          lengths, how many certificates were issued by Certificate Authorities
          (CAs) that have been vetted and approved per your policy, and how many
          certificates are self-signed or were issued by CAs that have not been
          authorized to issue certificates in your environment.
        </p>
        <p>
          Trivial Scanner reports visually highlight expired and expiring
          certificates so you can get to the information you need quickly, which
          certificates require immediate attention, and recommended activities
          to remediate the issues.
        </p>
      </div>
      <div
        class="col-lg-9 d-flex justify-content-center col-12 margin-bottom-xl feature-image-container"
        @click="imagePopOut($event)"
        data-bs-toggle="modal"
        :data-bs-target="`#${imagePopOutId}`"
      >
        <img
          class="img-fluid feature-image"
          src="../../assets/media/dashboard.png"
          alt="Description of image"
        />
      </div>

      <div
        class="col-lg-3 col-12 justify-content-center align-items-center d-flex flex-column feature-parra font-sm font-color-light"
      >
        <p>
          Get visibility into all of your Internet-facing certificates and
          SSL/TLS configurations.
        </p>
        <p>
          Our methodology allows anyone to assess often overlooked server
          configurations without having to become experts.
        </p>
        <p>
          Systems administrators may also gain the insights needed to quickly
          remediate cipher suites, deprecated protocols, and key exchange
          parameters on the underlying endpoints.
        </p>
        <p>
          Continuously provides an accurate snapshot of all certificates and TLS
          vulnerabilities that exist in your environment, correlating
          certificates and TLS configuration information with compliance and
          vulnerability data, so that you may prioritize remediation with data
          driven decisions
        </p>
      </div>
      <div
        class="col-lg-9 d-flex justify-content-center col-12 margin-bottom-xl feature-image-container"
        @click="imagePopOut($event)"
        data-bs-toggle="modal"
        :data-bs-target="`#${imagePopOutId}`"
      >
        <img
          class="img-fluid feature-image"
          src="../../assets/media/dashboard.png"
          alt="Description of image"
        />
      </div>

      <div class="col-12 padding-top-sm margin-bottom-lg">
        <h3 class="font-color-light font-xl-sb">How Passive Scanning works</h3>
        <div
          class="font-sm d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
        >
          <span class="font-color-lighter">
            <p>
              Establish a connection via various protocols to observe initial
              response and derive security issue without direct interaction.
            </p>
            <p>
              Observations span a wide spectrum of configuration,
              implementation, and cryptographic issues of responding server via
              SSL/TLS protocols, HTTP, and APIs. Our Community Edition provides
              free testing tools to detect all known security and cryptographic
              issues in your SSL/TLS-enabled services and also test whether PCI
              DSS, NIST and FIPS requirements related to SSL are properly
              implemented. These results are presented with corresponding
              references, rational, and uses the MITRE ATT&CK framework to map
              threats to these findings.
            </p>
          </span>
        </div>
      </div>

      <div class="col-12 padding-top-sm margin-bottom-lg">
        <h3 class="font-color-light font-xl-sb">FAQs</h3>
        <Dropdown
          v-for="(faq, faqIndex) in FAQs"
          :id="`faq${faqIndex}`"
          :target="`faq${faqIndex}`"
          parent="accordion"
          :defaultShow="false"
          :defaultCollapsed="true"
          :key="`${faqIndex}`"
          buttonClasses="font-lg text-left feature-dropdown font-color-light w-100 d-flex justify-content-left border-none padding-xxs"
          contentClasses=" bg-dark-20 feature-dropdown-content padding-md font-color-light font-base"
        >
          <template v-slot:header class="w-100">
            <div
              class="font-base d-flex flex-column justify-content-between font-color-primary w-100 align-items-start"
            >
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
        <div class="font-color-primary font-base-sb margin-left-sm">
          Leave us your information below, and we will get in contact with you
          shortly
        </div>
        <div class="font-color-light margin-left-sm">
          For something a bit more instant there are instant messaging and voice
          chat options in the bottom of the page
        </div>
        <iframe
          title="Sendgrid contact form"
          seamless="seamless"
          height="100%"
          src="https://cdn.forms-content.sg-form.com/05ba6de3-5bd7-11ed-9441-a2114a0392f3"
        />
      </div>
      <div class="col-12 col-lg-6 margin-bottom-lg">
        <div
          class="container padding-bottom-xl padding-top-xl"
          v-if="!logged_in"
        >
          <LoginOrRegister
            loginModalId="loginModal"
            registerModalId="registerLogin"
          />
        </div>
        <h3 class="font-color-light font-base-sb">Additional Resources</h3>
        <span class="font-color-light">
          <ul>
            <li v-for="(link, linkIndex) in links" :key="`${linkIndex}`">
              <a
                class="text-decoration-none font-color-primary font-sm"
                :href="link.href"
                >{{ link.label }}</a
              >
            </li>
          </ul>
        </span>
      </div>
    </div>
    <Modal
      :dialogClass="`modal-fullscreen`"
      :id="imagePopOutId"
      label="pop-out-image"
    >
      <template v-slot:modalContent>
        <img
          class="pop-out-image"
          :src="imagePopOutUrl"
          :alt="imagePopOutDesc"
        />
      </template>
    </Modal>
  </div>
</template>

<script setup>
import Dropdown from "@/components/general/Dropdown.vue";
import FeatureSlider from "@/components/general/FeatureSlider.vue";
import LoginOrRegister from "@/components/general/LoginOrRegister.vue";
import Modal from "@/components/general/Modal.vue";
</script>

<script>
export default {
  components: {
    Dropdown,
    FeatureSlider,
    Modal,
  },
  data() {
    return {
      imagePopOutId: "imagePopOut",
      imagePopOutDesc: "",
      imagePopOutUrl: "",
      logged_in: false,
      links: [
        {
          label: "Trivial Security vs ImmuniWeb vs Qualys SSL Labs",
          href: "#",
        },
        {
          label: "Trivial Scanner vs SSLyze vs testssl.sh",
          href: "#",
        },
        {
          label: "How most SSL/TLS scanners are more harmful than helpful",
          href: "#",
        },
      ],
      FAQs: [
        {
          question: "What is SSL/TLS?",
          answer:
            "Secure Sockets Layer (SSL) is a family of network protocols aimed to encrypt data transmission over other, higher level, protocols that transport web content, email or other types of information. Today SSL is considered obsolete and insecure, and is now replaced with a newer TLS (Transport Layer Security) family of protocols. Many people, however, still use the SSL acronym interchangeably with TLS. Billions of people unwittingly use SSL/TLS in a daily manner, for example, when they visit an HTTPS website, they are relying on TLS encryption when sending and receiving the data from the web server where the website is hosted.",
        },
        {
          question: "What is a Certificate?",
          answer:
            "From a technical standpoint, SSL certificate is a file stored on the server. From a practical standpoint, SSL certificate is a key to encrypt and decrypt information sent or received by a web, email or other servers with SSL/TLS encryption enabled. Furthermore, some SSL certificates may also confirm identity of the website owner, ensuring its visitors that they deal with the genuine website they can trust.",
        },
        {
          question: "What are the impacts of vulnerabilities?",
          answer:
            "If a vulnerability is exploited through harmful cyber attacks, the impact of such exploitation could cause severe repercussions and could compromise personal, sensitive data. Because of its widespread use online, SSL and TLS have been targets by security researchers and attackers. Many vulnerabilities in SSL and TLS have (and still are increasingly) being uncovered",
        },
        {
          question: "What are the types of SSL certificates?",
          answer:
            "There are three types of SSL certificates available:\nDomain Validated (DV SSL) - base level protection that can be issued immediately.\nOrganization Validated (OV SSL) - next level protection that verifies the domain owner among several business details including name, city, states, and country.\nExtended Validation (EV SSL) - highest level of SSL certificates with the most stringent vetting process.",
        },
        {
          question: "What is a host?",
          answer:
            "There are four types of hosts that Trivial Scanner currently supports; Apex domain names (eg. google.com or google.com.au), Sub domains; (maps.google.com or www.google.com.au); IPv4 and IPv6 addresses. ASN, CIDR ranges, and IPv6 prefix are on our development roadmap.",
        },
        {
          question: "How often does the host monitor run?",
          answer:
            "Free accounts are once per day, paid accounts are able to set any hourly intervals per host. Enterprise customers gain the ability to apply any schedule to any host.",
        },
        {
          question: "Can the scanner login to our systems?",
          answer:
            "Trivial Security is not a penetration testing suite, but shares many features with the early stages of a penetration test. Trivial Security scanners will see your internet connect services the same ay they are presented to anonymous malicious actors, Your login has identity verification (right?) so these bad actors are identified and can be prosecuted. Trivial Security aims to help you defend from the more discrete albeit simple attack vectors.",
        },
        {
          question: "How much scan volume do you send?",
          answer:
            "Trivial Security finds novel techniques to derive our findings using methods that minimize overall scanning activity, we are passionate about avoiding impacts or otherwise reducing load on target resources.",
        },
        {
          question:
            "Can we opt-out or otherwise block the scanner from accessing our websites?",
          answer:
            "Trivial Security applies to all (well-formed) HTTP requests the User-Agent 'Trivial Scanner' for the open source tool, or 'Trivial Security' for the hosted scanner, and will act according to the robots.txt file at the root of your domain. In future we plan to publish an rDNS record so you may lookup incoming IP Addresses of any protocol to see if they are ours. Or simply email support@trivialsec.com with the subject Opt-out and your hosts, we'll provide a verification token for you to add a TXT to your DNS to prove ownership and we'll never scan any domains or IP address (A and AAAA records).",
        },
        {
          question: "How many evaluations are performed?",
          answer:
            "Trivial Scanner is an open source project that is under active development and in 2022 there were over 100 unique rule evaluations implemented. We expect this to grow beyond 500 in 2023.",
        },
        {
          question: "Can additional rule evaluations be added?",
          answer:
            "Trivial Scanner is an open source project and designed to be modular, so you may self-host the scanner and apply any number of rules. Our Discord community can be a place to discover additional rules that have not yet been added to the open source repository directly, and in future this site will publicly publish user submitted rulesets for bespoke needs outside the core projects goals",
        },
        {
          question: "How to report suspected abuse?",
          answer:
            "Trivial Scanner is specifically designed to perform requests no different than any web browsers, and will reduce volume sent after the initial scan. Only customers with hosts that they have verified ownership can use our service for active scanning that may have unforeseeable or potentially disruptive activity. If you still believe there is abuse please send an email to abuse@trivialsec.com and provide us your logs of the activity.",
        },
      ],
    };
  },
  created() {
    this.logged_in = !!localStorage.getItem("/session/key");
  },
  methods: {
    imagePopOut(event) {
      const img = event.target.querySelector("img");
      this.imagePopOutUrl = img.src;
      this.imagePopOutDesc = img.alt;
    },
  },
};
</script>

<style scoped lang="scss">
.pop-out-image {
  width: auto;
  height: 85vh;
}

.feature {
  &-parra {
    margin-top: spacers("lg");
    margin-bottom: spacers("lg");
  }

  &-image-container {
    margin-top: spacers("lg");
    margin-bottom: spacers("lg");
  }

  &-image {
    object-fit: contain;
    width: 100%;
    z-index: -1;

    @media (min-width: breakpoints("lg")) and (max-width: breakpoints("xl")) {
      min-width: 700px;
    }

    @media (min-width: breakpoints("xl")) and (max-width: breakpoints("xxl")) {
      min-width: 850px;
    }

    @media (min-width: breakpoints("xxl")) {
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
    min-width: 430px;
    height: 520px;
    border: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
}
</style>
