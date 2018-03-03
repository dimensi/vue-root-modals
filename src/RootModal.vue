<template>
  <div class="vue-root-modal" v-if="modals.length">
    <div class="vue-root-modal__wrapper" :style="zIndex(modal)" v-for="modal in modals" :key="modal.modalID" @click.self="closeModal(modal)">
      <div class="vue-root-modal__body">
        <button class="vue-root-modal__close" @click="closeModal(modal.modalID)" v-if="!modal.disableClose">
          X
        </button>

        <component :is="modal.typeModal" v-bind="modal"></component>
      </div>
    </div>
  </div>
</template>

<script>
import rootModalMixin from "./RootModalMixin";
export default rootModalMixin;
</script>

<style lang="stylus">
.vue-root-modal
  position fixed
  top 0
  left 0
  z-index 100
  overflow auto
  width 100%
  height 100%
  background-color rgba(black, 0.5)

  &__wrapper
    position absolute
    top 0
    left 0
    display flex
    justify-content center
    align-items center
    padding 25px
    min-height 100%
    width 100%

  &__body
    position relative

  &__close
    position absolute
    top 10px
    right 10px
    z-index 1
    padding 0
    outline none
    border none
    background transparent
    color black
    cursor pointer
</style>

