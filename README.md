# Vue root modals
Это удобный менеджер модалок на promise.

# Demo
[![Edit Vue Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/23774mk51j)
# Установка
`yarn add vue-root-modals` или `npm i -d vue-root-modals`

# Быстрый старт
Vue root modals не предоставляет готовых модалок, он просто позволяет их удобно вызывать и работать с ними.
Создадим простую модалку `SimpleModal.vue`

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

Дальше создадим файл в котором будем хранить нужные модалки, например modals.js.  
```js
import RootModals from "vue-root-modals"; // импортируем библиотеку
import SimpleModal from "./SimpleModal.vue"; // импортируем нашу модалку

const rootModals = new RootModals({
  SimpleModal // Создаем новый инстанс и передаем в него модалку
});

export default rootModals; // Экспортируем созданный инстанс
```

Дальше импортируем созданный нами modals.js в main.js и вызываем на нем Vue.use()
```js
import modals from './modals.js'
Vue.use(modals)

new Vue({
  ...
})
```

Дальше импортируем компонент RootModal из библиотеки и определяем его в корне приложения
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

Все, теперь можно вызывать модалку из любого места с помощь `this.$modals.SimpleModal({ options })`.
Все добавленные модалки генерируют метод из ключа который передали в обьект при инициализации `new RootModals()` и добавляются в $modals.

Все `options` попадают как пропсы в модалку. Так же в модалку попадает resolve, reject, modalID свойства. Благодаря этому с модалками можно работать через промисы.
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
