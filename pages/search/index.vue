<template>
  <div>
    <div class="d-flex mt-4 mb-4">
      <v-text-field v-model="keyword" label="Movie name"></v-text-field>
      <v-icon
        class="icon-size"
        :class="{ isShowIcon: show }"
        @click="keyword = ''"
        >fas fa-times</v-icon
      >
    </div>
    <p class="uppercase font-medium text-2xl text-yellow-500">Danh sách phim</p>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col
          v-for="movie of movies"
          :key="movie.id"
          :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'"
        >
          <v-img
            :src="movie.imagelink"
            max-height="100%"
            max-width="100%"
            contain
          ></v-img>
          <h3 class="mt-4 text-lg hover-under-line">{{ movie.movienamevn }}</h3>
          <h3 class="hover-under-line">{{ movie.moviename }}</h3>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'search',
  data() {
    return {
      keyword: '',
      show: false,
      movies: [],
      page: 1,  
    }
  },
  watch: {
    /**
     * Lắng nghe sự thay đổi của keywword
     * Author: DTSang(17/10)
     */
    keyword() {
      if (this.keyword === '') {
        this.show = false
      } else {
        this.show = true
      }
      axios
        .get(`${process.env.baseUrl}/findmovie?key=${this.keyword}`)
        .then((response) => {
          this.movies = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.icon-size {
  font-size: 1rem;
  display: none;
}
.isShowIcon {
  display: inline-block;
}
</style>
