export default {
  name: "vue-modals-root-modal",
  data() {
    return {
      modals: this.$modals.$openedModals
    };
  },
  beforeCreate() {
    this.$options.components = this.$modals.$components;
  },
  methods: {
    zIndex(modal) {
      return {
        "z-index": modal.modalID
      };
    },

    closeModal(modal) {
      if (modal.disableClose) {
        return;
      }

      if (modal.notifyOnClose) {
        modal.resolve();
      }

      this.$modals.close(modal.modalID);
    }
  }
};