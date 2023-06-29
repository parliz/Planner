<template>
  <b-modal v-model="isModalShown" has-modal-card :destroy-on-hide="false" aria-modal class="modal" :can-cancel="closable" :full-screen="isMobile()" @close="closeBtnPress">
    <div
      class="modal-card modalContent is-flex is-flex-direction-column is-align-items-center"
      :style="{ width: computedWidth, height: isMobile() ? '100%' : height }"
    >
      <div class="popup-header">
        <b-button v-if="closable" type="is-light is-ghost" size="is-small" class="closeButton customButton" icon-left="close" @click="closeBtnPress" />
      </div>
      <slot />
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    closable: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "20rem"
    },
    height: {
      type: String,
      default: "40rem"
    },
    emitNameOnCloseEvent: {
      type: String,
      default: ""
    }
  },
  methods: {
    open() {
      this.isModalShown = true;
    },
    close() {
      this.isModalShown = false;
    },
    closeBtnPress() {
      this.isModalShown = false;
      if (this.emitNameOnCloseEvent) {
        this.$emit(this.emitNameOnCloseEvent);
      }
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    computedWidth() {
      return this.isMobile() ? '100% !important' : `${this.width}!important`
    }
  },
  data() {
    return {
      isModalShown: false
    };
  }
};
</script>

<style lang="scss">
.modal {
  height: 100%;
  z-index: 2000 !important;
  
  .modal-close {
    display: none;
  }
}
.modal-background {
  background-color: #ffffff90 !important;
}
.modal > .animation-content > button::before,
.modal > .animation-content > button::after {
  background-color: black !important;
}
.modal {
  position: fixed !important;
  overflow: auto !important;
  .modal-background {
    position: fixed !important;
  }
  .modal-content {
    overflow: visible !important;
  }
  .modal-card {
    overflow: visible !important;
    padding: 1rem;
  }
  .modal-card-body {
    overflow: visible !important;
  }
}
.modal .animation-content {
  z-index: 6000;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.modalContent {
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  width: auto !important;
  border-radius: 0.5rem;
}
.closeButton {
  position: absolute !important;
  right: 0;
  top: 0;
  border-radius: 8px !important;
  background-color: transparent;
  z-index: 3000;

  svg {
    height: 1rem;
  }
}
</style>
