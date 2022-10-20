<template>
  <loadingComponent class="loading" :class="{ inactive: !loading }" />

  <div class="profile-members-section d-flex flex-column">
    <div
      class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
    >
      <h3 class="font-color-light font-lg-b modal-invite-header">Members</h3>
      <Modal id="inviteModal" label="modal-invite-header">
        <template v-slot:button="buttonProps">
          <Button
            v-bind="buttonProps"
            class="btn-outline-primary-sm font-color-primary font-sm"
            text="Invite Member"
          />
        </template>
        <template v-slot:modalTitle>
          <h5 class="font-base-b font-color-light">Invite member</h5>
        </template>
        <template v-slot:modalContent>
          <form @submit.prevent="inviteMembers($event)">
            <ValidationMessage
              v-if="this.inviteMessage.length > 0"
              class="justify-content-between"
              :message="this.inviteMessage"
              :type="this.inviteMessageType"
            />
            <EmaiInput
              placeholder="Who do you want to invite?"
              id="InviteEmail"
              label="E-mail"
              :required="true"
            />
            <Button
              class="btn-outline-primary-full font-color-primary font-sm"
              text="Invite"
              type="submit"
            />
          </form>
        </template>
      </Modal>
    </div>
    <div class="d-flex w-100">
      <ValidationMessage
        v-if="this.memberDeleteMessage.length > 0"
        class="justify-content-start"
        :message="this.memberDeleteMessage"
        :type="this.memberDeleteMessageType"
      />
    </div>
    <div class="margin-top-sm">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="10"
        class="padding-bottom-sm"
        :navigation="{
          nextEl: '.custom-member-swiper-button-next',
          prevEl: '.custom-member-swiper-button-prev',
        }"
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        :breakpoints="{
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
        }"
      >
        <swiper-slide
          class="d-flex border-radius-sm flex-column padding-md bg-dark-60"
          :class="member.current ? 'user-slider' : ''"
          v-for="(member, index) in members"
          :key="member.email_md5"
        >
          <div class="d-flex justify-content-end">
            <img
              :src="`https://www.gravatar.com/avatar/${member.email_md5}`"
              class="swiper-slide-avatar margin-bottom-sm"
              alt=""
            />
          </div>

          <div class="text-left font-color-light font-sm">
            <p class="mb-0 font-sm word-break-all">
              {{ member.email }}
              <span v-if="member.current" class="font-sm font-color-secondary">
                (You)
              </span>
            </p>
            <p class="mb-0 font-sm">{{ member.status }}</p>
            <p v-if="member.confirmed" class="mb-0 font-sm">
              Joined {{ member.created }}
            </p>
            <p v-else class="mb-0 font-sm">Invited {{ member.created }}</p>
            <div class="d-flex justify-content-end delete-member-modal">
              <Modal :id="`deleteMember${index}`" label="delete-member-header">
                <template v-slot:button="buttonProps">
                  <button class="edit-mode-btn delete" v-bind="buttonProps">
                    <IconTrash class="profile-edit-icon" />
                  </button>
                </template>
                <template v-slot:modalTitle>
                  <h5 class="delete-member-header font-base font-color-light">
                    Are you sure you want to delete this member?
                  </h5>
                </template>
                <template v-slot:modalContent>
                  <form @submit.prevent="deleteMember($event)">
                    <input
                      type="hidden"
                      name="MemberEmail"
                      :value="member.email"
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
        </swiper-slide>
      </swiper>
      <div
        class="d-flex justify-content-between margin-top-sm border-bottom-light-20"
      >
        <div>
          <button
            class="custom-swiper-button custom-member-swiper-button-prev font-color-light"
          >
            &lt;
          </button>
        </div>
        <div>
          <button
            class="custom-swiper-button custom-member-swiper-button-next font-color-light"
          >
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
import moment from "moment";
import CryptoJS from "crypto-js";

import "swiper/css";

import IconTrash from "@/components/icons/IconTrash.vue";
import Button from "@/components/general/Button.vue";
import Toggle from "@/components/general/Toggle.vue";
import EmaiInput from "@/components/inputs/EmaiInput.vue";
import Modal from "@/components/general/Modal.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";
</script>

