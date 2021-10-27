<template>
  <div>
    <div
      class="w-full bg-img relative"
      :style="{ 'background-image': `url(${movie.imagebackgroundlink})` }"
    >
      <v-overlay absolute="absolute" class="w-full h-full"></v-overlay>
    </div>
    <div class="top-2/4 w-full z-10 pl-12 pr-12">
      <v-container>
        <v-row>
          <v-col :cols="$vuetify.breakpoint.name == 'xs' ? 7 : 3">
            <v-img
              class="mb-4"
              :src="movie.imagelink"
              max-height="100%"
              max-width="100%"
              contain
            ></v-img>
            <div class="d-flex justify-center">
              <Button
                text="Xem phim"
                @btnOnclick="
                  $router.push({
                    path: `/type/movies/${movie._id}/watching`,
                    params: { id: movie._id },
                  })
                "
              />
            </div>
          </v-col>
          <v-col class="pt-8" :cols="$vuetify.breakpoint.name == 'xs' ? 12 : 9">
            <h1 class="text-4xl mb-4">{{ movie.moviename }}</h1>
            <h3 class="text-2xl text-gray-400 mb-4">
              {{ movie.movienamevn }}
              <span class="text-hover">({{ movie.year }})</span>
            </h3>
            <h4 class="text-xl font-medium mb-4">
              Thời lượng: {{ movie.timeduration }}
            </h4>
            <!-- <h4 class="text-xl font-medium mb-4">Rate: 4</h4> -->
            <v-rating
              background-color="grey lighten-2"
              color="warning"
              half-increments
              hover
              length="5"
              size="25"
              value="2.5"
              readonly
            ></v-rating>
            <div class="d-flex mb-12">
              <div
                v-for="item of movie.typemovie"
                :key="item.id"
                class="border ml-2 p-2 text-sm rounded-xl"
              >
                {{ item }}
              </div>
            </div>
            <div class="pl-8 mb-4">
              <div class="d-flex">
                <p class="mr-12 text-gray-400">ĐẠO DIỄN</p>
                <p class="font-medium">{{ movie.direction }}</p>
              </div>
              <div class="d-flex">
                <p class="mr-12 text-gray-400">KỊCH BẢN</p>
                <p class="font-medium">Đoàn Thị Sáng</p>
              </div>
              <div class="d-flex">
                <p class="mr-12 text-gray-400">QUỐC GIA</p>
                <p class="font-medium">{{ movie.national }}</p>
              </div>
              <div class="d-flex">
                <p class="mr-8 text-gray-400">kHỞI CHIẾU</p>
                <p class="font-medium">28/08/2000</p>
              </div>
            </div>
            <div class="mb-4">{{ movie.description }}</div>
            <v-container class="mb-12">
              <v-row>
                <v-col v-for="item of movie.actors" :key="item.id">
                  <div class="item-actor-img rounded-full mb-2"></div>
                  <p>{{ item }}</p>
                </v-col>
              </v-row>
            </v-container>
            <div class="trailer mb-8">
              <p class="font-medium">Trailer</p>
              <div
                class="trailer-img d-flex justify-center align-center"
                :style="{
                  'background-image': `url(${movie.imagebackgroundlink})`,
                }"
                @click="playTrailerVideo"
              >
                <v-icon class="play-icon">fas fa-play-circle</v-icon>
              </div>
            </div>
            <div class="wrapper-video h-80" :class="{ showVideo: showVideo }">
              <iframe
                width="80%"
                height="80%"
                :src="`https://www.youtube.com/embed/${movie.trailerlink}`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Button from '../../../../components/Button.vue'
export default {
  components: { Button },
  middleware: 'type-movie-id',
  async asyncData({ params }) {
    const response = await axios.get(
      `${process.env.baseUrl}/getmovie/${params.id}`
    )
    return { movie: response.data }
  },
  data() {
    return {
      showVideo: false,
    }
  },
  methods: {
    /**
     * Bắt sự kiện khi click vào xem trailer
     *Author: DTSang(19/10)
     */
    playTrailerVideo() {
      this.showVideo = true
    },
  },
}
</script>

<style scoped>
.bg-img {
  height: 500px;
  background-size: cover;
}
.text-hover:hover {
  text-decoration-line: underline;
  color: #fbbf24;
}
.item-actor-img {
  background-image: url('../../../../assets/img/background-avatar.jpeg');
  width: 100px;
  height: 100px;
  background-size: cover;
}
.trailer-img {
  width: 160px;
  height: 90px;
  background-size: cover;
}
.trailer-img:hover {
  border: 1px solid yellow;
  opacity: 0.5;
}
.play-icon {
  display: none;
}
.trailer-img:hover .play-icon {
  display: block;
}
.wrapper-video {
  display: none;
}
.showVideo {
  display: block;
}
</style>