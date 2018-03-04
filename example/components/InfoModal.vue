<template>
  <article class="modal">
    <h1 class="modal__title">Title</h1>
    <div class="modal__content">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem nisi omnis, aspernatur numquam temporibus ullam laborum, in maxime cum dignissimos, culpa eaque? Consectetur dolorum accusamus tempora tenetur laboriosam distinctio eveniet?</div>
    <div class="modal__controls">
      <button
        @click="closeModal('resolve', resolveMessage)"
        class="modal__button modal__button--resolve">Resolve</button>
      <button
        @click="closeModal('reject', rejectMessage)"
        class="modal__button modal__button--reject">Reject</button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'modal',
  props: {
    modalID: Number,
    resolve: Function,
    reject: Function,
    resolveMessage: String,
    rejectMessage: String,
  },
  methods: {
    closeModal (typeClose, text) {
      if (typeClose === 'reject') {
        this.reject(text)
      }

      if (typeClose === 'resolve') {
        this.resolve(text)
      }

      this.$modals.close(this.modalID)
    },
  },
}
</script>

<style>
.modal {
  display: block;
  background-color: white;
  color: black;
  max-width: 200px;
  padding: 10px;
}

.modal__title {
  margin: 0 0 10px;
  font-size: 20px;
  width: 100%;
  border-bottom: 1px solid black;
}

.modal__content {
  font-size: 14px;
  padding: 10px;
}

.modal__controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.modal__button {
  padding: 10px;
  border: none;
}

.modal__button--resolve {
  background: lightgreen;
}

.modal__button--reject {
  background: red;
  color: white;
}
</style>
