/* eslint-env jest */
import { createLocalVue, mount } from '@vue/test-utils'
import VueRootModals from '../src/index'

const createMount = () => {
  const localVue = createLocalVue()
  localVue.use(new VueRootModals({
    ComponentFoo: {
      name: 'component-foo',
      template: '<div>Hello foo</div>',
    },
    ComponentBar: {
      name: 'component-bar',
      template: '<div>Hello bar</div>',
    },
  }))

  return mount({
    template: '<div>Hello world</div>',
  }, {
    localVue,
  })
}

describe('VueRootModals', () => {
  test('Test install function', () => {
    const wrapper = createMount()
    expect(wrapper.vm.$modals).toBeTruthy()
    expect(Object.keys(wrapper.vm.$modals.$components).length).toBe(2)
    expect(wrapper.vm.$modals.close).toBeTruthy()
    expect(wrapper.vm.$modals.ComponentFoo).toBeTruthy()
    expect(wrapper.vm.$modals.ComponentBar).toBeTruthy()
    wrapper.vm.$modals.ComponentFoo()
    expect(wrapper.vm.$modals.$openedModals[0]).toMatchObject({
      typeModal: 'ComponentFoo',
      modalID: 1,
    })
  })

  test('Test on returning promise from modal', () => {
    const wrapper = createMount()
    const response = wrapper.vm.$modals.ComponentBar()
    expect(response).toBeInstanceOf(Promise)
  })

  test('Test openModal method', () => {
    const modals = new VueRootModals()
    modals.openModal({
      typeModal: 'ComponentFoo',
    })
    expect(modals.modals.length).toBe(1)
  })

  test('Test closeModal method', () => {
    const modals = new VueRootModals()
    modals.openModal({
      typeModal: 'ComponentFoo',
    })
    expect(modals.modals.length).toBe(1)
    modals.closeModal(1)
    expect(modals.modals.length).toBe(0)
    for (let x = 0; x < 10; x++) {
      modals.openModal({
        typeModal: 'ComponentFoo',
      })
    }
    expect(modals.modals.length).toBe(10)
    modals.closeModal()
    expect(modals.modals.length).toBe(0)
  })
})
