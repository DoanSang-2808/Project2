<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="purple darken-2"
      style="z-index: 99"
    >
      <v-container fluid class="h-full padding-0">
        <v-row class="h-full margin-0">
          <v-col
            class="h-full padding-0"
            :cols="
              $vuetify.breakpoint.name == 'sm' ||
              $vuetify.breakpoint.name == 'xs'
                ? 9
                : 6
            "
          >
            <v-row class="margin-auto h-full">
              <v-col
                class="d-flex justify-center align-center menu"
                :cols="$vuetify.breakpoint.name == 'xs' ? 2 : 1"
              >
                <v-menu top :close-on-click="closeOnClick">
                  <template #activator="{ on, attrs }">
                    <v-icon color="white" dark v-bind="attrs" v-on="on">
                      fas fa-bars
                    </v-icon>
                  </template>

                  <v-list theme-light>
                    <v-list-item>
                      <NuxtLink to="/search">
                        <v-list-item-title class="text-white">
                          {{ $t('nav.search') }}
                        </v-list-item-title>
                      </NuxtLink>
                    </v-list-item>
                    <v-list-item>
                      <NuxtLink to="/home">
                        <v-list-item-title class="text-white">
                          {{ $t('nav.home') }}
                        </v-list-item-title>
                      </NuxtLink>
                    </v-list-item>
                    <v-list-item>
                      <NuxtLink to="/type/movies">
                        <v-list-item-title class="text-white">
                          {{ $t('nav.movie') }}
                        </v-list-item-title>
                      </NuxtLink>
                    </v-list-item>
                    <v-list-item>
                      <NuxtLink to="">
                        <v-list-item-title class="text-white">
                          <v-switch
                            v-model="lang"
                            class="d-flex justify-center align-center"
                            style="margin: auto"
                            inset
                            :label="lang === true ? 'VI' : 'EN'"
                          ></v-switch>
                        </v-list-item-title>
                      </NuxtLink>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
              <v-col
                :cols="$vuetify.breakpoint.name == 'xs' ? 6 : 3"
                class="d-flex align-center padding-0 h-full"
              >
                <NuxtLink to="/home" class="h-full d-flex align-center">
                  <img src="../assets/img/logo-full.png" />
                </NuxtLink>
              </v-col>
              <v-col cols="3" class="d-flex align-center h-full hidden">
                <NuxtLink to="/search" class="d-flex align-center item-hover">
                  <v-icon color="grey lighten-5" class="icon">
                    fas fa-search
                  </v-icon>
                  <p class="mb-0 text-white">{{ $t('nav.search') }}</p>
                </NuxtLink>
              </v-col>
              <v-col
                cols="2"
                class="d-flex align-center item-hover hidden h-full"
              >
                <NuxtLink to="/home">
                  <p class="mb-0 text-white">{{ $t('nav.home') }}</p>
                </NuxtLink>
              </v-col>
              <v-col
                cols="2"
                class="d-flex align-center item-hover hidden h-full"
                ><NuxtLink to="/type/movies"
                  ><p class="mb-0 text-white">
                    {{ $t('nav.movie') }}
                  </p></NuxtLink
                ></v-col
              >
              <v-col cols="2" class="d-flex align-center hidden h-full">
                <v-switch
                  v-model="lang"
                  class="d-flex justify-center align-center"
                  style="margin: auto"
                  inset
                  :label="lang === true ? 'VI' : 'EN'"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            :cols="
              $vuetify.breakpoint.name == 'sm' ||
              $vuetify.breakpoint.name == 'xs'
                ? 3
                : 6
            "
            class="d-flex align-center justify-end h-full"
          >
            <Button
              :text="
                $store.getters.getIsLogin !== true ? $t('button.login') : $t('button.logout')
              "
              :textIcon="
                $store.getters.getIsLogin !== true
                  ? 'fas fa-sign-in-alt'
                  : 'fas fa-sign-out-alt'
              "
              @btnOnclick="btnOnclick"
            >
            </Button>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main :class="{ backgroundImg: $store.getters.getBgImg }">
      <v-container :fluid="$store.getters.getFluid" class="h-full">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app class="z-20">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import Button from '../components/Button.vue'
export default {
  components: { Button },
  data() {
    return {
      clipped: false,
      fixed: false,
      closeOnClick: false,
      lang: false,
    }
  },
  watch: {
    lang() {
      this.$i18n.locale = this.lang === true ? 'vi' : 'en'
    },
  },
  created() {
    this.changeIsLogin()
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
      )
    },
    /**
     * Bắt sự kiện khi click vào Login/Logout
     * Author: DTSang(25/10)
     */
    btnOnclick() {
      if (this.$store.getters.getIsLogin !== true) {
        this.$router.push({
          path: `/login`,
        })
      } else {
        this.$cookies.remove('Account')
        this.changeIsLogin()
        this.$router.push({
          path: `/`,
        })
      }
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
.menu {
  display: none !important;
}
@media only screen and (max-width: 680px) {
  .hidden {
    display: none !important;
  }
  .menu {
    display: block !important;
  }
}
.padding-0 {
  padding: 0 !important;
}
.margin-0 {
  margin: 0 !important;
}
.margin-auto {
  margin: auto !important;
}
img {
  height: 80% !important;
}
</style>