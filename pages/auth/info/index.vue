<template>
  <v-container class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col lg="5" md="6" sm="6" cols="12">
        <v-card class="card-shadow rounded-xl">
          <v-card-text class="pa-4">
            <v-img src="/img/logo.png" height="160" width="400" class="mx-auto" />
            <h2 class="text-h4 font-weight-bold text-center grey--text text--darken-4">
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
              <v-container>
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
                    @click.stop=""
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
      address: ''
    }
  },
  methods: {
    selectedImage () {
      this.previewImg = null
      this.previewImg = URL.createObjectURL(this.uploadImg)
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
