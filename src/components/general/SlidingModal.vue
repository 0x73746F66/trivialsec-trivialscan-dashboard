<template>
  <div
    class="modal modal-custom fade"
    :id="`${id}`"
    tabindex="-1"
    :aria-labelledby="id"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
  },
};
</script>
<style lang="scss">
.modal-custom.show {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  @media (max-width: breakpoints("lg")) {
    position: fixed;
  }

  .modal-dialog {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: none;
    margin: 0;

    .modal-content {
      height: 100%;
      overflow: auto;
      background-color: #000000;

      &::-webkit-scrollbar {
        width: 0.4em;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px color("primary-20");
      }

      &::-webkit-scrollbar-thumb {
        background-color: color("primary");
        outline: 1px solid color("primary");
      }
    }

    .modal-header {
      .btn-close {
        transform: rotate(180deg);
        height: auto;
        width: auto;
      }
    }
  }
}

.modal-custom.fade.show {
  background: color("dark-40");

  &.modal-dialog {
    transition: transform 0.3s ease-out;
    opacity: 1;
    transform: translate(0, 0) !important;
  }
}

.modal-custom.fade:not(.show) {
  .modal-dialog {
    opacity: 1;
    transform: translate(200%, 0) !important;
  }
}
</style>
