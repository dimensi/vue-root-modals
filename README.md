# vue-root-modals
A handy promise-based library for modal windows.

## Demo
[![Edit Vue Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/23774mk51j)

## Install

Via Yarn:
```
yarn add vue-root-modals
```

Via NPM:
```
npm i vue-root-modals
```

## Quick start
vue-root-modals doesn't offer ready-to-use modals, but it allows you easily create your own.

Let's start with `SimpleModal.vue`:

```html
<template>
  <article class="modal">
    {{ text }}
  </article>
</template>

<script>
export default {
  name: "modal",
  props: {
    modalID: Number,
    resolve: Function,
    reject: Function,
    text: String,
  }
};
</script>

<style>
.modal {
  display: block;
  background-color: white;
  color: black;
  max-width: 200px;
  padding: 10px;
}
</style>
```

The next step is to create a file which holds all your modals. For example, `modals.js`:
  
```js
import RootModals from "vue-root-modals";
import SimpleModal from "./SimpleModal.vue";

// Create new instance and pass there our modal
const rootModals = new RootModals({
  SimpleModal
});

export default rootModals;
```

Then we should import `modals.js` inside `main.js` and pass `RootModals` object to `Vue.use()` method. Also you should register the library in `components`:

```js
import { RootModal } from 'vue-root-modals';
import modals from './modals.js'
Vue.use(modals)

new Vue({
  components: {
    RootModal
  },
  template: `
    <div id="app">
      <root-modal></root-modal>
      <button @click="$modals.SimpleModal">Open Modal</button>
    </div>
  `
})
```

That's all. You can call modals from anywhere with simple `this.$modals.SimpleModal({ options })` now. All modals generate methods based on object key name you have passed to `new RootModals({...})` and then they are in `$modals`.

All `options` are passed to modal as props. Also there are properties `resolve`, `reject` & `modalID`. Thanks to this you can work with modals using promises:

```js
const methods = {
  async openModal() {
    try {
      const response = await this.$modals.SimpleModal();
    } catch (err) {
      console.log(err);
    }
  }
}
```
