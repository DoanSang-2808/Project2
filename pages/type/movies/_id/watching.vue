<template>
  <div>
    <div class="watch-movie-wrapper">
      <div class="watch-movie">
        <video
         class="mb-4"
          width="100%"
          controls
          src="https://dl125.ukaritama.xyz/download?file=YmRhMTc5MzE0YWUwNjM2NjczZDAwNTRiN2U0YWRhYmFiYWRmYTQ5ZjY0NGJjMDlkNmQwMTc1NmEyYWVlODE3Nl8xMDgwcC5tcDTimK95Mm1ldGEuY29tLUtpbiBvZiB0aGUgU3RhaW5lZCBCbGFkZSB8IFNwaXJpdCBCbG9zc29tIDIwMjAgQ2luZW1hdGljIC0gTGVhZ3VlIG9mIExlZ2VuZHPimK8xMDgwcA"
        ></video>
        <h1 class="name-movie">{{movie.moviename}}</h1>
        <h3 class="sub-mane-movie"> {{movie.movienamevn}} <span>({{movie.year}})</span></h3>
        <div class="description-movie">
          {{movie.description}}
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'watching',
  async asyncData({ params }) {
    const response = await axios.get(
      `${process.env.baseUrl}/getmovie/${params.id}`
    )
    return { movie: response.data }
  },
  data() {
    return {
      movie: {},
      host: process.env.VUE_APP_ROOT_API,
    }
  },
  created() {
    this.loadMovie()
  },
  mounted() {
    window.FB.XFBML.parse()
  },
  methods: {
    /**
     * Hàm lấy dữ liệu của 1 phim
     * Author: DTSang(23/09)
     */
    loadMovie() {
      const self = this
      if (this.id !== undefined) {
        axios
          .get(`${process.env.VUE_APP_ROOT_API}/getmovie/${this.id}`)
          .then((response) => {
            self.movie = response.data
          })
          .catch((error) => {
            console.log(error)
          })
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