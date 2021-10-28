<template>
  <div class="d-flex w-full h-full">
    <div class="nav-bar h-full w-1/5">
      <div class="d-flex w-full h-11 align-center nav-item">
        <div class="w-1 h-full"></div>
        <v-icon class="ml-6 mr-4">fas fa-th</v-icon>
        <p class="mb-0">{{ $t('nav.home') }}</p>
      </div>
      <div class="d-flex w-full h-11 align-center active nav-item">
        <div class="w-1 h-full"></div>
        <v-icon class="ml-6 mr-4">fas fa-film</v-icon>
        <p class="mb-0">{{ $t('nav.movie') }}</p>
      </div>
    </div>
    <div class="main w-4/5 pl-3">
      <div class="pt-4 right-0 main-add d-flex flex-row-reverse">
        <Button :text="$t('button.newmovie')" @btnOnclick="addFilm()" />
      </div>
      <div class="bg-gray-600 main-table pt-4 p-2 pr-2">
        <div class="" style="height: 10%">
          <div class="d-flex align-center border pl-2 rounded w-1/3 h-10">
            <input
              v-model="keyword"
              type="text"
              placeholder="Nhập tên phim tìm kiếm...."
              class="outline-none w-full"
            />
          </div>
        </div>
        <div style="height: 90%">
          <v-data-table
            :headers="headers"
            :items="movies"
            class="elevation-1"
            fixed-header
            height="450px"
          >
            <template #top>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="movie.movienamevn"
                            label="Tên phim (VN)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="movie.moviename"
                            label="Tên phim (EN)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="movie.timeduration"
                            label="Thời lượng"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="movie.director"
                            label="Đạo diễn"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="movie.actors"
                            label="Diễn viên"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-autocomplete
                            v-model="movie.year"
                            class="mb-0"
                            :items="years"
                            dense
                            chips
                            label="Năm"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-autocomplete
                            v-model="movie.national"
                            class="mb-0"
                            :items="nationalMovie"
                            dense
                            chips
                            label="Quốc gia"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="movie.typemovie"
                            class="mb-0"
                            :items="typeMovie"
                            dense
                            chips
                            multiple
                            label="Thể loại"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="7">
                          <v-file-input
                            v-model="imagelink"
                            label="Ảnh đại diện"
                            accept="image/*"
                            prepend-icon="mdi-camera"
                            @change="createImage('imagelink', imagelink)"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <img :src="image" />
                        </v-col>
                        <v-col cols="12" sm="7">
                          <v-file-input
                            v-model="imagebackgroundlink"
                            label="Ảnh bìa"
                            accept="image/*"
                            prepend-icon="mdi-camera"
                            @change="
                              createImage(
                                'imagebackgroudlink',
                                imagebackgroundlink
                              )
                            "
                          ></v-file-input>
                        </v-col>
                        <v-col cols="6" sm="3">
                          <img :src="imagebackground" />
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            v-model="movie.description"
                            label="Mô tả phim"
                            hint="Hint text"
                            auto-grow
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this film?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template #item.actions="{ item }">
              <v-icon small class="mr-2" @click="editFilm(item._id)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteFilm(item._id)"> mdi-delete </v-icon>
            </template>
            <template #no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </div>
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
import Button from '../../components/Button.vue'
export default {
  components: { Button },
  middleware: 'admin',
  async asyncData() {
    const typeMovie = await axios.get(`${process.env.baseUrl}/gettypemovie`)
    const nationalMovie = await axios.get(
      `${process.env.baseUrl}/getnationalmovie`
    )
    return {
      typeMovie: typeMovie.data,
      nationalMovie: nationalMovie.data,
    }
  },
  data() {
    return {
      dialog: false, // xác nhận đóng mở dialog form detail
      dialogDelete: false, // xác nhận dóng mở dialog cảnh báo xóa
      headers: [
        {
          text: this.$t('header.name'),
          align: 'start',
          value: 'moviename',
        },
        { text: this.$t('header.year'), value: 'year', width: 100 },
        { text: this.$t('header.time'), value: 'timeduration', width: 100 },
        { text: this.$t('header.national'), value: 'national', width: 100 },
        { text: this.$t('header.type'), value: 'typemovie' },
        { text: this.$t('header.director'), value: 'director' },
        { text: this.$t('header.actors'), value: 'actors' },
        { text: this.$t('header.actions'), value: 'actions', width: 100 },
      ],
      movies: [], // danh sách phim
      editedIndex: -1, // Trạng thái của dialog form detail
      years: ['2021', '2020', '2019', '2018', '2017', '2016'],
      movie: {}, // object 1 phim
      idMovie: '', // id của bộ phim
      imagelink: '', // đường dẫn ảnh đọc từ input
      image: '', // đường dẫn ảnh hiển thị preview
      imagebackgroundlink: '',
      imagebackground: '',
      token: this.$cookies.get('Account').token, 
      keyword: '', // giá trị input ô tìm kiếm phim
      snackbar: false, // xác định đóng mở snackbar 
      textSnackbar: '',
      color: '',
      msg_position: true,
      timeout: 2000,
    }
  },

  computed: {
    /**
     * Cập nhật lại tiêu đề của Form khi edidtedIndex thay đổi
     * Author: DTSang(25/10)
     */
    formTitle() {
      return this.editedIndex === -1 ? 'New Film' : 'Edit Film'
    },
  },
  watch: {
    /**
     * Lắng nghe sự kiện của dialog
     * Author: DTSang(25/10)
     */
    dialog(val) {
      val || this.close()
    },
    /**
     * Lắng nghe sự thay đổi của dialog delete
     * Author: DTSang(25/10)
     */
    dialogDelete(val) {
      val || this.closeDelete()
    },
    /**
     * Lắng nghe sự thay đổi của keyword
     * Author: DTsang(25/10)
     */
    keyword() {
      if (this.keyword !== '') {
        this.findMovie()
      } else {
        this.initialize()
      }
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    /**
     * Hàm khởi tạo dữ liệu loadMovie
     * Author: DTSang(25/10)
     */
    initialize() {
      this.keyword = ''
      const self = this
      axios
        .get(`${process.env.baseUrl}/filter`, {
          params: {
            pageIndex: '',
            pageSize: '',
            typemovie: '',
            national: '',
            year: '',
          },
        })
        .then((response) => {
          self.movies = response.data.movies
        })
        .catch((error) => {
          console.log(error)
        })
    },
    /**
     * Bắt sự kiện button thêm mới phim được click
     * Author: DTSang(22/10)
     */
    addFilm() {
      this.dialog = true
    },
    /**
     * Hàm bắt sự kiện khi click btn sửa phim
     * Auhtor: DTSang(22/10)
     */
    editFilm(id) {
      this.editedIndex = 1
      const self = this
      axios
        .get(`${process.env.baseUrl}/getmovie/${id}`)
        .then((response) => {
          self.movie = response.data
          self.dialog = true
          self.idMovie = id
          self.image = this.movie.imagelink
          self.imagebackground = this.movie.imagebackgroundlink
        })
        .catch((error) => {
          console.log(error)
        })
    },
    /**
     * Hàm gọi hiện ảnh preview khi chọn input type file
     * Author: DTSang(28/09)
     */
    createImage(typeImage, file) {
      const reader = new FileReader()
      const self = this
      reader.onload = (e) => {
        if (typeImage === 'imagelink') {
          self.image = e.target.result
        } else {
          self.imagebackground = e.target.result
        }
      }
      if (file) {
        reader.readAsDataURL(file)
      }
      this.movie[typeImage] = file
    },
    /**
     * Hàm bắt sự kiện click xóa phim
     * Author: DTSang(22/10)
     */
    deleteFilm(id) {
      this.idMovie = id
      this.dialogDelete = true
    },
    /**
     * Hàm bắt sự kiện comfirm xóa phim
     * Author: DTSang(22/10)
     */
    deleteItemConfirm() {
      const self = this
      axios
        .delete(`${process.env.baseUrl}/deletemovie/${self.idMovie}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            token: self.token, // eslint-disable-line
          },
        })
        .then(() => {
          self.initialize()
          self.snackbar = true
          self.textSnackbar = 'Thêm phim mới thành công '
          self.color = '#43A047'
        })
        .catch((error) => {
          console.log(error)
        })
      this.closeDelete()
    },
    /**
     * Hàm bắt sự kiện click vào nút đóng dialog form
     * Author: DTSang(22/10)
     */
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.movie = {}
        this.editedIndex = -1
        this.image = ''
        this.imagebackground = ''
        this.imagelink = ''
        this.imagebackgroundlink = ''
      })
    },
    /**
     * HÀm bắt sự kiện khi click đóng cảnh báo xóa
     * Author: DTSang(22/10)
     */
    closeDelete() {
      this.dialogDelete = false
    },
    /**
     * Hàm băt du kiện click vào nút lưu
     * Author: DTSang(22/10)
     */
    save() {
      const formData = new FormData()
      formData.append('movienamevn', this.movie.movienamevn)
      formData.append('moviename', this.movie.moviename)
      formData.append('year', this.movie.year)
      formData.append('timeduration', this.movie.timeduration)
      formData.append(
        'director',
        (this.movie.director =
          this.movie.director == null ? '' : this.movie.director)
      )
      formData.append('national', this.movie.national)
      formData.append('movielink', this.movie.movielink)
      formData.append('trailerlink', this.movie.trailerlink)
      const actorsArr = this.movie.actors
      let actors = ''
      for (let i = 0; i < actorsArr.length; i++) {
        actors += actorsArr[i] + ','
      }
      formData.append('actors', actors.slice(0, -1))
      const typeMovieArr = this.movie.typemovie
      let typeMovie = ''
      for (let i = 0; i < typeMovieArr.length; i++) {
        typeMovie += typeMovieArr[i] + ','
      }
      formData.append('typemovie', typeMovie.slice(0, -1))
      formData.append('description', this.movie.description)
      formData.append('image', this.movie.imagelink)
      formData.append('imagebackground', this.movie.imagebackgroundlink)
      const self = this
      if (this.editedIndex === -1) {
        axios
          .post(`${process.env.baseUrl}/createmovie`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
              token: self.token, // eslint-disable-line
            },
          })
          .then((response) => {
            self.initialize()
            self.close()
            self.snackbar = true
            self.textSnackbar = 'Thêm phim mới thành công '
            self.color = '#43A047'
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        axios
          .put(`${process.env.baseUrl}/updatemovie/${this.idMovie}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
              token: self.token, // eslint-disable-line
            },
          })
          .then((response) => {
            self.initialize()
            self.close()
            self.snackbar = true
            self.textSnackbar = 'Sửa phim thành công '
            self.color = '#43A047'
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    /**
     * Tìm kiếm phimg theo key word
     * Author: DTSang(28/09)
     */
    findMovie() {
      const self = this
      axios
        .get(`${process.env.baseUrl}/findmovie?key=${self.keyword}`)
        .then((response) => {
          self.movies = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.nav-bar {
  border-right: 1px solid #fff;
}
.active div {
  background-color: green;
}
.active {
  background-color: rgb(70, 70, 70);
}
.nav-item:hover {
  background-color: rgb(109, 108, 108);
}
.main-add {
  height: 10%;
}
.main-table {
  height: 90%;
}
</style>