export default {
  name: 'vue-root-modal',
  data () {
    return {
      modals: this.$modals.$openedModals,
    }
  },
  beforeCreate () {
    this.$options.components = this.$modals.$components
  },
  methods: {
    zIndex (modal) {
      return {
        'z-index': modal.modalID,
      }
    },

    closeModal (modal) {
      if (modal.disableClose) {
        return
      }

      if (modal.resolveOnClose) {
        modal.resolve()
      }

      if (modal.rejectOnClose) {
        modal.reject()
      }

      this.$modals.close(modal.modalID)
    },
  },
}
