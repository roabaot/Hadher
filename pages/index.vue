<template>
  <v-container class="pa-12">
    <div>
      <h1 class="secondary--text text-h5 font-weight-bold">
        الرئيسية
      </h1>
      <div class="mt-6">
        <v-card rounded="xl" class="card-shadow">
          <v-card-text>
            <v-row class="ma-0">
              <v-col md="2" cols="12">
                <v-avatar size="110" class="avatar">
                  <!-- <v-img :src="previewImg ? previewImg : '/logo.png'" class="fill-size" /> -->
                  <v-img src="/logo.png" class="fill-size" />
                </v-avatar>
              </v-col>
              <v-col md="8" cols="12">
                <div>
                  <label class="fourtly--text">
                    اسم الشركة
                  </label>
                  <h2 class="secondary--text title">
                    {{ company.name }}
                  </h2>
                </div>
                <v-row class="ma-0">
                  <v-col md="4" sm="6" cols="12">
                    <div>
                      <label class="fourtly--text">
                        رقم الهاتف
                      </label>
                      <h2 class="secondary--text title">
                        {{ company.phone_number }}
                      </h2>
                    </div>
                  </v-col>
                  <v-col md="4" sm="6" cols="12">
                    <div>
                      <label class="fourtly--text">
                        الإيميل
                      </label>
                      <h2 class="secondary--text title">
                        {{ company.email }}
                      </h2>
                    </div>
                  </v-col>
                  <v-col md="4" sm="6" cols="12">
                    <div>
                      <label class="fourtly--text">
                        العنوان
                      </label>
                      <h2 class="secondary--text title">
                        {{ company.address }}
                      </h2>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="2" cols="12" class="text-left">
                <v-dialog
                  v-model="companyDialog"
                  class="overflow-hidden"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    outlined
                    small
                    :block="$vuetify.breakpoint.smAndDown"
                    class="subtitle-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                    <v-icon color="primary" left>
                      mdi-pencil
                    </v-icon>
                    تعديل
                    </v-btn>
                  </template>
                  <v-card class="d-flex flex-column overflow-hidden">
                    <v-card-title>
                      <v-btn
                        icon
                        @click="companyDialog = false"
                        class="ml-1"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <span class="text-h5">تعديل معلومات الشركة</span>
                    </v-card-title>

                    <v-card-text class="overflow-auto">
                      <v-container class="px-8">
                        <ValidationObserver ref="company">
                          <ValidationProvider v-slot="{ errors }" name="اسم الشركة" rules="required|min:3|max:50">
                            <v-text-field
                              v-model="companyInfo.name"
                              solo
                              flat
                              outlined
                              label="اسم الشركة"
                              hide-details="auto"
                              :error-messages="errors"
                              class="rounded-lg mb-3"
                            />
                          </ValidationProvider>
                          <ValidationProvider v-slot="{ errors }" name="رقم الهاتف" rules="required|min:3|max:12">
                            <v-text-field
                              v-model="companyInfo.phone_number"
                              solo
                              flat
                              outlined
                              label="رقم الهاتف"
                              hide-details="auto"
                              :error-messages="errors"
                              class="rounded-lg mb-3"
                              @keypress="isNumber"
                            />
                          </ValidationProvider>
                          <ValidationProvider v-slot="{ errors }" name="البريد الالكتروني" rules="required|email">
                            <v-text-field
                              v-model="companyInfo.email"
                              solo
                              flat
                              outlined
                              label="البريد الالكتروني"
                              hide-details="auto"
                              :error-messages="errors"
                              class="rounded-lg mb-3"
                            />
                          </ValidationProvider>
                          <ValidationProvider v-slot="{ errors }" name="عنوان الشركة" rules="required|min:3|max:50">
                            <v-text-field
                              v-model="companyInfo.address"
                              solo
                              flat
                              outlined
                              label="عنوان الشركة"
                              hide-details="auto"
                              :error-messages="errors"
                              class="rounded-lg mb-3"
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
                            @click="saveCompany"
                          >
                            حفظ
                          </v-btn>
                        </div>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div class="my-6">
      <v-row class="my-0">
        <v-col md="4" cols="12">
          <v-card rounded="xl" outlined height="210" class="card-shadow">
            <v-card-title>
              <v-avatar color="#fef9c0" size="62">
                <v-icon color="#e6d410" class="text-h4">
                  mdi-map-marker
                </v-icon>
              </v-avatar>

              <v-spacer />

              <!-- <v-dialog
                v-model="addressDialog"
                class="overflow-hidden"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                  color="primary"
                  outlined
                  small
                  :block="$vuetify.breakpoint.smAndDown"
                  class="subtitle-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                  <v-icon color="primary" left>
                    mdi-pencil
                  </v-icon>
                  تعديل
                  </v-btn>
                </template>
                <v-card class="d-flex flex-column overflow-hidden">
                  <v-card-title>
                    <v-btn
                      icon
                      @click="addressDialog = false"
                      class="ml-1"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <span class="text-h5">تعديل عنوان الشركة</span>
                  </v-card-title>

                  <v-card-text class="overflow-auto">
                    <v-container class="px-8">
                      <ValidationObserver ref="address">
                        <ValidationProvider v-slot="{ errors }" name="عنوان الشركة" rules="required|min:3|max:50">
                          <v-text-field
                            v-model="address"
                            solo
                            flat
                            outlined
                            label="عنوان الشركة"
                            hide-details="auto"
                            :error-messages="errors"
                            class="rounded-lg"
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
                          @click="saveAddress"
                        >
                          حفظ
                        </v-btn>
                      </div>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog> -->
            </v-card-title>
            <v-card-text>
              <v-list three-line class="pa-0">
                <v-list-item class="pa-0">
                  <v-list-item-content>
                    <v-list-item-title class="fourtly--text title">
                      عنوان الشركة
                    </v-list-item-title>
                    <v-list-item-subtitle class="secondary--text title">
                      {{ address }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="4" cols="12">
          <v-card rounded="xl" outlined height="210" class="card-shadow">
            <v-card-title>
              <v-avatar color="#ccf8e9" size="62">
                <v-icon color="#00db8f" class="text-h4">
                  mdi-circle-slice-5
                </v-icon>
              </v-avatar>

              <v-spacer />

              <!-- <v-btn
                color="primary"
                outlined
                small
                :block="$vuetify.breakpoint.smAndDown"
                class="subtitle-2"
              >
                <v-icon color="primary" left>
                  mdi-pencil
                </v-icon>
                تعديل
              </v-btn> -->
            </v-card-title>
            <v-card-text>
              <label class="fourtly--text title">
                ساعات عمل الشركة
              </label>
              <h2 class="secondary--text title">
                5:00 - 8:00
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="4" cols="12">
          <v-card rounded="xl" outlined height="210" class="card-shadow">
            <v-card-title>
              <v-avatar color="#d6e7ef" size="62">
                <v-icon color="#0083b0" class="text-h4">
                  mdi-account-group
                </v-icon>
              </v-avatar>

              <v-spacer />

              <!-- <v-btn
                color="primary"
                outlined
                small
                :block="$vuetify.breakpoint.smAndDown"
                class="subtitle-2"
              >
                <v-icon color="primary" left>
                  mdi-pencil
                </v-icon>
                تعديل
              </v-btn> -->
            </v-card-title>
            <v-card-text>
              <label class="fourtly--text title">
                عدد موظفين الشركة
              </label>
              <h2 class="secondary--text title">
                <span class="ml-2">{{ staffNum }}</span><span>موظف</span>
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
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
  middleware: 'isVisit',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  async asyncData ({ app, $axios }) {
    try {
      const _user = app.$cookies.get('admin')
      console.log('token: ', app.$cookies.get('admin_token'))
      const user = await $axios.$get(`/users/${_user.id}`, {
        headers: {
          Authorization: app.$cookies.get('admin_token')
        }
      })
      const resUsers = await $axios.$get('/users', {
        headers: {
          Authorization: app.$cookies.get('admin_token')
        }
      })
      console.log('users: ', resUsers)
      // const _company = app.$cookies.get('company')
      // console.log('_company: ', _company)
      // const company = await $axios.$get(`/companies/${_company.id}`)
      // console.log(company)
      const { data } = await $axios.$get('/companies')
      console.log('companies: ', data)
      const company = data[data.length - 1]
      console.log('company: ', company)
      const shift = await $axios.$get('/companies')
      console.log('shift: ', shift)
      return {
        company,
        companyInfo: company,
        address: company.address,
        user: user.data,
        staffNum: resUsers.data.length
        // previewImg: `http://127.0.0.1:8000/${company.data.image}`
      }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      companyDialog: false,
      addressDialog: false,
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
    saveAddress () {
      this.$refs.address.validate().then(async (noErrors) => {
        if (noErrors) {
          try {
            this.loading = true
            await console.log(this.address)
            this.loading = false
            this.addressDialog = false
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    saveCompany () {
      this.$refs.company.validate().then(async (noErrors) => {
        if (noErrors) {
          try {
            this.loading = true
            const formData = new FormData()
            for (const key in this.companyInfo) {
              formData.set(key, this.companyInfo[key])
            }
            const company = await this.$axios.$patch(`/companies/${this.companyInfo.id}`, formData, {
              headers: {
                Authorization: this.$cookies.get('admin_token')
              }
            })
            console.log(company)
            this.company = this.companyInfo
            this.loading = false
            this.companyDialog = false
          } catch (error) {
            console.log(error)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.avatar {
  border: 2px solid #00a4dc;
}
</style>
