<template>
  <v-container class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col lg="5" md="6" sm="6" cols="12">
        <v-card class="card-shadow rounded-xl">
          <v-card-text class="pa-4">
            <v-img src="/img/logo.png" height="135" width="350" class="mx-auto" />
            <h2 class="text-h5 font-weight-bold text-center grey--text text--darken-4">
              معلومات الشركة
            </h2>

            <div class="full-width d-flex justify-center mt-9">
              <client-only>
                <v-file-input
                  ref="uploader"
                  v-model="uploadImg"
                  accept="image/*"
                  name="صور الشركة"
                  counter
                  hide-details="auto"
                  class="d-none"
                  @change="selectedImage"
                />
                <v-avatar size="110" class="avatar" @click="$refs.uploader.$refs.input.click()">
                  <v-img v-if="previewImg" :src="previewImg" />
                  <v-icon v-else color="primary">
                    mdi-camera-plus
                  </v-icon>
                </v-avatar>
              </client-only>
            </div>

            <div class="pt-8">
              <v-container class="px-8">
                <ValidationObserver ref="observer">
                  <ValidationProvider v-slot="{ errors }" name="اسم الشركة" rules="required|min:3|max:50">
                    <v-text-field
                      v-model="companyName"
                      label="اسم الشركة"
                      :error-messages="errors"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2"
                    />
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="رقم الهاتف" rules="required|numeric">
                    <v-text-field
                      v-model="phoneNumber"
                      label="رقم الهاتف"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      :error-messages="errors"
                      class="rounded-lg subtitle-2"
                      @keypress="isNumber"
                    />
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="البريد الالكتروني" rules="required|email">
                    <v-text-field
                      v-model="email"
                      label="البريد الالكتروني"
                      :error-messages="errors"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2"
                    />
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="عنوان الشركة" rules="required|min:3|max:100">
                    <v-text-field
                      v-model="address"
                      label="عنوان الشركة"
                      :error-messages="errors"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2"
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
                    @click="onInfo"
                  >
                    التالي
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
      uploadImg: null,
      previewImg: null,
      companyName: '',
      phoneNumber: '',
      email: '',
      address: '',
      loading: false
    }
  },
  methods: {
    selectedImage () {
      this.previewImg = null
      this.previewImg = URL.createObjectURL(this.uploadImg)
    },
    isNumber (e) {
      let evt
      if (e) {
        evt = e
      } else {
        evt = window.event
      }
      if (this.phoneNumber.startsWith('0')) {
        this.phoneNumber = this.phoneNumber.substring(1)
      }
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    onInfo () {
      this.$refs.observer.validate().then(async (noErrors) => {
        if (noErrors) {
          try {
            this.loading = true
            const formData = new FormData()
            formData.set('name', this.companyName)
            formData.set('address', this.address)
            formData.set('phonenumber', this.phoneNumber)
            formData.set('email', this.email)
            formData.set('image', this.uploadImg)
            const res = await this.$axios.$post('/companies', formData, {
              headers: {
                Authorization: this.$cookies.get('admin_token')
              }
            })
            console.log('res: ', res)
            this.$cookies.set('company', res.data)
            localStorage.setItem('company', res.data)
            this.$nuxt.$router.push('/auth/mapArea')
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
.avatar {
  border: 2px dashed #00a4dc;
  cursor: pointer;
}
</style>
