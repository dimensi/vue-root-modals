import { createLocalVue, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import VueRootModals from '../src/index'
import RootModal from '../src/RootModal.vue'
import InfoModal from '../example/components/InfoModal.vue'
import flushPromises from 'flush-promises'

const createMount = (opts) => {
  const localVue = createLocalVue()
  const modals = new VueRootModals({
    InfoModal,
  })

  localVue.use(modals)

  return mount(RootModal, {
    localVue,
    ...opts,
  })
}

const testClosing = async (el) => {
  const wrapper = createMount()
  wrapper.vm.$modals.InfoModal({
    rejectMessage: 'Modal rejected',
    resolveMessage: 'Modal resolved',
  })
  await flushPromises()
  const modalWrapper = wrapper.find(el)
  expect(wrapper.vm.modals.length).toBe(1)
  modalWrapper.trigger('click')
  expect(wrapper.vm.modals.length).toBe(0)
}

describe('RootModal Component', () => {
  test('is a Vue instance', () => {
    const wrapper = createMount()
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('Has $modals method', () => {
    const wrapper = createMount()
    expect(wrapper.vm.$modals).toBeTruthy()
  })

  test('Has InfoModal method', () => {
    const wrapper = createMount()
    expect(wrapper.vm.$modals.InfoModal).toBeTruthy()
  })

  test('Has provided components', () => {
    const wrapper = createMount()
    expect(wrapper.vm.$options.components.InfoModal).toBeTruthy()
  })

  test('Has provided modals arr, must be empty', () => {
    const wrapper = createMount()
    expect(wrapper.vm.modals.length).toBeFalsy()
  })

  test('Call InfoModals and render modal', async () => {
    const wrapper = createMount()
    wrapper.vm.$modals.InfoModal()
    expect(wrapper.vm.modals.length).toBe(1)
    expect(wrapper.vm.modals[0]).toMatchObject({
      modalID: 1,
      typeModal: 'InfoModal',
    })
    await flushPromises()
    const findedModal = wrapper.find(InfoModal)
    expect(findedModal.is(InfoModal)).toBe(true)
  })

  test('Matches snapshot', async () => {
    const renderer = createRenderer()
    const wrapper = createMount()
    wrapper.vm.$modals.InfoModal()
    expect(wrapper.vm.modals.length).toBe(1)
    expect(wrapper.vm.modals[0]).toMatchObject({
      modalID: 1,
      typeModal: 'InfoModal',
    })
    await flushPromises()
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  test('Testing closing modal by wrapper', () => {
    return testClosing('.vue-root-modal__wrapper')
  })

  test('Testing closing modal by button', () => {
    return testClosing('.vue-root-modal__close')
  })

  test('Testing closing modal by self modal', async () => {
    await testClosing('.modal__button--resolve')
  })

  test('Test to close all modals by $modals.close() method', async () => {
    const wrapper = createMount()
    expect(wrapper.vm.modals.length).toBe(0)
    for (let x = 0; x < 10; x++) {
      wrapper.vm.$modals.InfoModal()
    }
    expect(wrapper.vm.modals.length).toBe(10)
    wrapper.vm.$modals.close()
    await wrapper.vm.$nextTick()
    expect(wrapper.isEmpty()).toBe(true)
    expect(wrapper.vm.modals.length).toBe(0)
  })

  test('Testing resolving modals', async () => {
    const wrapper = createMount()
    const response = wrapper.vm.$modals.InfoModal({
      resolveMessage: 'Modal resolved',
    })
    await wrapper.vm.$nextTick()
    const button = wrapper.find('.modal__button--resolve')
    button.trigger('click')
    expect(response).resolves.toBe('Modal resolved')
  })

  test('Testing rejecting modals', async () => {
    const wrapper = createMount()
    const response = wrapper.vm.$modals.InfoModal({
      rejectMessage: 'Modal rejected',
    })
    await wrapper.vm.$nextTick()
    const button = wrapper.find('.modal__button--reject')
    button.trigger('click')
    expect(response).rejects.toBe('Modal rejected')
  })

  test('Test style z-index', async () => {
    const wrapper = createMount()
    for (let x = 0; x < 10; x++) {
      wrapper.vm.$modals.InfoModal()
    }
    await wrapper.vm.$nextTick()
    const modals = wrapper.findAll('.vue-root-modal__wrapper')
    modals.wrappers.forEach((wrapper, index) => {
      expect(wrapper.attributes().style).toBe(`z-index: ${index + 1};`)
    })
  })
})
