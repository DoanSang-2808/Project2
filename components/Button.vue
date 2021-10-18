<template>
  <v-btn
    class="red darken-3"
    type="button"
    @click="
      btnOnclick
    "
  >
    {{ text }}
  </v-btn>
</template>
<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  methods: {
      /**
       * Sự kiện click vào button
       * Autho: DTSang(15/10)
       */
      btnOnclick() {
          this.$emit("btnOnclick")
      }
  }
}
</script>