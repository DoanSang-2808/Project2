<template>
  <div class="w-full">
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
    <div class="odd-movie mt-8 mb-8">
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
            <h3 class="mt-4 text-lg hover-under-line" @click="clickDetailMovie(movie._id)">
              {{ movie.movienamevn }}
            </h3>
            <h3 class="hover-under-line" @click="clickDetailMovie(movie._id)">
              {{ movie.moviename }}
            </h3>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'type-movie',
  async asyncData() {
    const typeMovie = await axios.get(`${process.env.baseUrl}/gettypemovie`)
    const nationalMovie = await axios.get(
      `${process.env.baseUrl}/getnationalmovie`
    )
    // const movies = await axios.get(`${process.env.baseUrl}/filter`, {
    //   params: {
    //     pageIndex: 1,
    //     pageSize: 8,
    //     // typemovie: typeMovie,
    //     // national: nationalMovie,
    //     // year: year,
    //   },
    // })
    return {
      typeMovies: typeMovie.data,
      nationalMovies: nationalMovie.data,
      //   movies: movies.data.movies,
    }
  },
  data: () => ({
    years: ['2021', '2020', '2019', '2018', '2017', '2016'],
    year: '',
    sorts: ['Ngày cập nhật', 'Ngày phát hành', 'Điểm đánh giá'],
    sort: '',
    nationalMovie: '',
    typeMovie: '',
    pageIndex: 1,
    movies: [],
    page: 1,
  }),
  watch: {
    /**
     * Lắng nghe sựu thay đổi của typeMovie, nationalMovie, yearMovie
     * Author: DTSang(21/09)
     */
    typeMovie() {
      this.loadMovie()
    },
    nationalMovie() {
      this.loadMovie()
    },
    year() {
      this.loadMovie()
    },
  },
  created() {
    this.loadMovie()
  },
  methods: {
    /**
     * Hàm load dữ liệu phim lẻ
     * Auhtor: DTSang(17/10)
     */
    loadMovie() {
      const self = this
      axios
        .get(`${process.env.baseUrl}/filter`, {
          params: {
            pageIndex: this.pageIndex,
            pageSize: 8,
            typemovie: this.typeMovie,
            national: this.nationalMovie,
            year: this.year,
          },
        })
        .then((response) => {
          // self.totalMovie = response.data.totalMovie
          // self.totalPage = response.data.totalPage
          self.movies = response.data.movies
        })
        .catch((error) => {
          console.log(error)
        })
    },
    /**
     * Hàm bắt sự kiện click vào xem detail movie
     * Author: DTSang(18/10)
     */
    clickDetailMovie(idmovie) {
      this.$router.push({ path: `movies/${idmovie}`, params: { id: idmovie } })
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