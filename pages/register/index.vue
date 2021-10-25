<template>
  <v-overlay absolute="absolute">
    <div class="bg-gray-900 p-8 rounded">
      <h1 class="text-3xl font-bold mb-4">Đăng kí</h1>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Username"
            rules="required"
          >
            <v-text-field
              v-model="account.username"
              :error-messages="errors"
              label="Username"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="phoneNumber"
            :rules="{
              required: true,
              digits: 10,
              regex: '^(0)\\d{9}$',
            }"
          >
            <v-text-field
              v-model="account.phone"
              :counter="10"
              :error-messages="errors"
              label="Phone Number"
              required
            ></v-text-field>
          </validation-provider>
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
            name="Ngày sinh"
            rules="required"
          >
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="computedDateFormatted"
                  :error-messages="errors"
                  label="Ngày sinh"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :allowed-dates="allowedDates"
                no-title
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
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
          <validation-provider
            v-slot="{ errors }"
            name="Comfirm password"
            rules="required"
          >
            <v-text-field
              v-model="cfpassword"
              :error-messages="errors"
              label="Comfirm-Password"
              type="password"
              required
            ></v-text-field>
          </validation-provider>
          <div class="mb-8">
            Bạn đã có tài khoản?
            <span
              class="text-gray-400 ml-2 item-hover"
              @click="
                $router.push({
                  path: `/login`,
                })
              "
              >Đăng nhập ngay</span
            >
          </div>
          <v-btn
            class="mr-4 red darken-3"
            type="button"
            :disabled="invalid"
            @click="btnRegisterOnclick"
          >
            Đăng kí
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
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </validation-observer>
    </div>
  </v-overlay>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    cfpassword: '',
    date: '',
    account: {
      username: '',
      phone: '',
      email: '',
      password: '',
    },
    menu: false,
    snackbar: false,
    textSnackbar: '',
    color: '',
    msg_position: true,
    timeout: 2000,
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date() {
      const dob = new Date(this.date).getTime()
      console.log(dob)
    },
  },
  methods: {
    submit() {
      this.$refs.observer.validate()
    },
    clear() {
      this.username = ''
      this.phoneNumber = ''
      this.email = ''
      this.password = ''
      this.cfpassword = ''
      this.$refs.observer.reset()
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    allowedDates: (val) => new Date(val).getTime() <= new Date().getTime(),
    btnRegisterOnclick() {
      this.account.dob = new Date(this.date).getTime().toString()
      if (this.cfpassword !== this.account.password) {
        this.snackbar = true
        this.textSnackbar = 'Mật khẩu xác nhận chưa đúng!'
        this.color = '#dc2626'
      } else {
        const value = this.account
        const self = this
        axios
          .post(`${process.env.baseUrl}/register`, value)
          .then(() => {
            self.snackbar = true;
            self.textSnackbar = 'Đăng nhập thành công';
            self.color = '#43A047';
            self.$router.push({ path: '/login' });
          })
          .catch((error) => {
            self.snackbar = true;
            self.textSnackbar = error.response.data.error;
            self.color = '#E53935';
          })
      }
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
    
