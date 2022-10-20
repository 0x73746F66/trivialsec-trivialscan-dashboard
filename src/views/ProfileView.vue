<template>
  <loadingComponent class="loading" :class="{ inactive: !loading }" />

  <div class="container padding-top-xl padding-bottom-xl">
    <div
      class="profile-container bg-dark-40 border-radius-sm margin-bottom-lg d-flex flex-column"
    >
      <div class="d-flex justify-content-between align-items-start">
        <div class="h-100 d-flex align-items-lg-center flex-column flex-lg-row">
          <img
            :src="`https://www.gravatar.com/avatar/${member.email_md5}`"
            class="border-radius-round profile-picture margin-right-md margin-bottom-md mb-lg-0"
            alt="{{member.account.display}}'s Profile Picture'"
          />
          <div class="d-flex flex-column justify-content-start">
            <div class="d-flex flex-column justify-content-start">
              <EditableTextField
                :editMode="editMode"
                class="margin-bottom-sm position-relative"
              >
                <template #staticField>
                  <h1 class="font-xl-b font-color-light" v-if="member.account">
                    {{ member.account.display }}
                  </h1>
                </template>
                <template #inputField>
                  <form
                    class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                    @submit.prevent="updateAccountDisplay($event)"
                  >
                    <TextInput
                      v-if="member.account"
                      :placeholder="member.account.display"
                      id="AccountDisplay"
                      label="Display Name"
                      :required="true"
                    />
                    <button type="submit" class="inline-custom-form-btn">
                      <checkIcon class="profile-edit-icon" color="1abb9c" />
                    </button>
                  </form>
                </template>
              </EditableTextField>
              <EditableTextField
                :editMode="editMode"
                class="margin-bottom-sm position-relative"
              >
                <template #staticField>
                  <span class="font-base font-color-light">
                    {{ member.email }}
                  </span>
                </template>
                <template #inputField>
                  <form
                    class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                    @submit.prevent="updateEmail($event)"
                  >
                    <TextInput
                      v-if="member.email"
                      :placeholder="member.email"
                      id="Email"
                      label="Email"
                      :required="true"
                    />
                    <button type="submit" class="inline-custom-form-btn">
                      <checkIcon class="profile-edit-icon" color="1abb9c" />
                    </button>
                  </form>
                </template>
              </EditableTextField>
            </div>
            <ValidationMessage
              v-if="this.emailUpdateMessage.length > 0"
              class="justify-content-start"
              :message="this.emailUpdateMessage"
              :type="this.emailUpdateMessageType"
            />
          </div>
        </div>
        <button
          class="edit-mode-btn"
          v-if="!editMode"
          @click="toggleEditMode()"
        >
          <IconPencil class="profile-edit-icon" />
        </button>
        <div v-else>
          <button class="edit-mode-btn close" @click="toggleEditMode()">
            <IconCancel class="profile-edit-icon" color="f45e5e" />
          </button>
        </div>
      </div>
      <div
        class="d-flex justify-content-between align-items-start flex-column flex-lg-row"
      >
        <div
          class="d-flex flex-column font-color-light align-items-start margin-top-md margin-bottom-sm"
        >
          <div class="d-flex margin-bottom-xs align-items-center">
            <span class="font-base-sb margin-right-sm">Created:</span>
            <span class="font-sm font-sm">{{ member.created }}</span>
          </div>
          <div class="d-flex margin-bottom-xs align-items-center">
            <span class="font-base-sb margin-right-sm">Status:</span>
            <span class="font-sm font-sm">{{ member.status }}</span>
          </div>
          <div
            class="d-flex margin-bottom-xs align-items-center"
            v-if="member.account"
          >
            <span class="font-base-sb margin-right-sm">Account Name:</span>
            <span class="font-sm font-sm">{{ member.account.name }}</span>
          </div>
          <div
            class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
          >
            <span class="font-base-sb margin-right-sm">Primary Contact:</span>
            <EditableTextField :editMode="editMode" class="position-relative">
              <template #staticField>
                <span class="font-sm font-sm" v-if="member.account">{{
                  member.account.primary_email
                }}</span>
              </template>
              <template #inputField>
                <span class="font-base font-color-light">
                  <form
                    class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                    @submit.prevent="updatePrimaryEmail($event)"
                  >
                    <TextInput
                      v-if="member.account"
                      :placeholder="member.account.primary_email"
                      id="PrimaryEmail"
                      label="Primary Email"
                      :required="true"
                    />
                    <button type="submit" class="inline-custom-form-btn">
                      <checkIcon class="profile-edit-icon" color="1abb9c" />
                    </button>
                  </form>
                </span>
              </template>
            </EditableTextField>
          </div>
          <ValidationMessage
            v-if="this.errorMessage.length > 0"
            class="justify-content-start"
            :message="this.errorMessage"
            :type="this.errorMessageType"
          />
          <div
            class="d-flex margin-bottom-sm align-items-lg-start d-flex flex-column"
          >
            <Button
              class="btn-outline-primary-sm font-color-primary font-sm margin-bottom-sm"
              text="Generate CLI Client Credential"
              @click="generateClientCredential()"
            />
            <Modal id="deleteAccountModal" label="modal-delete-account-header">
              <template v-slot:button="buttonProps">
                <button
                  v-bind="buttonProps"
                  class="btn-outline-danger-sm font-color-danger font-sm"
                >
                  Permanantly Delete Account
                </button>
              </template>
              <template v-slot:modalTitle>
                <h5 class="font-base-b font-color-light">
                  Are you sure you want to delete your account? This action is
                  not reversible.
                </h5>
              </template>
              <template v-slot:modalContent>
                <Button
                  class="btn-outline-danger-sm font-color-danger font-sm"
                  text="Procced"
                  @click="deleteAccount()"
                />
              </template>
            </Modal>
          </div>
        </div>
        <div
          class="d-flex flex-column bg-dark-60 padding-sm border-radius-sm font-color-light profile-plan-information"
        >
          <div class="d-flex flex-column justify-content-between">
            <div
              class="d-flex flex-column flex-lg-row justify-content-between margin-bottom-sm"
            >
              <div
                class="margin-right-lg d-flex flex-lg-row flex-column align-items-lg-center"
              >
                <span
                  class="font-base-sb margin-right-sm margin-bottom-sm mb-lg-0"
                  >Active Plan:</span
                >
                <span class="font-sm font-sm">{{
                  member.account?.billing.product_name
                }}</span>
              </div>
              <div>
                <span class="font-color-primary font-lg-b"
                  >{{ member.account?.billing.display_amount }}
                </span>
                <span
                  v-if="member.account?.billing.display_period"
                  class="font-lg-b"
                  >/{{ member.account?.billing.display_period }}</span
                >
              </div>
            </div>
            <div
              v-if="member.account?.billing.is_trial"
              class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
            >
              <span class="font-sm font-color-primary"
                >Trial ends {{ member.account?.billing.next_payment }}</span
              >
            </div>
            <div
              v-if="member.account?.billing.description"
              class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
            >
              <span class="font-base-sb margin-right-sm">Payment Method:</span>
              <span class="font-sm">{{
                member.account?.billing.description
              }}</span>
            </div>
            <div
              v-if="
                member.account?.billing.next_due &&
                !member.account?.billing.is_trial
              "
              class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
            >
              <span class="font-base-sb margin-right-sm">Next Payment:</span>
              <span class="font-sm">{{
                member.account?.billing.next_payment
              }}</span>
            </div>
            <div
              class="d-flex margin-bottom-sm align-items-lg-center d-flex flex-lg-row flex-column"
            >
              <span class="font-base-sb margin-right-sm">Billing Contact:</span>
              <EditableTextField :editMode="editMode" class="position-relative">
                <template #staticField>
                  <span class="font-sm">{{
                    member?.account?.billing_email
                  }}</span>
                </template>
                <template #inputField>
                  <span class="font-base font-color-light">
                    <form
                      class="d-flex align-items-center justify-content-center inline-custom-form mt-lg-0 margin-top-sm"
                      @submit.prevent="updateBillingEmail($event)"
                    >
                      <TextInput
                        :placeholder="member?.account?.billing_email"
                        id="BillingEmail"
                        label="Billing Email"
                        :required="true"
                      />
                      <button type="submit" class="inline-custom-form-btn">
                        <checkIcon class="profile-edit-icon" color="1abb9c" />
                      </button>
                    </form>
                  </span>
                </template>
              </EditableTextField>
            </div>
            <div class="d-flex flex-column">
              <div class="d-flex margin-bottom-sm">
                <a
                  v-if="member.account?.billing.has_invoice"
                  target="_blank"
                  href="https://billing.stripe.com/p/login/8wMcQ27YKdPcbxSeUU"
                  class="text-decoration-none d-flex align-items-center justify-content-center margin-bottom-sm mb-lg-0 btn-outline-primary-full font-color-primary font-sm"
                  text="Billing Portal"
                />
              </div>
              <div
                v-if="
                  member.account?.billing.product_name === 'Community Edition'
                "
              >
                <Modal id="upgradeModal" label="modal-upgrade-header">
                  <template v-slot:button="buttonProps">
                    <Button
                      v-bind="buttonProps"
                      class="btn-fill-primary-full font-color-light font-sm"
                      text="Upgrade"
                    />
                  </template>
                  <template v-slot:modalTitle> </template>
                  <template v-slot:modalContent>
                    <stripe-pricing-table
                      pricing-table-id="prctbl_1LtVOcGZtHTgMn6lK07ldv8B"
                      publishable-key="pk_live_51HTJBRGZtHTgMn6l6LdsX1xQYlEwDSFR2aUpjzooo0wIiRTvxJZC4Op6aSeceg5JLGPy9qeam7s1AKVBXoSNjY8R00Qi76Bera"
                    >
                    </stripe-pricing-table>
                  </template>
                </Modal>
              </div>
              <div
                v-if="member.account?.billing.product_name === 'Professional'"
              >
                <Modal id="upgradeModal" label="modal-upgrade-header">
                  <template v-slot:button="buttonProps">
                    <Button
                      v-bind="buttonProps"
                      class="btn-fill-primary-full font-color-light font-sm"
                      text="Upgrade"
                    />
                  </template>
                  <template v-slot:modalTitle>
                    <h3 class="font-light font-lg-sb">
                      Do you wish to upgrade your account type?
                    </h3>
                  </template>
                  <template v-slot:modalContent>
                    <ValidationMessage
                      v-if="upgradeFormMessage.length > 0"
                      class="justify-content-between"
                      :message="upgradeFormMessage"
                      :type="upgradeFormMessageType"
                    />
                    <p class="font-sm font-light">
                      Please provide us with your preferred method of contact
                      (i.e. Phone number, e-mail)
                    </p>
                    <form @submit.prevent="upgradeForm($event)">
                      <TextInput
                        :placeholder="member.account.primary_email"
                        id="preferredMethodOfContact"
                        label="Contact"
                        :required="true"
                        :textDefault="member.account.primary_email"
                      />
                      <button
                        type="submit"
                        class="btn-fill-primary-full font-color-light font-sm"
                      >
                        Submit
                      </button>
                    </form>
                  </template>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="profile-container bg-dark-40 border-radius-sm d-flex flex-column"
    >
      <Members />
      <Clients />
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import moment from "moment";
import randomWords from 'random-words';
import "swiper/css";
import IconPencil from "@/components/icons/IconPencil.vue";
import IconCancel from "@/components/icons/IconCancel.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import checkIcon from "@/components/icons/checkIcon.vue";
import Button from "@/components/general/Button.vue";
import Toggle from "@/components/general/Toggle.vue";
import Members from "@/components/general/Members.vue";
import Clients from "@/components/general/Clients.vue";
import EditableTextField from "@/components/inputs/EditableTextField.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import EmaiInput from "@/components/inputs/EmaiInput.vue";
import Modal from "@/components/general/Modal.vue";
import ValidationMessage from "@/components/general/ValidationMessage.vue";
import loadingComponent from "@/components/general/loadingComponent.vue";
</script>
<script>
export default {
  components: {
    IconPencil,
    Button,
    Swiper,
    SwiperSlide,
    Toggle,
    EditableTextField,
    TextInput,
    IconCancel,
    checkIcon,
    IconTrash,
    EmaiInput,
    Modal,
    ValidationMessage,
    loadingComponent,
    Members,
    Clients,
  },
  data() {
    return {
      member: {},
      editMode: false,
      errorMessage: "",
      errorMessageType: "",
      email: "",
      emailUpdateMessage: "",
      emailUpdateMessageType: "",
      primaryEmail: "",
      primaryEmailUpdateMessage: "",
      primaryEmailUpdateMessageType: "",
      billingEmail: "",
      billingEmailUpdateMessage: "",
      billingEmailUpdateMessageType: "",
      upgradeFormMessage: "",
      upgradeFormMessageType: "",
      loading: false,
    };
  },
  created() {
    this.fetchProfile();
  },
  mounted() {
    let stripeScript = document.createElement("script");
    stripeScript.setAttribute(
      "src",
      "https://js.stripe.com/v3/pricing-table.js"
    );
    document.head.appendChild(stripeScript);
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
      this.emailUpdateMessage = "";
      this.emailUpdateMessageType = "";
    },
    async fetchProfile() {
      const response = await Api.get("/me").catch(error => {
        this.errorMessage = error;
        this.errorMessageType = "error";
      });
      if (response.status !== 200) {
        this.errorMessage = `${response.status} ${response.statusText}`;
        this.errorMessageType = "error";
        this.loading = false;
        return;
      }
      const data = await response.json();
      this.member = data.member;
      this.member.status = this.member.confirmed
        ? "Confirmed"
        : "Pending activation";
      this.member.created = moment(this.member.timestamp).fromNow();
      if (this.member.account?.billing.next_due) {
        this.member.account.billing.next_payment = moment(
          this.member.account.billing.next_due
        ).fromNow();
      }
      this.loading = false;
    },
    async updateEmail(event) {
      this.loading = true;
      const email = event.target.elements["Email"].value
      const response = await Api.post("/member/email", {email}).catch(error => {
        this.emailUpdateMessage = error;
        this.emailUpdateMessageType = "error";
        this.loading = false;
      });
      if (response.status !== 200) {
        this.emailUpdateMessage = `${response.status} ${response.statusText}`;
        this.emailUpdateMessageType = "error";
        this.loading = false;
        return;
      }
      const data = await response.json();
      this.editMode = !this.editMode;
      this.emailUpdateMessage = "E-mail was updated!";
      this.emailUpdateMessageType = "success";
      localStorage.setItem("/member/email", email);
      localStorage.setItem(
        "/member/email_md5",
        data?.member?.email_md5 || localStorage.getItem("/member/email_md5")
      );
      setTimeout(this.fetchProfile, 2000)
    },
    async updatePrimaryEmail(event) {
      this.loading = true;
      const email = event.target.elements["PrimaryEmail"].value;
      const response = await Api.post("/account/email", { email }).catch(error => {
        this.primaryEmailUpdateMessage = error;
        this.primaryEmailUpdateMessageType = "error";
        this.loading = false;
      });
      if (response.status !== 200) {
        this.primaryEmailUpdateMessage = `${response.status} ${response.statusText}`;
        this.primaryEmailUpdateMessageType = "error";
        this.loading = false;
        return;
      }
      this.editMode = !this.editMode;
      this.primaryEmailUpdateMessage = "E-mail was updated!";
      this.primaryEmailUpdateMessageType = "success";
      setTimeout(this.fetchProfile, 2000)
    },
    async updateBillingEmail(event) {
      this.loading = true;
      const email = event.target.elements["BillingEmail"].value;
      const response = await Api.post("/billing/email", { email }).catch(error => {
        this.primaryEmailUpdateMessage = error;
        this.primaryEmailUpdateMessageType = "error";
        this.loading = false;
      });
      if (response.status !== 200) {
        this.primaryEmailUpdateMessage = `${response.status} ${response.statusText}`;
        this.primaryEmailUpdateMessageType = "error";
        this.loading = false;
        return;
      }
      this.editMode = !this.editMode;
      this.primaryEmailUpdateMessage = "E-mail was updated!";
      this.primaryEmailUpdateMessageType = "success";
      setTimeout(this.fetchProfile, 2000)
    },
    updateAccountDisplay() {
      this.billingEmailUpdateMessage = "Display Name was updated!";
      this.billingEmailUpdateMessageType = "success";
      localStorage.setItem(
        "/account/display",
        data?.member?.account?.display ||
          localStorage.getItem("/account/display")
      );
      this.editMode = !this.editMode;
    },
    async upgradeForm(event) {
      this.loading = true;
      const contact = event.target.elements.preferredMethodOfContact.value;
      const response = await Api.post("/account/upgrade", {contact});
      if (response.status === 202) {
        this.upgradeFormMessage = "Thank you for reaching out to us! We will be in contact soon.";
        this.upgradeFormMessageType = "success";
        this.loading = false;
        return;
      }
      this.upgradeFormMessage = `Something went wrong, your contact wasn't sent.`;
      this.upgradeFormMessageType = "error";
      this.loading = false;
    },
    // async deleteAccount() {

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
    async generateClientCredential() {
      const client_name = randomWords({ exactly: 2, join: '' })
      this.loading = true;
      const response = await Api.post(`/claim/${client_name}`, {});
      if (response.status !== 201) {
        this.errorMessage = `${response.status}: Something went wrong. Couldn't generate new credentials.`;
        this.errorMessageType = "error";
        this.loading = false;
        return;
      }
      const data = await response.json()
      console.log(data)
      this.errorMessage = "New Credentials generated!";
      this.errorMessageType = "success";
      this.loading = false;
      this.$forceUpdate()
    },
  },
};
</script>

