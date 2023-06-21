<template>
  <v-container class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col lg="5" md="6" sm="6" cols="12">
        <v-card class="card-shadow rounded-xl">
          <v-card-text class="pa-4">
            <v-img src="/img/logo.png" height="135" width="350" class="mx-auto" />
            <h2 class="text-h5 font-weight-bold text-center grey--text text--darken-4">
              فترة العمل
            </h2>

            <div class="pt-8">
              <v-container>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-row>
                    <v-col cols="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="start"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="start"
                            label="من"
                            :error-messages="errors"
                            append-icon="mdi-clock-time-four-outline"
                            readonly
                            outlined
                            class="rounded-lg subtitle-2"
                            :rules="[v => !!v || 'بداية الفترة ضرورية']"
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-if="menu"
                          v-model="start"
                          full-width
                          @click:minute="$refs.menu.save(start)"
                        />
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="end"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="end"
                            label="إلى"
                            :error-messages="errors"
                            append-icon="mdi-clock-time-four-outline"
                            readonly
                            outlined
                            class="rounded-lg subtitle-2"
                            :rules="[v => !!v || 'نهاية الفترة ضرورية']"
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="end"
                          full-width
                          @click:minute="$refs.menu2.save(end)"
                        />
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-checkbox
                    v-model="enableShift"
                    label="تحديد فترة السماح للتحضير"
                  ></v-checkbox>
                  <v-expand-transition>
                    <v-row v-show="enableShift">
                      <v-col cols="6">
                        <v-menu
                          ref="menu3"
                          v-model="menu3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="startShift"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="startShift"
                              label="من"
                              :error-messages="errors"
                              append-icon="mdi-clock-time-four-outline"
                              readonly
                              outlined
                              class="rounded-lg subtitle-2"
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-time-picker
                            v-if="menu3"
                            v-model="startShift"
                            full-width
                            @click:minute="$refs.menu3.save(startShift)"
                          />
                        </v-menu>
                      </v-col>
                      <v-col cols="6">
                        <v-menu
                          ref="menu4"
                          v-model="menu4"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="endShift"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="endShift"
                              label="إلى"
                              :error-messages="errors"
                              append-icon="mdi-clock-time-four-outline"
                              readonly
                              outlined
                              class="rounded-lg subtitle-2"
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-time-picker
                            v-if="menu4"
                            v-model="endShift"
                            full-width
                            @click:minute="$refs.menu4.save(endShift)"
                          />
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-expand-transition>
                </v-form>
                <div class="my-3">
                  <v-btn
                    color="primary"
                    block
                    x-large
                    depressed
                    class="rounded-lg"
                    @click="onShift"
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
export default {
  layout: 'none',
  data () {
    return {
      menu: false,
      menu2: false,
      start: '',
      end: '',
      menu3: false,
      menu4: false,
      startShift: '',
      endShift: '',
      enableShift: false
    }
  },
  methods: {
    onShift () {
      const isValid = this.$refs.form.validate()
      if (isValid) {
        try {
          this.loading = true
          this.$nuxt.$router.push('/')
          this.loading = false
        } catch (error) {
          console.log(error)
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