<script>
export default {
  components: {
    Button,
    Swiper,
    SwiperSlide,
    Toggle,
    IconTrash,
    EmaiInput,
    Modal,
    ValidationMessage,
    loadingComponent,
  },
  data() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
      api_url: import.meta.env.VITE_API_URL,
      loading: false,
      members: [],
      inviteMessage: "",
      inviteMessageType: "",
      memberDeleteMessage: "",
      memberDeleteMessageType: "",
    };
  },
  created() {
    this.fetchMembers();
  },
  mounted() {},
  methods: {
    async inviteMembers(event) {
      const inviteEmail = event.target.elements["InviteEmail"].value;
      const payload = JSON.stringify({
        email: inviteEmail,
      });
      this.loading = true;
      const req_url = `${this.api_url}/member/invite`;
      const ts = moment().utc().unix();
      const url = new URL(req_url);
      const canonical_string = `POST\n${url.hostname}\n${url.port || 443}\n${
        url.pathname
      }\n${ts}\n${window.btoa(payload)}`;
      const hash = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA512,
        localStorage.getItem("/session/key")
      );
      hash.update(canonical_string);
      const mac = hash.finalize();
      const header = `HMAC id="${localStorage.getItem(
        "/member/email"
      )}", mac="${mac}", ts="${ts}"`;
      const response = await fetch(req_url, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: header,
        },
        method: "POST",
        body: payload,
      }).catch((error) => {
        this.error = error;
        this.inviteMessage = "Something went wrong. E-mail wasn't sent.";
        this.inviteMessageType = "error";
        this.loading = false;
      });
      if (response.status !== 202) {
        this.error = `${response.status} ${response.statusText}`;
        this.loading = false;
        return;
      }
      this.editMode = !this.editMode;
      this.inviteMessage = "Invited!";
      this.inviteMessageType = "success";
      setTimeout(this.fetchMembers, 2000);
    },

    //     this.loading = true
    //     const req_url = `${this.api_url}/summary/Mv1N0o4lOTPaATxodTlsEPYFc9Rkr7-w97ygP4zweoSxL_6rBG347F7T6jbgaz1VMI5VwID4f14`
    //     const ts = moment().utc().unix()
    //     const url = new URL(req_url)
    //     const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${url.pathname}\n${ts}`
    //     const hash = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, localStorage.getItem('/session/key'))
    //     hash.update(canonical_string)
    //     const mac = hash.finalize()
    //     const header = `HMAC id="${localStorage.getItem('/member/email')}", mac="${mac}", ts="${ts}"`
    //     const response = await fetch(req_url, {
    //         headers: {"Authorization": header},
    //         method: 'GET'
    //     })

    //     const data = await response.json()
    //     console.log('delete account');
    //     console.log(data);
    //     if (response.status == 200) {
    //         this.memberDeleteMessage = "Account was deleted"
    //         this.memberDeleteMessageType = "success"
    //         this.loading = false
    //     } else {
    //         this.memberDeleteMessage = "Something went wrong. Couldn't delete account."
    //         this.memberDeleteMessageType = "error"
    //         this.loading = false
    //     }
    // },
    async deleteMember(event) {
      const memberEmail = event.target.elements["MemberEmail"].value;
      this.loading = true;
      const req_url = `${this.api_url}/member/${memberEmail}`;
      const ts = moment().utc().unix();
      const url = new URL(req_url);
      const canonical_string = `DELETE\n${url.hostname}\n${url.port || 443}\n${
        url.pathname
      }\n${ts}`;
      const hash = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA512,
        localStorage.getItem("/session/key")
      );
      hash.update(canonical_string);
      const mac = hash.finalize();
      const header = `HMAC id="${localStorage.getItem(
        "/member/email"
      )}", mac="${mac}", ts="${ts}"`;
      const response = await fetch(req_url, {
        headers: { Authorization: header },
        method: "DELETE",
      });
      if (response.status != 202) {
        this.memberDeleteMessage =
          "Something went wrong. Member couldn't be deleted.";
        this.memberDeleteMessageType = "error";
        this.loading = false;
        return;
      }
      this.memberDeleteMessage = "This member was deleted";
      this.memberDeleteMessageType = "success";
      setTimeout(this.fetchMembers, 2000);
    },
    async fetchMembers() {
      this.loading = true;
      const req_url = `${this.api_url}/members`;
      const ts = moment().utc().unix();
      const url = new URL(req_url);
      const canonical_string = `GET\n${url.hostname}\n${url.port || 443}\n${
        url.pathname
      }\n${ts}`;
      const hash = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA512,
        localStorage.getItem("/session/key")
      );
      hash.update(canonical_string);
      const mac = hash.finalize();
      const header = `HMAC id="${localStorage.getItem(
        "/member/email"
      )}", mac="${mac}", ts="${ts}"`;
      const response = await fetch(req_url, {
        headers: { Authorization: header },
      }).catch((error) => {
        this.error = error;
      });
      if (response.status === 204) {
        this.members = [];
        this.loading = false;
        return;
      } else if (response.status !== 200) {
        this.error = `${response.status} ${response.statusText}`;
        this.loading = false;
        return;
      }
      const data = await response.json();
      this.members = data.map((member) => {
        member.created = moment(member.timestamp).fromNow();
        member.status = member.confirmed ? "Confirmed" : "Pending Activation";
        return member;
      });
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
.delete-member-modal {
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
