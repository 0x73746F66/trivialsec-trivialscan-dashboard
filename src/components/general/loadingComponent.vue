<template>
  <div class="">
    <div class="loading-component-div">
      <span class="loading-component font-base-b font-color-light">
        {{innerMessage}}
      </span>
      <span 
        class="font-color-light text-center loading-message"
        :class="{'message-show': messageShow }"
        >{{message}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean,
  },
  data() {
    return {
      innerMessage: "Loading...",
      message: "Please stay on this page until loading is finished.",
      messageShow: false,
      timer: 1000
    }
  },
  methods: {
    showMessage() {
      setTimeout(() => this.messageShow = true, this.timer);
      setTimeout(() => this.messageShow = false, this.timer * 5);
      setTimeout(() => this.message = "It seems we're dealing with a large data package, please wait a little longer.", this.timer * 5.1);
      
      setTimeout(() => this.messageShow = true, this.timer * 5.15);
      setTimeout(() => this.messageShow = false, this.timer * 10);
      setTimeout(() => this.message = "Sorry for the wait, we'll be finished soon!", this.timer * 10.1);
      
      setTimeout(() => this.messageShow = true, this.timer * 10.15);
      setTimeout(() => this.messageShow = false, this.timer * 15);
    },
  },
  mounted(){
    this.showMessage();
  }
};
</script>
<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: color("dark-60");
  z-index: 1000000;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  &-message {
    opacity: 0;
    margin-top: 100px;
  }
  &.inactive {
    display: none;
  }

  &-component {
    background: color("primary");
    padding: spacers("md");
    border-radius: 50%;
    height: 150px;
    min-width: auto;
    width: 150px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    
    &-div {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      .message-show {
        animation: showMessage 1s forwards;
      }
      .message-hidden {
        animation: hideMessage 1s forwards;
      }
    }

    &:after {
      content: "";
      position: absolute;
      background: color("secondary-40");
      z-index: -1;
      animation-name: pulse;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      border-radius: 50%;
    }
    &:before {
      content: "";
      position: absolute;
      background: color("secondary-20");
      z-index: -1;
      border-radius: 50%;
      animation-name: pulse;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }
  }
  @keyframes showMessage {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes hideMessage {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes pulse {
    0% {
      width: 0;
      height: 0;
    }
    50% {
      width: 300px;
      height: 300px;
    }
    100% {
      width: 0;
      height: 0;
    }
  }
}
</style>
