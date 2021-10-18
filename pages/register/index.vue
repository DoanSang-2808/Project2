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
              v-model="username"
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
              v-model="phoneNumber"
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
              v-model="email"
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
              v-model="password"
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
          <v-btn class="mr-4 red darken-3" type="button" :disabled="invalid">
            Đăng kí
          </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </validation-observer>
    </div>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    cfpassword: '',
  }),

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
  },
}
</script>

<style scoped>
@import url('../../assets/index.css');
.item-hover:hover {
  color: #93c5fd !important;
}
</style>
    
