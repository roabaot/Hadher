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
                  <v-img :src="previewImg ? previewImg : '/logo.png'" class="fill-size" />
                </v-avatar>
              </v-col>
              <v-col md="8" cols="12">
                <div>
                  <label class="fourtly--text">
                    اسم الشركة
                  </label>
                  <h2 class="secondary--text title">
                    شركة ترانس للتقنية
                  </h2>
                </div>
                <v-row class="ma-0">
                  <v-col md="4" sm="6" cols="12">
                    <div>
                      <label class="fourtly--text">
                        رقم الهاتف
                      </label>
                      <h2 class="secondary--text title">
                        +967476547
                      </h2>
                    </div>
                  </v-col>
                  <v-col md="4" sm="6" cols="12">
                    <div>
                      <label class="fourtly--text">
                        الإيميل
                      </label>
                      <h2 class="secondary--text title">
                        test@test.com
                      </h2>
                    </div>
                  </v-col>
                  <v-col md="4" sm="6" cols="12">
                    <div>
                      <label class="fourtly--text">
                        العنوان
                      </label>
                      <h2 class="secondary--text title">
                        ABC@gmail.com
                      </h2>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="2" cols="12" class="text-left">
                <v-btn
                  color="primary"
                  outlined
                  :block="$vuetify.breakpoint.smAndDown"
                  class="subtitle-2"
                >
                  <v-icon color="primary" left>
                    mdi-pencil
                  </v-icon>
                  تعديل
                </v-btn>
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

              <v-btn
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
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list three-line class="pa-0">
                <v-list-item class="pa-0">
                  <v-list-item-content>
                    <v-list-item-title class="fourtly--text title">
                      عدد موظفين الشركة
                    </v-list-item-title>
                    <v-list-item-subtitle class="secondary--text title">
                      اليمن ,حضرموت , المكلا ...الديس ,شارع الشهداء4848
                      اليمن ,حضرموت , المكلا ...الديس ,شارع الشهداء4848
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

              <v-btn
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
              </v-btn>
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
                  mdi-map-marker
                </v-icon>
              </v-avatar>

              <v-spacer />

              <v-btn
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
              </v-btn>
            </v-card-title>
            <v-card-text>
              <label class="fourtly--text title">
                عدد موظفين الشركة
              </label>
              <h2 class="secondary--text title">
                <span class="ml-2">105</span><span>موظف</span>
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    try {
      const res = await $axios.$get('http://127.0.0.1:8000/api/users')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      previewImg: null
    }
  }
}
</script>

<style lang="scss">
.avatar {
  border: 2px solid #00a4dc;
}
</style>
