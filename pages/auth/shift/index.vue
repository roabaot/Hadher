<template>
  <v-container class="full-height">
    <v-row justify="center" align="center" class="full-height">
      <v-col lg="5" md="6" sm="6" cols="12">
        <v-card class="card-shadow rounded-xl">
          <v-card-text class="pa-4">
            <v-img src="/img/logo.png" height="160" width="400" class="mx-auto" />
            <h2 class="text-h4 font-weight-bold text-center grey--text text--darken-4">
              فترة العمل
            </h2>

            <div class="pt-8">
              <v-container>
                <ValidationObserver ref="observer">
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
                          <ValidationProvider v-slot="{ errors }" name="بداية فترة" rules="required">
                            <v-text-field
                              v-model="start"
                              label="من"
                              :error-messages="errors"
                              append-icon="mdi-clock-time-four-outline"
                              readonly
                              outlined
                              class="rounded-lg subtitle-2"
                              v-bind="attrs"
                              v-on="on"
                            />
                          </ValidationProvider>
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
                          <ValidationProvider v-slot="{ errors }" name="نهاية الفترة" rules="required">
                            <v-text-field
                              v-model="end"
                              label="إلى"
                              :error-messages="errors"
                              append-icon="mdi-clock-time-four-outline"
                              readonly
                              outlined
                              class="rounded-lg subtitle-2"
                              v-bind="attrs"
                              v-on="on"
                            />
                          </ValidationProvider>
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
      menu: false,
      menu2: false,
      start: '',
      end: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
