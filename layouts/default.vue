<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="purple darken-2"
      style="z-index: 99"
    >
      <v-container fluid>
        <v-row>
          <v-col
            :cols="
              $vuetify.breakpoint.name == 'sm' ||
              $vuetify.breakpoint.name == 'xs'
                ? 9
                : 6
            "
          >
            <v-row>
              <v-col
                :cols="$vuetify.breakpoint.name == 'xs' ? 12 : 3"
                class="d-flex align-center"
              >
                <NuxtLink to="/home">
                  <v-img
                    max-height="34"
                    max-width="92"
                    src="http://localhost:8080/img/logo-full.3f18e7ec.png"
                  ></v-img>
                </NuxtLink>
              </v-col>
              <v-col cols="4">
                <NuxtLink
                  to="/search"
                  class="d-flex align-center item-hover hidden"
                >
                  <v-icon color="grey lighten-5" class="icon">
                    fas fa-search
                  </v-icon>
                  <p class="mb-0 text-white">Tìm kiếm</p>
                </NuxtLink>
              </v-col>
              <v-col cols="3" class="d-flex align-center item-hover hidden">
                <NuxtLink to="/home">
                  <p class="mb-0 text-white">Trang chủ</p>
                </NuxtLink>
              </v-col>
              <v-col cols="2" class="d-flex align-center item-hover hidden"
                ><NuxtLink to="/type/movies"
                  ><p class="mb-0 text-white">Phim lẻ</p></NuxtLink
                ></v-col
              >
            </v-row>
          </v-col>
          <v-col
            :cols="
              $vuetify.breakpoint.name == 'sm' ||
              $vuetify.breakpoint.name == 'xs'
                ? 3
                : 6
            "
            class="d-flex align-center justify-end"
          >
            <Button
              :text="$store.getters.getIsLogin !== true ? 'Đăng nhập' : 'Đăng xuất'"
              @btnOnclick="
                $router.push({
                  path: `/login`,
                })
              "
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main :class="{ backgroundImg: $store.getters.getBgImg }">
      <v-container :fluid="fluid" class="h-full">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app class="z-20">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import Button from '../components/Button.vue';
export default {
  components: { Button },
  asyncData() {
    const logo = 'http://localhost:8080/img/logo-full.3f18e7ec.png';
    return logo;
  },
  data() {
    return {
      clipped: false,
      fixed: false,
      fluid: false,
    }
  },
  created() {
    this.changeIsLogin();
  },
  methods: {
    /**
     * Hàm cập nhật giá trị isLogin trong store
     * Auhtor: DoanThiSang(13/09)
     */
    changeIsLogin() {
      this.$store.dispatch(
        'handleChangeIsLogin',
        this.$cookies.get('Account') !== undefined
      );
    },
  },
}
</script>

<style scoped>
.item-hover:hover {
  opacity: 0.6;
  cursor: pointer;
  color: #000;
}
.backgroundImg {
  background-image: url('../assets/img/background-login.jpg');
  background-repeat: repeat;
}
.icon {
  width: 30px;
  height: 30px;
  font-size: 15px;
}
@media only screen and (max-width: 680px) {
  .hidden {
    display: none !important;
  }
}
</style>