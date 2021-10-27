<template>
  <div>
    <v-btn class="red darken-3 show" type="button" @click="btnOnclick">
      {{ text }}
    </v-btn>
    <v-btn class="red darken-3 hidden" type="button" @click="btnOnclick">
      <v-icon>{{ textIcon }}</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: '',
    },
    textIcon: {
      type: String,
      default: '',
    },
  },
  methods: {
    /**
     * Sự kiện click vào button
     * Autho: DTSang(15/10)
     */
    btnOnclick() {
      this.$emit('btnOnclick')
    },
  },
}
</script>

<style scoped>
.hidden {
  display: none;
}
@media only screen and (max-width: 450px) {
  .hidden {
    display: block;
  }
  .show {
    display: none;
  }
}
</style>