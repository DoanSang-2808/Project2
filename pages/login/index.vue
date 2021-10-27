<template>
  <v-overlay absolute="absolute">
    <div class="bg-gray-900 p-8 rounded">
      <h1 class="text-3xl font-bold mb-4">{{ $t('button.login') }}</h1>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="account.email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required"
          >
            <v-text-field
              v-model="account.password"
              :error-messages="errors"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="checkbox">
            <v-checkbox
              v-model="checkbox"
              :error-messages="errors"
              value="1"
              label="Ghi nhớ tôi"
              type="checkbox"
              required
            ></v-checkbox>
          </validation-provider>
          <div class="mb-8">
            Bạn chưa có tài khoản?
            <span
              class="text-gray-400 ml-2 item-hover"
              @click="
                $router.push({
                  path: `/register`,
                })
              "
              >Đăng kí ngay</span
            >
          </div>
          <v-btn
            class="mr-4 red darken-3"
            type="button"
            :disabled="invalid"
            @click="btnLoginOnclick"
          >
            {{ $t('button.login') }}
          </v-btn>
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            :color="color"
            :right="msg_position"
          >
            {{ textSnackbar }}

            <template #action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-btn @click="clear"> {{ $t('button.clear') }} </v-btn>
        </form>
      </validation-observer>
    </div>
  </v-overlay>
</template>

<script>
import axios from 'axios';
export default {
  middleware: 'login-register',
  data: () => ({
    account: {
      email: '',
      password: '',
    },
    checkbox: null,
    snackbar: false,
    textSnackbar: '',
    color: '',
    msg_position: true,
    timeout: 2000,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    /**
     * Hàm reset lại form và xóa errors của các text-feild
     * Author: DTSang(25/10)
     */
    clear() {
      this.account.email = '';
      this.account.password = '';
      this.checkbox = null;
      this.$refs.observer.reset();
    },
    /**
     * Sự kiện click đăng nhập
     * Author: DTsang(15/10)
     */
    btnLoginOnclick() {
      const value = this.account;
      const self = this;
      axios
        .post(`${process.env.baseUrl}/login`, value)
        .then((response) => {
          self.snackbar = true;
          self.textSnackbar = 'Đăng nhập thành công';
          self.color = '#43A047';
          this.changeRmbLogin();
          const account = {
            email: response.data.email,
            username: response.data.username,
            id: response.data._id,
            role: response.data.role,
            token: response.data.token,
            dob: response.data.dob,
          };
          this.$cookies.set('Account', account);
          this.changeIsLogin();
          if (response.data.role === 'guest') {
            self.$router.push({ path: "/home"});
          } else {
            self.$router.push({ path: "/admin" })
          }
        })
        .catch((error) => {
          self.snackbar = true;
          self.textSnackbar = error.response.data.notification;
          self.color = '#E53935';
        })
    },
    /**
     * Hàm cập nhạt giá trị isLogin trong store
     * Auhtor: DoanThiSang(13/09)
     */
    changeIsLogin() {
      this.$store.dispatch(
        'handleChangeIsLogin',
        this.$cookies.get('Account') !== undefined
      )
    },
    /**
     * Hàm cập nhật trạng thái lưu đăng nhập
     * Author: DTSang(16/10)
     */
    changeRmbLogin() {
      this.$store.dispatch("handleChangeRmbLogin", this.checkbox);
    },
  },
}
</script>

<style scoped>
@import url('../../assets/index.css');
.item-hover:hover {
  color: #93c5fd !important;
}
</style>
    
