import ModalMixin from './RootModalMixin'
import ModalComponent from './RootModal.vue'

class VueRootModals {
  constructor (components) {
    this.registedComponents = components
    this.modals = []
  }

  openModal (options) {
    options.modalID = this.modals.length + 1
    this.modals.push(options)
  }

  closeModal (modalID) {
    if (modalID === undefined) {
      this.modals.splice(0, this.modals.length)
      return
    }

    this.modals.splice(
      this.modals.findIndex(modal => modal.modalID === modalID),
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

        const config = {
          ...options,
          resolve,
          reject,
          typeModal: key,
        }

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
