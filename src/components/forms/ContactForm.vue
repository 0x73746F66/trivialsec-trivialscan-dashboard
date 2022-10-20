<template>
  <loadingComponent class="loading" :class="{ inactive: !loading }" />

  <form class="contact-form" @submit.prevent="sendSupport">
    <ValidationMessage :message="message" :type="messageType" />
    <div class="subject-field">
      <TextInput
        placeholder=""
        id="subject-field"
        label="Subject"
        :required="true"
        :textDefault="SubjectFieldDefault"
        @change="handleSubject"
      />
    </div>

    <div class="text-area-field">
      <TextArea
        placeholder=""
        id="text-area-field"
        label="Message"
        :required="true"
        :textDefault="TextAreaFieldDefault"
        @change="handleContent"
      />
    </div>
    <div class="d-flex justify-content-end">
      <Button
        class="btn-outline-primary mr-0 ml-auto font-sm font-color-primary padding-xs"
        text="Submit"
        @click="submit"
      />
    </div>
  </form>
</template>
<script>
import TextInput from "../inputs/TextInput.vue";
import TextArea from "../inputs/TextArea.vue";
import Button from "../general/Button.vue";
import loadingComponent from "../general/loadingComponent.vue";
import ValidationMessage from "../general/ValidationMessage.vue";

export default {
  components: {
    TextInput,
    TextArea,
    Button,
    ValidationMessage,
    loadingComponent,
  },
  props: {
    SubjectFieldDefault: String,
    TextAreaFieldDefault: String,
  },
  data() {
    return {
      subjectField: "",
      contentField: "",
      message: "",
      messageType: "",
      loading: false,
    };
  },
  methods: {
    handleSubject(v) {
      this.subjectField = v.target.value;
    },
    handleContent(v) {
      this.contentField = v.target.value;
    },
    async sendSupport() {
      this.loading = true;
      const response = await Api.post("/support", {
        subject: this.subjectField,
        message: this.contentField,
      }).catch((error) => {
        this.message = `Something went wrong, please try again later. Server responded with: ${error}`;
        this.messageType = "error";
        this.loading = false;
      });
      if (response.status === 202) {
        this.message = "Your message was sent. Thank you!";
        this.messageType = "success";
        this.loading = false;
        return;
      }
      this.message = `Something went wrong, please try again later.`;
      this.messageType = "error";
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/forms";

.text-area-field {
  min-height: 250px;
}
</style>
