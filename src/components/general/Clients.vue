<template>
  <loadingComponent class="loading" :class="{ inactive: !loading }" />
  <div class="client-members-section d-flex flex-column margin-top-lg">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="font-color-light font-lg-b">Clients</h3>
    </div>
    <div class="d-flex w-100">
      <ValidationMessage
        v-if="this.errorMessage.length > 0"
        class="justify-content-between"
        :message="this.errorMessage"
        :type="this.errorMessageType"
      />
    </div>
    <div class="margin-top-sm">
      <swiper :modules="modules" :slides-per-view="1" :space-between="10" :navigation="{
        nextEl: '.custom-client-swiper-button-next',
        prevEl: '.custom-client-swiper-button-prev',
      }" :pagination="{ clickable: true }" :scrollbar="{ draggable: true }" :breakpoints="{
                '640': {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                '768': {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                '1024': {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }">
        <swiper-slide class="d-flex border-radius-sm flex-column padding-md bg-dark-60" v-for="client in clients" :key="client.account.ip_addr">
          <div class="text-left font-color-light font-sm">
            <p class="font-base-sb margin-bottom-sm">{{ client.name }}</p>
            <p v-if="client.cli_version" class="mb-0">
              <span class="font-sm-sb margin-right-sm">CLI Version:</span>
              <span class="font-sm">{{ client.cli_version }}</span>
            </p>
            <p class="mb-0">
              <span class="font-sm">{{ client.ip_addr }}</span>
            </p>
            <p class="mb-0">
              <span class="font-sm">{{ client.client_info.operating_system }}
                {{ client.client_info.operating_system_version }}</span>
            </p>
            <p class="margin-bottom-sm">
              <span class="font-sm">{{ client.client_info.operating_system_release }}
                {{ client.client_info.architecture }}</span>
            </p>
            <p class="mb-0 font-xs">
              <span>Created {{ client.created }}</span>
            </p>
            <p class="mb-0 font-sm">
              Registration Token
            </p>
            <div class="token font-color-primary bg-dark padding-xs margin-bottom-xs">{{ client.access_token }}</div>
          </div>
          <div class="d-flex justify-content-end">
            <Toggle :defaultChecked="client.active" @change="toggleClientFeed($event, client.name)" />
          </div>
        </swiper-slide>
      </swiper>
      <div class="d-flex justify-content-between margin-top-sm">
        <div>
          <button class="custom-swiper-button custom-client-swiper-button-prev font-color-light">
            &lt;
          </button>
        </div>
        <div>
          <button class="custom-swiper-button custom-client-swiper-button-next font-color-light">
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import Toggle from "@/components/general/Toggle.vue";
import EmaiInput from "@/components/inputs/EmaiInput.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";
import moment from "moment";
</script>

<script>
export default {
  components: {
    Swiper,
    SwiperSlide,
    Toggle,
    EmaiInput,
    ValidationMessage,
    loadingComponent,
  },
  data() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
      loading: false,
      clients: [],
      errorMessage: "",
      errorMessageType: "",
    };
  },
  created() {
    this.fetchClients();
  },
  mounted() {},
  methods: {
    async inviteMembers(event) {
      this.loading = true;
      const response = await Api.post("/member/invite", {
        email: event.target.elements["InviteEmail"].value,
      }).catch(error => {
        this.error = error;
        this.inviteMessage = "Something went wrong. E-mail wasn't sent.";
        this.inviteMessageType = "error";
        this.loading = false;
      });
      if (response.status !== 202) {
        this.inviteMessage = `${response.status} ${response.statusText}`
        this.inviteMessageType = "error";
        this.loading = false;
        return;
      }
      this.inviteMessage = "Invited!";
      this.inviteMessageType = "success";
      setTimeout(this.fetchMembers, 2000);
    },
    async deleteMember(event) {
      this.loading = true;
      const response = await Api.delete(`/member/${event.target.elements["MemberEmail"].value}`)
      if (response.status != 202) {
        this.memberDeleteMessage = "Something went wrong. Member couldn't be deleted.";
        this.memberDeleteMessageType = "error";
        this.loading = false;
        return;
      }
      this.memberDeleteMessage = "This member was deleted";
      this.memberDeleteMessageType = "success";
      setTimeout(this.fetchMembers, 2000);
    },
    async fetchClients() {
      this.loading = true;
      const response = await Api.get(`/clients`).catch(error => {
        this.errorMessage = error;
        this.errorMessageType = "error";
      });
      if (response.status === 204) {
        this.errorMessage = "No clients are registered";
        this.errorMessageType = "warning";
        this.clients = [];
        this.loading = false;
        return;
      } else if (response.status !== 200) {
        this.errorMessage = `${response.status} ${response.statusText}`;
        this.errorMessageType = "error";
        this.loading = false;
        return;
      }
      const data = await response.json();
      this.clients = data.map((client) => {
        client.created = moment(client.timestamp).fromNow();
        return client;
      });
      this.loading = false;
    },
    async toggleClientFeed($event, client_name) {
      const deactivate_url = `/deactived/${client_name}`;
      const activate_url = `/activate/${client_name}`;
      if ($event.target.checked === true) {
        this.loading = true;
        const response = await Api.get(activate_url).catch(error => {
          this.errorMessage = error;
          this.errorMessageType = "error";
        });
        if (response.status !== 200) {
          this.errorMessage = `${response.status}: An error has occured, please try again.`;
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        this.errorMessage = "Feed was enabled with success";
        this.errorMessageType = "success";
        this.loading = false;
      } else {
        this.loading = true;
        const response = await Api.get(deactivate_url).catch(error => {
          this.errorMessage = error;
          this.errorMessageType = "error";
        });
        if (response.status !== 200) {
          this.errorMessage = `${response.status}: An error has occured, please try again.`;
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        this.errorMessage = "Feed was disabled with success";
        this.errorMessageType = "success";
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
.token {
  word-wrap: break-word;
  max-width: fit-content;
}
</style>
