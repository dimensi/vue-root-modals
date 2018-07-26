import ModalMixin from './RootModalMixin'
import ModalComponent from './RootModal.vue'

/**
 * VueRootModals
 * @class VueRootModals
 */
class VueRootModals {
  /**
   * Creates an instance of VueRootModals.
   * @param {Vue[]} components
   * @memberof VueRootModals
   */
  constructor (components) {
    this.registedComponents = components
    this.modals = []
  }
  /**
   * @typedef {Object.<string,any>} options
   * @prop {string} typeModal - key of modal
   * @prop {number} [modalId] - id of modal
   * @prop {function} resolve - resolve func from promise
   * @prop {function} reject - reject func from promise
   */

  /**
   * Push object with options for create modal
   *
   * @param {options} options
   * @memberof VueRootModals
   * @returns {void}
   */
  openModal (options) {
    options.modalID = this.modals.length + 1
    this.modals.push(options)
  }
  /**
   * Remove modal by id from array modals or clear arr modals from all modals
   *
   * @param {number} [modalID]
   * @memberof VueRootModals
   * @returns {void}
   */
  closeModal (modalID) {
    if (modalID === undefined) {
      this.modals.splice(0, this.modals.length)
      return
    }
    
    const index = this.modals.findIndex(modal => modal.modalID === modalID);
    if (index === -1) return
    this.modals.splice(
      index,
      1,
    )
  }

  install (Vue) {
    Vue.prototype.$modals = {
      close: (modalID) => {
        this.closeModal(modalID)
      },
      $components: this.registedComponents,
      $openedModals: this.modals,
    }

    Object.keys(this.registedComponents).forEach((key) => {
      const execModal = (options) => {
        let resolve
        let reject

        // eslint-disable-next-line
        const promise = new Promise((resolveFromPromise, rejectFromPromise) => { 
          resolve = resolveFromPromise
          reject = rejectFromPromise
        })

        const config = /** @type {options} */ ({
          ...options,
          resolve,
          reject,
          typeModal: key,
        })

        this.openModal(config)

        return promise
      }

      Vue.prototype.$modals[key] = execModal
      this[key] = execModal
    })
  }
}

export const RootModal = ModalComponent
export const RootModalMixin = ModalMixin
export default VueRootModals