<style lang="scss">
.profile {
  &-picture {
    border: 1px solid color("secondary");
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  &-plan-information {
    width: 100%;
    @media (min-width: $breakpoint-lg) {
      width: auto;
    }
  }
  &-edit-icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  &-container {
    padding: spacers("md");

    @media (min-width: $breakpoint-lg) {
      padding: spacers("xl");
    }
  }
}
.swiper-slide {
  &-avatar {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .swiper-wrapper {
    padding-bottom: spacers("sm");
  }
}
.user-slider {
  border: 1px solid color("secondary");
}
.custom-swiper-button {
  position: relative;
  border-radius: radius("sm");
  padding: 0 padding("xs");
  background: color("dark-60");
  color: color(light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s linear;
  border: 1px solid color("dark");

  &:hover {
    border: 1px solid color("secondary");
    color: color("secondary");
  }

  &:disabled {
    color: color("light-20");
    background: none;
    border: 1px solid color("light-20");
    display: none;
  }
}
.edit-mode-btn {
  border: none;
  background: none;
  border-radius: 50%;
  transition: 0.2s linear;
  height: 40px;
  width: 40px;

  &.close {
    svg {
      width: 30px;
    }
    &:hover {
      background: color("light-20");
    }
  }
  &.delete {
    svg {
      width: 30px;
    }
    &:hover {
      background: color("danger");
    }
  }
  &:hover {
    background: color("primary");
  }
}
.inline-custom-form {
  &-btn {
    border-radius: 50%;
    background: none;
    border: 1px solid color("primary");
    height: 40px;
    width: 40px;
    display: flex;
    margin-left: 10px;
    align-items: center;
    justify-content: center;
    svg {
      width: 35px;
    }
  }
  label {
    top: -10px !important;
  }
  input {
    margin-top: 0 !important;
  }
}
</style>
