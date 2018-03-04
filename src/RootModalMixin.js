
/**
 * @typedef {Object.<string,any>} modal
 * @prop {string} typeModal - key of modal
 * @prop {number} [modalId] - id of modal
 * @prop {function} resolve - resolve func from promise
 * @prop {function} reject - reject func from promise
 */
export default {
  name: 'vue-root-modal',
  data () {
    return {
      /**
       * link on all opened modals
       */
      modals: this.$modals.$openedModals,
    }
  },
  /**
   * Add all components from VueRootModals on beforeCreate
   * @returns {void}
   */
  beforeCreate () {
    this.$options.components = this.$modals.$components
  },
  methods: {
    /**
     * Return style object for modal
     *
     * @param {modal} modal
     */
    zIndex (modal) {
      return {
        'z-index': modal.modalID,
      }
    },

    /**
     * Close modal by modal.modalID
     *
     * @param {modal} modal
     * @returns {void}
     */
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
