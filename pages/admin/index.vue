<template>
  <div class="d-flex w-full h-full">
    <div class="nav-bar h-full w-1/5">
      <div class="d-flex w-full h-11 align-center nav-item">
        <div class="w-1 h-full"></div>
        <v-icon class="ml-6 mr-4">fas fa-th</v-icon>
        <p class="mb-0">Trang chủ</p>
      </div>
      <div class="d-flex w-full h-11 align-center active nav-item">
        <div class="w-1 h-full"></div>
        <v-icon class="ml-6 mr-4">fas fa-film</v-icon>
        <p class="mb-0">Movie</p>
      </div>
    </div>
    <div class="main w-4/5 pl-3">
      <div class="pt-4 right-0 main-add d-flex flex-row-reverse">
        <Button text='Thêm phim mới' />
      </div>
      <div class="bg-gray-600 main-table pt-4 p-2 pr-2">
        <div class="d-flex justify-space-between mb-4">
          <div class="input d-flex border pl-2 rounded">
            <!-- <v-icon class="font-extralight">fal fa-search</v-icon> -->
            <input type="text" placeholder="Nhập tên phim" >
          </div>
          <div class="border p-1">
            <v-icon>fas fa-sync</v-icon>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
// import Button from '../../components/Button.vue'
export default {
  // components: {Button},
  middleware: 'home',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style scoped>
.nav-bar {
  border-right: 1px solid #fff;
}
.active div {
  background-color: green;
}
.active {
  background-color: rgb(70, 70, 70);
}
.nav-item:hover {
  background-color: rgb(109, 108, 108);
}
.main-add {
  height: 10%;
}
.main-table {
  height:90%;
}
</style>