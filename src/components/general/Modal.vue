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
  >
    <div
      class="modal-dialog modal-dialog-centered border-radius-sm"
      role="document"
    >
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
<script>
export default {
  props: {
    id: String,
    label: String,
  },
};
</script>
<style lang="scss">
.modal-content {
  background-color: #000000;
}
.modal-loading {
  position: absolute!important;  
} 
</style>
