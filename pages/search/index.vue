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
            @click="clickDetailMovie(movie._id)"
          ></v-img>
          <h3 class="mt-4 text-lg hover-under-line" @click="clickDetailMovie(movie._id)">{{ movie.movienamevn }}</h3>
          <h3 class="hover-under-line" @click="clickDetailMovie(movie._id)">{{ movie.moviename }}</h3>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination v-model="pageIndex" :length="totalPage"></v-pagination>
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
      pageIndex: 1,  
      totalPage: 0,
    }
  },
  watch: {
    /**
     * Lắng nghe sự thay đổi của keywword
     * Author: DTSang(17/10)
     */
    keyword() {
      if (this.keyword === '') {
        this.show = false;
      } else {
        this.show = true;
      }
      const self = this;
      axios
        .get(`${process.env.baseUrl}/searchmovie`, {
          params: {
            pageIndex: self.pageIndex,
            pageSize: 8,
            key: self.keyword,
          },
        })
        .then((response) => {
          this.movies = response.data.movies;
          self.totalPage = response.data.totalPage;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /**
     * Hàm lắng nghe pageIndex thay đổi
     * Author: DTSang(25/10)
     */
    pageIndex() {
      const self = this;
      axios
        .get(`${process.env.baseUrl}/searchmovie`, {
          params: {
            pageIndex: self.pageIndex,
            pageSize: 8,
            key: self.keyword,
          },
        })
        .then((response) => {
          this.movies = response.data.movies;
          self.totalPage = response.data.totalPage;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
  methods: {
    /**
     * Hàm bắt sự kiện khi click xem detail phim
     * Author: DTSang(19/10)
     */
    clickDetailMovie(idmovie) {
      this.$router.push({ path: `/type/movies/${idmovie}`, params: { id: idmovie } });
    }
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
