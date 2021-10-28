<template>
  <div>
    <div class="watch-movie-wrapper">
      <div class="watch-movie">
        <video
          ref="myvideo"
          class="mb-4"
          width="100%"
          controls
          src="https://www.googleapis.com/drive/v3/files/12H41M5wQQAVOS4bZ7QfIEv-SWGbf81rh?key=AIzaSyAR2pX0DsiQXppxQnq4N_qWxg1ND6D6wjQ&alt=media"
        ></video>
        <h1 class="name-movie">{{ movie.moviename }}</h1>
        <h3 class="sub-mane-movie">
          {{ movie.movienamevn }} <span>({{ movie.year }})</span>
        </h3>
        <v-rating
          v-model="rateMovie"
          background-color="grey lighten-2"
          color="warning"
          half-increments
          hover
          length="5"
          size="25"
          :readonly="readonly"
        ></v-rating>
        <div class="description-movie">
          {{ movie.description }}
        </div>
      </div>
    </div>
    <div class="comment-wrapper">
      <div class="comment">
        <div
          class="fb-comments"
          data-href="http://localhost:3000"
          data-width="100%"
          data-numposts="10"
        ></div>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
      :right="msg_position"
    >
      {{ textSnackbar }}

      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'watching',
  async asyncData({ params }) {
    const responseMovie = await axios.get(
      `${process.env.baseUrl}/getmovie/${params.id}`
    )
    const responseRate = await axios.get(
      `${process.env.baseUrl}/getratebymovie/${params.id}`
    )
    const id = params.id
    return {
      movie: responseMovie.data,
      rates: responseRate.data,
      idMovie: id,
    }
  },
  data() {
    return {
      movie: {},
      user: this.$cookies.get('Account').id,
      rateMovie: 0,
      readonly: true,
      token: this.$cookies.get('Account').token,
      snackbar: false,
      textSnackbar: '',
      color: '',
      msg_position: true,
      timeout: 2000,
      host: process.env.VUE_APP_ROOT_API,
    }
  },
  watch: {
    rateMovie() {
      if (this.readonly === false) {
        const value = {
          rate: this.rateMovie,
          user: this.user,
          movie: this.idMovie,
        }
        const self = this;
        axios({
          method: 'post',
          url: `${process.env.baseUrl}/createrate`,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            token: self.token, // eslint-disable-line
          },
          data: value,
        })
          .then((response) => {
            self.readonly = true;
            self.snackbar = true;
            self.textSnackbar = response.data.message;
            self.color = '#43A047';
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
  },
  created() {
    this.getRate()
    if (this.rateMovie === 0) {
      this.readonly = false
    };
  },
  mounted() {
    window.FB.XFBML.parse();
  },
  methods: {
    /**
     * Lấy về đánh giá của phim đánh giá bởi tài khoản hiện tại
     * Author: DTSang(27/10)
     */
    getRate() {
      const listRate = this.rates
      if (listRate !== null) {
        this.rateMovie =
          listRate.find((el) => el.user === this.user) === undefined
            ? 0
            : listRate.find((el) => el.user === this.user).rate
      }
    },
  },
}
</script>

<style scoped>
.watch-movie-wrapper {
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}
.watch-movie {
  width: 100%;
  height: 100%;
  background: rgb(107, 107, 107);
  text-align: left;
  color: #000;
  padding: 1rem;
}
#app {
  height: max-content !important;
  background: rgb(107, 107, 107) !important;
  margin-bottom: 4rem;
}
.container {
  padding: 0 !important;
  margin: 0 !important;
}
.name-movie {
  font-weight: 500;
  color: rgb(224, 203, 8);
}
.sub-mane-movie {
  font-size: 20px !important;
  color: #ccc !important;
  margin-bottom: 2rem;
}
.description-movie {
  width: 100%;
  height: 50px;
  background-color: rgb(90, 89, 89);
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.5rem;
  color: #ccc;
}
.comment-wrapper {
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}
.comment {
  width: 100%;
  height: inherit;
  background: #fff;
  text-align: left;
  color: #000;
  padding: 1rem;
}
.title-comment {
  height: 40px;
  width: 100%;
}
.input {
  background: #fff;
  border: 1 px solid #ccc;
  margin-bottom: 2rem;
}
.input input {
  background: #fff !important;
  color: #000 !important;
  width: calc(100% - 50px);
  border: none;
  outline: none;
}
.icon-send {
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-send i {
  display: block;
  color: #000;
  cursor: pointer;
}
.icon-send i:hover {
  color: blue;
}
.comment-list {
  width: 100%;
  height: max-content;
}
.comment-item {
  width: 100%;
  height: max-content;
  display: flex;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
}
.img-user {
  width: 5%;
  background-image: url('../../../../assets/img/background-avatar.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
}
.comment-content {
  width: 95%;
  padding-left: 1rem;
}
.comment-main span {
  font-size: 15px;
  color: #ccc;
}
.comment-main span:hover {
  text-decoration-line: underline;
  cursor: pointer;
}
</style>