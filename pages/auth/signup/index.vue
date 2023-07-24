<template>
  <v-container class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col lg="5" md="6" sm="6" cols="12">
        <v-card class="card-shadow rounded-xl">
          <v-card-text class="pa-4">
            <v-img src="/img/logo.png" height="135" width="350" class="mx-auto" />
            <h2 class="text-h5 font-weight-bold text-center grey--text text--darken-4">
              إنشاء حساب
            </h2>

            <div class="pt-8">
              <v-container class="px-8">
                <!-- <v-window v-model="step">
                  <v-window-item :value="1">
                    <UserData @step1="onStep1($event)" />
                  </v-window-item>
                </v-window> -->
                <ValidationObserver ref="observer">
                  <ValidationProvider v-slot="{ errors }" name="اسم المستخدم" rules="required|min:3|max:50">
                    <v-text-field
                      v-model="data.name"
                      label="اسم المستخدم"
                      :error-messages="errors"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2 signup"
                    />
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="البريد الإلكتروني" rules="required|email">
                    <v-text-field
                      v-model="data.email"
                      label="البريد الإلكتروني"
                      :error-messages="errors"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2 signup"
                    />
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" vid="password" name="كلمة السر" rules="required|min:8|max:32">
                    <v-text-field
                      v-model="data.password"
                      label="كلمة السر"
                      :error-messages="errors"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2 signup"
                      @click:append="showPassword = !showPassword"
                    />
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="تاكيد كلمة السر" rules="required|confirmed:password">
                    <v-text-field
                      v-model="passwordConfirmation"
                      label="تاكيد كلمة السر"
                      :error-messages="errors"
                      :type="showPassword2 ? 'text' : 'password'"
                      :append-icon="showPassword2 ? 'mdi-eye-off' : 'mdi-eye'"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2 signup"
                      @click:append="showPassword2 = !showPassword2"
                    />
                  </ValidationProvider>
                </ValidationObserver>

                <div class="mt-3">
                  <v-btn
                    color="primary"
                    block
                    x-large
                    depressed
                    class="rounded-lg"
                    :disabled="loading"
                    @click="onSignup"
                  >
                    إنشاء حساب
                  </v-btn>
                </div>

                <div class="mt-2 mb-3">
                  <span class="fourtly--text">لديك حساب بالفعل ؟</span>
                  <nuxt-link to="/auth/login" class="primary--text">تسجيل الدخول</nuxt-link>
                </div>
              </v-container>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import UserData from '@/components/Auth/UserData.vue'
import {
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
setInteractionMode('eager')
export default {
  layout: 'none',
  components: {
    // UserData
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      // step: 1,
      data: {
        name: '',
        email: '',
        password: '',
        role: 'admin'
      },
      passwordConfirmation: '',
      showPassword: false,
      showPassword2: false,
      loading: false
    }
  },
  methods: {
    // onStep1 (item) {
    //   this.username = item.username
    //   this.password = item.password
    //   this.step = 2
    // },
    onSignup () {
      this.$refs.observer.validate().then(async (noErrors) => {
        if (noErrors) {
          try {
            // const data = {
            // }
            this.loading = true
            console.log(this.$cookies.get('admin_token'))
            const res = await this.$axios.$post('/users', this.data, {
              headers: {
                Authorization: this.$cookies.get('admin_token')
              }
            })
            console.log(res)
            const loginRes = await this.$axios.$get('/login', {
              auth: {
                username: this.data.email,
                password: this.data.password
              }
            })
            console.log('login: ', loginRes)
            this.$cookies.set('admin', this.data)
            localStorage.setItem('admin', this.data)
            this.$cookies.set('admin_token', this.$cookies.get('admin_token'))
            localStorage.setItem('admin_token', this.$cookies.get('admin_token'))
            // await this.$auth.$storage.setUniversal('admin', this.data, true)
            // await this.$auth.$storage.setUniversal('admin_token', 'Bearer ' + this.$cookies.get('auth.admin_token'), true)
            // await this.$axios.setHeader('Authorization', 'Bearer ' + this.$cookies.get('auth.admin_token'))
            // await this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + this.$cookies.get('auth.admin_token'))
            this.$nuxt.$router.push('/auth/info')
            this.loading = false
          } catch (error) {
            console.log(error)
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style>
.signup input {
  text-align: right !important;
}
</style>
