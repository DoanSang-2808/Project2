<template>
  <div class="w-full" style="width: 100%">
    <div class="new-movie mt-8">
      <p class="uppercase font-medium text-2xl text-yellow-500">
        Phim mới cập nhật
      </p>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col
            v-for="movie of sortMovies"
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
            <h3
              class="mt-4 text-lg hover-under-line"
              @click="clickDetailMovie(movie._id)"
            >
              {{ movie.movienamevn }}
            </h3>
            <h3 class="hover-under-line" @click="clickDetailMovie(movie._id)">
              {{ movie.moviename }}
            </h3>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="odd-movie mt-8">
      <div class="d-flex justify-space-between">
        <p class="uppercase font-medium text-2xl text-yellow-500">Phim lẻ</p>
        <p
          class="hover-under-line"
          @click="$router.push({ path: '/type/movies' })"
        >
          Xem tất cả
        </p>
      </div>
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
            <h3
              class="mt-4 text-lg hover-under-line"
              @click="clickDetailMovie(movie._id)"
            >
              {{ movie.movienamevn }}
            </h3>
            <h3 class="hover-under-line" @click="clickDetailMovie(movie._id)">
              {{ movie.moviename }}
            </h3>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'home',
  async asyncData() {
    const movies = await axios.get(`${process.env.baseUrl}/filter`, {
      params: {
        pageIndex: 1,
        pageSize: 8,
      },
    })
    const sortByDate = await axios.get(`${process.env.baseUrl}/sortmovie`)
    return {
      movies: movies.data.movies,
      sortMovies: sortByDate.data,
    }
  },
  data: () => ({
  }),
  methods: {
    /**
     * Hàm bắt sự kiện khi click vào xem detail phim
     * Author: DTSang(19/10)
     */
    clickDetailMovie(idmovie) {
      this.$router.push({
        path: `type/movies/${idmovie}`,
        params: { id: idmovie },
      })
    },
  },
}
</script>

<style scoped>
.hover-under-line:hover {
  text-decoration-line: underline;
  color: #3b82f6;
  cursor: pointer;
}
</style>