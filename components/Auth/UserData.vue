<template>
  <div>
    <ValidationObserver ref="observer">
      <ValidationProvider v-slot="{ errors }" name="اسم المستخدم" rules="required|min:3|max:50">
        <v-text-field
          v-model="data.username"
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
          v-model="data.password"
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
          v-model="data.passwordConfirmation"
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
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
setInteractionMode('eager')
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      data: {
        username: '',
        password: '',
        passwordConfirmation: ''
      },
      showPassword: false,
      showPassword2: false
    }
  },
  methods: {
    onSignup () {
      this.$refs.observer.validate().then((noErrors) => {
        if (noErrors) {
          this.$emit('step1', this.data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
