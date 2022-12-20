<template>
  <LoadingComponent class="loading" :class="{ inactive: !loading }" />
  <div class="profile-members-section d-flex flex-column">
    <div
      class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
    >
      <h3 class="font-color-light font-lg-b modal-invite-header">Members</h3>
      <ValidationMessage
        v-if="errorMessage.length > 0"
        class="justify-content-between"
        :message="errorMessage"
        :type="errorMessageType"
      />
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
              v-if="inviteMessage.length > 0"
              class="justify-content-between"
              :message="inviteMessage"
              :type="inviteMessageType"
            />
            <EmailInput
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
        v-if="memberDeleteMessage.length > 0"
        class="justify-content-start"
        :message="memberDeleteMessage"
        :type="memberDeleteMessageType"
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
              <Modal
                v-if="!member.current"
                :id="`deleteMember${index}`"
                label="delete-member-header"
              >
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

import IconTrash from "@/components/icons/IconTrash.vue";
import Button from "@/components/general/Button.vue";
import Toggle from "@/components/general/Toggle.vue";
import EmailInput from "@/components/inputs/EmailInput.vue";
import Modal from "@/components/general/Modal.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import LoadingComponent from "@/components/general/LoadingComponent.vue";
import moment from "moment";
</script>

<script>
export default {
  components: {
    Button,
    Swiper,
    SwiperSlide,
    Toggle,
    IconTrash,
    EmailInput,
    Modal,
    ValidationMessage,
    LoadingComponent,
  },
  data() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
      loading: false,
      members: [],
      errorMessage: "",
      errorMessageType: "",
      inviteMessage: "",
      inviteMessageType: "",
      memberDeleteMessage: "",
      memberDeleteMessageType: "",
    };
  },
  created() {
    this.fetchMembers();
  },
  methods: {
    async inviteMembers(event) {
      this.loading = true;
      try {
        const response = await Api.post("/member/invite", {
          email: event.target.elements["InviteEmail"].value,
        });
        if (response.status !== 202) {
          this.inviteMessage = `${response.status} ${response.statusText}`;
          this.inviteMessageType = "error";
          this.loading = false;
          return;
        }
        this.inviteMessage = "Invited!";
        this.inviteMessageType = "success";
        const member = await response.json();
        member.created = moment.utc(member.timestamp).fromNow();
        member.status = "Pending Activation";
        this.members.push(member);
      } catch (error) {
        this.inviteMessage =
          error.name === "AbortError"
            ? "Request timed out, please try refreshing the page."
            : `${error.name} ${error.message}. Couldn't complete this action.`;
        this.inviteMessageType = "error";
      }
      this.loading = false;
    },
    async deleteMember(event) {
      this.loading = true;
      try {
        const memberEmail = event.target.elements["MemberEmail"].value;
        const response = await Api.delete(`/member/${memberEmail}`);
        if (response.status != 202) {
          this.memberDeleteMessage =
            "Something went wrong. Member couldn't be deleted.";
          this.memberDeleteMessageType = "error";
          this.loading = false;
          return;
        }
        this.memberDeleteMessage = "This member was deleted";
        this.memberDeleteMessageType = "success";
        for (const [index, member] of this.members.entries()) {
          if (member.email === memberEmail) {
            this.members.splice(index, 1);
            break;
          }
        }
      } catch (error) {
        this.memberDeleteMessage =
          error.name === "AbortError"
            ? "Request timed out, please try refreshing the page."
            : `${error.name} ${error.message}. Couldn't complete this action.`;
        this.memberDeleteMessageType = "error";
      }
      this.loading = false;
    },
    async fetchMembers() {
      this.loading = true;
      try {
        const response = await Api.get(`/members`, { timeout: 30000 });
        if (response.status === 204) {
          this.errorMessage = "Issue loading members";
          this.errorMessageType = "error";
          this.members = [];
          this.loading = false;
          return;
        } else if (response.status !== 200) {
          this.errorMessage = `${response.status} ${response.statusText}`;
          this.errorMessageType = "error";
          this.loading = false;
          return;
        }
        const data = await response.json();
        this.members = data.map((member) => {
          member.created = moment.utc(member.timestamp).fromNow();
          member.status = member.confirmed ? "Confirmed" : "Pending Activation";
          return member;
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
