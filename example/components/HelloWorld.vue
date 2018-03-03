<template>
  <div>
    <button @click="callModal">Open modal</button>
    <div class="response" v-if="response" v-text="response"/>
    <div class="error" v-if="error" v-text="error"/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      response: null,
      error: null,
    }
  },
  methods: {
    async callModal () {
      this.response = null
      this.error = null
      try {
        this.response = await this.$modals.InfoModal()
      } catch (err) {
        this.error = err
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.response {
  color: green;
  padding: 10px;
}

.error {
  color: red;
  padding: 10px;
}
</style>
