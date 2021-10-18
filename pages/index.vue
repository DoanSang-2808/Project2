<template>
  <v-overlay absolute="absolute" >
    <div class="homepage d-flex justify-center align-center">
      <div class="d-flex-inline justify-center align-center">
        <h1><b>Các bộ phim lẻ mới nhất, được cập nhật liên tục</b></h1>
        <h3 class="d-flex justify-center align-center">Xem ở mọi nơi. Hủy bất kì lúc nào !</h3>
        <h6 class="d-flex justify-center align-center">Bạn đã sẵn sàng chưa ?</h6>
      </div>
    </div>
  </v-overlay>
</template>

<script>
  export default {
    middleware: 'index'
  }
</script>
<style scoped>
.homepage {
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 1;
}
h1 {
  font-size: 40px;
}
h3 {
  font-size: 30px;
}
h6 {
  font-size: 20px;
}
</style>

