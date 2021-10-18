<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="purple darken-2"
      style="z-index: 99"
    >
      <!-- <v-menu>
        <template v-slot:activator="{ on, attrs }" >
          <v-btn v-bind="attrs" v-on="on"> Click me </v-btn>
          <v-app-bar-nav-icon v-bind="attrs" v-on="on" hidden />
        </template>

        <v-list>
          <v-list-item @click="method">
            <v-list-item-title>Option 1</v-list-item-title>
          </v-list-item>

          <v-list-item disabled>
            <v-list-item-title>Option 2</v-list-item-title>
          </v-list-item>

          <v-list-item @click="method">
            <v-list-item-title>Option 3</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        <v-img
          lazy-src="../assets/img/logo-full.png"
          max-height="150"
          max-width="250"
          src="../assets/img/logo-full.png"
        ></v-img>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
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
                    src="	http://localhost:8080/img/logo-full.3f18e7ec.png"
                  ></v-img>
                </NuxtLink>
              </v-col>
              <v-col cols="4">
                <NuxtLink to="/search" class="d-flex align-center item-hover hidden">
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
                ><NuxtLink to="/type/movie"
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
              :text="$store.state.isLogin !== true ? 'Đăng nhập' : 'Đăng xuất'"
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
    <v-main :class="{ backgroundImg: $store.state.bgImg }">
      <v-container class="h-full">
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer app>
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
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
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