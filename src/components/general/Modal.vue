<template lang="">
  <slot
    name="button"
    type="button"
    data--bs--toggle="modal"
    :data--bs--target="`#` + id"
  >
  </slot>

  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    role="dialog"
    :aria-labelledby="label"
    aria-hidden="true"
    :data-bs-backdrop="backdrop"
    :data-bs-keyboard="keyboard"
  >
    <div :class="dialogClasses" role="document">
      <div class="modal-content">
        <div class="modal-header border-0">
          <slot name="modalTitle" :id="label"> </slot>
          <button
            type="button"
            class="btn-fill-primary-sm font-color-light border-0 padding-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="modalContent" :id="label"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Modal } from "bootstrap";
</script>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    dialogClass: {
      type: String,
      default: "",
    },
    backdrop: {
      type: Boolean,
      default: true,
    },
    keyboard: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    dialogClasses() {
      return `${this.dialogClass} modal-dialog modal-dialog-centered border-radius-sm`;
    },
  },
};
</script>
<style lang="scss">
.modal-content {
  background-color: #000 !important;
}
.modal-loading {
  position: absolute !important;
}
</style>
