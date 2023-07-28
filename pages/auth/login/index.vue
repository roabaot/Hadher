<template>
  <v-container class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col lg="5" md="6" sm="6" cols="12">
        <v-card class="card-shadow rounded-xl">
          <v-card-text class="pa-4">
            <v-img src="/img/logo.png" height="135" width="350" class="mx-auto" />
            <h2 class="text-h5 font-weight-bold text-center grey--text text--darken-4">
              تسجيل الدخول
            </h2>

            <div class="pt-8">
              <v-container class="px-8">
                <ValidationObserver ref="observer">
                  <ValidationProvider v-slot="{ errors }" name="اسم المستخدم" rules="required|min:3|max:50">
                    <v-text-field
                      v-model="username"
                      label="اسم المستخدم"
                      :error-messages="errors"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2"
                    />
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" vid="password" name="كلمة السر" rules="required|min:8|max:32">
                    <v-text-field
                      v-model="password"
                      label="كلمة السر"
                      :error-messages="errors"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2"
                      @click:append="showPassword = !showPassword"
                    />
                  </ValidationProvider>
                </ValidationObserver>

                <div class="my-3">
                  <v-btn
                    color="primary"
                    block
                    x-large
                    depressed
                    class="rounded-lg"
                    :disabled="loading"
                    @click="onLogin"
                  >
                    تسجيل الدخول
                  </v-btn>
                  <div class="mt-2">
                    <span class="fourtly--text">ليس لديك حساب؟</span>
                    <nuxt-link to="/auth/signup" class="primary--text">إنشاء حساب</nuxt-link>
                  </div>
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
import {
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
setInteractionMode('eager')
export default {
  layout: 'none',
  middleware: 'isAuth',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      showPassword: false,
      loading: false
    }
  },
  methods: {
    onLogin () {
      this.$refs.observer.validate().then((noErrors) => {
        if (noErrors) {
          try {
            this.loading = true
            const data = {
              username: this.username,
              password: this.password
            }
            console.log(data)
            this.$nuxt.$router.push('/')
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

<style lang="scss" scoped>
</style>
