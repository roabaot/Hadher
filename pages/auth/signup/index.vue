<template>
  <v-container class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col lg="5" md="6" sm="6" cols="12">
        <v-card class="card-shadow rounded-xl">
          <v-card-text class="pa-4">
            <v-img src="/img/logo.png" height="160" width="400" class="mx-auto" />
            <h2 class="text-h4 font-weight-bold text-center grey--text text--darken-4">
              إنشاء حساب
            </h2>

            <div class="pt-8">
              <v-container>
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
                      class="rounded-lg subtitle-2"
                      @click:append="showPassword2 = !showPassword2"
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
                    @click.stop=""
                  >
                    إنشاء حساب
                  </v-btn>
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
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      showPassword2: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
