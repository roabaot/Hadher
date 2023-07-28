<template>
  <v-container class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col lg="5" md="6" sm="6" cols="12">
        <v-card class="card-shadow rounded-xl">
          <v-card-text class="pa-4">
            <v-img src="/img/logo.png" height="135" width="350" class="mx-auto" />
            <h2 class="text-h5 font-weight-bold text-center grey--text text--darken-4">
              حدد موقع الشركة الجغرافي
            </h2>

            <div class="pt-8">
              <v-container class="px-8">
                <ValidationObserver ref="observer">
                  <ValidationProvider v-slot="{ errors }" name="موقع الشركة" rules="required|min:3">
                    <v-text-field
                      v-model="address"
                      label="موقع الشركة"
                      :error-messages="errors"
                      outlined
                      required
                      :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                      class="rounded-lg subtitle-2"
                    />
                  </ValidationProvider>
                  <v-row>
                    <v-col md="6" cols="12">
                      <ValidationProvider v-slot="{ errors }" name="خط الطول" rules="required">
                        <v-text-field
                          v-model="longitude"
                          label="خط الطول"
                          :error-messages="errors"
                          outlined
                          required
                          :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                          class="rounded-lg subtitle-2"
                          @keypress="isNumber"
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col md="6" cols="12">
                      <ValidationProvider v-slot="{ errors }" name="خط العرض" rules="required">
                        <v-text-field
                          v-model="latitude"
                          label="خط العرض"
                          :error-messages="errors"
                          outlined
                          required
                          :dir="$vuetify.rtl ? 'ltr' : 'rtl'"
                          class="rounded-lg subtitle-2"
                          @keypress="isNumber"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </ValidationObserver>

                <div class="my-3">
                  <v-btn
                    color="primary"
                    block
                    x-large
                    depressed
                    class="rounded-lg mb-3"
                    @click="onMap"
                  >
                    التالي
                  </v-btn>
                  <!-- <v-btn
                    color="primary"
                    block
                    outlined
                    x-large
                    depressed
                    class="rounded-lg"
                    @click.stop=""
                  >
                    أضف موقع أخر
                  </v-btn> -->
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
      address: '',
      longitude: '',
      latitude: '',
      loading: false
    }
  },
  methods: {
    isNumber (e) {
      let evt
      if (e) {
        evt = e
      } else {
        evt = window.event
      }
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    selectedImage () {
      this.previewImg = null
      this.previewImg = URL.createObjectURL(this.uploadImg)
    },
    onMap () {
      this.$refs.observer.validate().then((noErrors) => {
        if (noErrors) {
          try {
            this.loading = true
            this.$nuxt.$router.push('/auth/shift')
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
