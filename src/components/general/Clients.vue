<template>
  <loadingComponent class="loading" :class="{ inactive: !loading }" />
  <div class="clients-section d-flex flex-column margin-top-lg">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="font-color-light font-lg-b">Clients</h3>
    </div>
    <div class="d-flex w-100">
      <ValidationMessage
        v-if="errorMessage.length > 0"
        class="justify-content-between"
        :message="errorMessage"
        :type="errorMessageType"
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
        <swiper-slide class="d-flex border-radius-sm flex-column padding-md bg-dark-60" v-for="(client, index) in clients" :key="client.name">
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
          <div class="d-flex client-actions">
            <div class="col-6">
              <Toggle :defaultChecked="client.active" @change="toggleClientFeed($event, client.name)" />
            </div>
            <div class="d-flex col-6 justify-content-end">
              <div class="d-flex justify-content-end delete-client-modal">
                <Modal v-if="!client.active" :id="`deleteClient${index}`" label="delete-client-header">
                  <template v-slot:button="buttonProps">
                    <button class="edit-mode-btn delete" v-bind="buttonProps">
                      <IconTrash class="profile-edit-icon" />
                    </button>
                  </template>
                  <template v-slot:modalTitle>
                    <h5 class="delete-client-header font-base font-color-light">
                      Are you sure you want to delete this client?
                    </h5>
                  </template>
                  <template v-slot:modalContent>
                    <form @submit.prevent="deleteClient($event)">
                      <input
                        type="hidden"
                        name="ClientName"
                        :value="client.name"
                      />
                      <button
                        type="submit"
                        class="btn-outline-danger-full font-color-danger font-sm"
                      >
                        Yes
                      </button>
                    </form>
                  </template>
                </Modal>
              </div>
            </div>
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
import IconTrash from "@/components/icons/IconTrash.vue";
import Modal from "@/components/general/Modal.vue";
import Toggle from "@/components/general/Toggle.vue";
import EmaiInput from "@/components/inputs/EmaiInput.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";
import moment from "moment";
</script>

<script>
export default {
  props: {
    clients: Array,
  },
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
      errorMessage: "",
      errorMessageType: "",
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    async deleteClient(event) {
      this.loading = true;
      try {
        const clientName = event.target.elements["ClientName"].value
        const response = await Api.delete(`/client/${clientName}`)
        if (response.status != 202) {
          this.errorMessage = "Something went wrong. Client couldn't be deleted."
          this.errorMessageType = "error"
          this.loading = false
          return;
        }
        this.errorMessage = "This client was deleted"
        this.errorMessageType = "success"
        for (const [index, client] of this.clients.entries()) {
          if (client.name === clientName) {
            this.clients.splice(index, 1)
            break
          }
        }
      } catch (error) {
        this.errorMessage = error.name === 'AbortError' ? "Request timed out, please try refreshing the page." : `${error.name} ${error.message}. Couldn't complete this action.`
        this.errorMessageType = "error"
      }
      this.loading = false
    },
    async fetchClients() {
      this.loading = true
      try {
        const response = await Api.get(`/clients`, { timeout: 30000 })
        if (response.status === 204) {
          this.errorMessage = "No clients are registered"
          this.errorMessageType = "warning"
          this.loading = false
          return
        } else if (response.status !== 200) {
          this.errorMessage = `${response.status} ${response.statusText}`
          this.errorMessageType = "error"
          this.loading = false
          return
        }
        const data = await response.json()
        data.forEach(client => {
          client.created = moment.utc(client.timestamp).fromNow()
          this.clients.push(client)
        })
      } catch (error) {
        this.errorMessage = error.name === 'AbortError' ? "Request timed out, please try refreshing the page." : `${error.name} ${error.message}. Couldn't complete this action.`
        this.errorMessageType = "error"
      }
      this.loading = false
    },
    async toggleClientFeed($event, client_name) {
      const deactivate_url = `/deactived/${client_name}`
      const activate_url = `/activate/${client_name}`
      this.loading = true;
      try {
        if ($event.target.checked === true) {
          const response = await Api.get(activate_url)
          if (response.status !== 200) {
            this.errorMessage = `${response.status}: An error has occured, please try again.`
            this.errorMessageType = "error"
            this.loading = false
            return;
          }
          this.errorMessage = "Feed was enabled with success"
          this.errorMessageType = "success"
          for (const client of this.clients) {
            if (client_name === client.name) {
              client.active = true
              break
            }
          }
        } else {
          const response = await Api.get(deactivate_url)
          if (response.status !== 200) {
            this.errorMessage = `${response.status}: An error has occured, please try again.`
            this.errorMessageType = "error"
            this.loading = false
            return;
          }
          this.errorMessage = "Feed was disabled with success"
          this.errorMessageType = "success"
          for (const client of this.clients) {
            if (client_name === client.name) {
              client.active = false
              break
            }
          }
        }
      } catch (error) {
        this.errorMessage = error.name === 'AbortError' ? "Request timed out, please try refreshing the page." : `${error.name} ${error.message}. Couldn't complete this action.`
        this.errorMessageType = "error"
      }
      this.loading = false
    },
  },
}
</script>
<style lang="scss">
.token {
  word-wrap: break-word;
  max-width: fit-content;
}
.client-actions {
  align-items: center;
}
.delete-client-modal {
  .modal {
    .modal-dialog {
      margin-top: 0;
      margin-bottom: 0;
      height: 100%;

      .modal-content {
        height: 100%;

        .modal-body {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
