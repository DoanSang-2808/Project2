<template>
  <div class="w-full" style="width: 100%">
    <div class="bg-gray-900 w-full rounded">
      <v-container>
        <v-row>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <p>Thể loại</p>
            <v-hover>
              <v-autocomplete
                v-model="typeMovie"
                :items="typeMovies"
                dense
                filled
              ></v-autocomplete>
            </v-hover>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <p>Quốc gia</p>
            <v-hover>
              <v-autocomplete
                v-model="nationalMovie"
                :items="nationalMovies"
                dense
                filled
              ></v-autocomplete>
            </v-hover>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <p>Năm</p>
            <v-hover>
              <v-autocomplete
                v-model="year"
                :items="years"
                dense
                filled
              ></v-autocomplete>
            </v-hover>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <p>Sắp xếp</p>
            <v-hover>
              <v-autocomplete
                v-model="sort"
                :items="sorts"
                dense
                filled
              ></v-autocomplete>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="new-movie mt-8">
      <p class="uppercase font-medium text-2xl text-yellow-500">
        Phim mới cập nhật
      </p>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <v-img
              src="https://mybucketshine.s3.amazonaws.com/Baby-Driver.jpg"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <h3 class="mt-4 text-lg hover-under-line">Quái xế Baby</h3>
            <h3 class="hover-under-line">Baby Driver</h3>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <v-img
              src="https://mybucketshine.s3.amazonaws.com/Baby-Driver.jpg"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <h3 class="mt-4 text-lg hover-under-line">Quái xế Baby</h3>
            <h3 class="hover-under-line">Baby Driver</h3>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <v-img
              src="https://mybucketshine.s3.amazonaws.com/Baby-Driver.jpg"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <h3 class="mt-4 text-lg hover-under-line">Quái xế Baby</h3>
            <h3 class="hover-under-line">Baby Driver</h3>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <v-img
              src="https://mybucketshine.s3.amazonaws.com/Baby-Driver.jpg"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <h3 class="mt-4 text-lg hover-under-line">Quái xế Baby</h3>
            <h3 class="hover-under-line">Baby Driver</h3>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <v-img
              src="https://mybucketshine.s3.amazonaws.com/Baby-Driver.jpg"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <h3 class="mt-4 text-lg hover-under-line">Quái xế Baby</h3>
            <h3 class="hover-under-line">Baby Driver</h3>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <v-img
              src="https://mybucketshine.s3.amazonaws.com/Baby-Driver.jpg"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <h3 class="mt-4 text-lg hover-under-line">Quái xế Baby</h3>
            <h3 class="hover-under-line">Baby Driver</h3>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <v-img
              src="https://mybucketshine.s3.amazonaws.com/Baby-Driver.jpg"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <h3 class="mt-4 text-lg hover-under-line">Quái xế Baby</h3>
            <h3 class="hover-under-line">Baby Driver</h3>
          </v-col>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? '6 ' : '3'">
            <v-img
              src="https://mybucketshine.s3.amazonaws.com/Baby-Driver.jpg"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <h3 class="mt-4 text-lg hover-under-line">Quái xế Baby</h3>
            <h3 class="hover-under-line">Baby Driver</h3>
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
    const typeMovie = await axios.get(`${process.env.baseUrl}/gettypemovie`)
    const nationalMovie = await axios.get(
      `${process.env.baseUrl}/getnationalmovie`
    )
    const movies = await axios.get(`${process.env.baseUrl}/filter`, {
      params: {
        pageIndex: 1,
        pageSize: 8,
      },
    })
    return {
      typeMovies: typeMovie.data,
      nationalMovies: nationalMovie.data,
      movies: movies.data.movies,
    }
  },
  data: () => ({
    years: ['2021', '2020', '2019', '2018', '2017', '2016'],
    year: '',
    sorts: ['Ngày cập nhật', 'Ngày phát hành', 'Điểm đánh giá'],
    sort: '',
    nationalMovie: '',
    typeMovie: '',
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