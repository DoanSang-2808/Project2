<template>
  <div>
    <div
      class="w-full bg-img relative"
      style="background-image:url('https://mybucketshine.s3.ap-south-1.amazonaws.com/12years-a-slave-Background.jpg');"
    >
        <v-overlay absolute="absolute" class="w-full h-full"></v-overlay>
        <div class="absolute top-2/4 h-80 w-full z-50 pl-12 pr-12">
            <v-container>
                <v-row>
                    <v-col cols='4'>aaaaaa</v-col>
                    <v-col cols='8'>aaaaaa</v-col>
                </v-row>
            </v-container>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'type-movie-id',
}
</script>

<style scoped>
.bg-img {
    height: 500px;
    background-size: cover ;
}
</style>