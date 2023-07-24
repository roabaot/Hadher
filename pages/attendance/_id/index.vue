<template>
  <v-container class="pa-12">
    <div>
      <v-card rounded="xl" outlined>
        <v-card-title>
          <v-row>
            <v-col md="3" cols="12" class="align-self-center">
              <v-list-item>
                <v-list-item-avatar class="avatar" size="48">
                  <v-img src="/img/avatar.png" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="secondary--text">
                    حمزة عمر العمودي
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col md="3" cols="12">
              <div>
                <div class="subtitle-2 mb-2">
                  من
                </div>
                <v-menu
                  ref="fromMenu"
                  v-model="fromMenu"
                  :close-on-content-click="false"
                  :return-value.sync="fromDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-combobox
                      v-model="fromDate"
                      solo
                      flat
                      outlined
                      background-color="#f5f7f7"
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-combobox>
                  </template>
                  <v-date-picker
                    v-model="fromDate"
                    no-title
                    scrollable
                    @change="$refs.fromMenu.save(fromDate)"
                  />
                </v-menu>
              </div>
            </v-col>
            <v-col md="3" cols="12">
              <div>
                <div class="subtitle-2 mb-2">
                  إلى
                </div>
                <v-menu
                  ref="toMenu"
                  v-model="toMenu"
                  :close-on-content-click="false"
                  :return-value.sync="toDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-combobox
                      v-model="toDate"
                      solo
                      flat
                      outlined
                      background-color="#f5f7f7"
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-combobox>
                  </template>
                  <v-date-picker
                    v-model="toDate"
                    no-title
                    scrollable
                    @change="$refs.toMenu.save(toDate)"
                  />
                </v-menu>
              </div>
            </v-col>
            <v-col md="3" cols="12" class="align-self-center">
              <v-btn block color="primary white--text" depressed class="rounded-lg">
                <v-icon left>
                  mdi-plus
                </v-icon>
                إضافة إجازة
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="info"
        >
        <template v-slot:top>
          <v-dialog
            v-model="statusDialog"
            class="overflow-hidden"
            max-width="500px"
          >
            <v-card class="d-flex flex-column overflow-hidden">
              <v-card-title>
                <v-btn
                  icon
                  @click="statusDialog = false"
                  class="ml-1"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <span class="text-h5">تعديل الحضور</span>
              </v-card-title>

              <v-card-text class="overflow-auto">
                <v-container class="px-8">
                  <ValidationObserver ref="attendance">
                    <ValidationProvider v-slot="{ errors }" name="حالة الحضور" rules="required">
                      <v-autocomplete
                        v-model="editedItem.status"
                        :items="status"
                        item-text="text"
                        item-value="text"
                        solo
                        flat
                        outlined
                        label="حالة الحضور"
                        hide-details="auto"
                        :error-messages="errors"
                        class="rounded-lg"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </ValidationObserver>

                  <div class="my-3">
                    <v-btn
                      color="primary"
                      block
                      x-large
                      depressed
                      class="rounded-lg"
                      @click="saveAttendance"
                    >
                      التالي
                    </v-btn>
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-chip
              :color="getColor(item.status).chip"
              dark
              class="px-8"
            >
              <span :style="`color: ${getColor(item.status).text}`">
                {{ item.status }}
              </span>
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              text
              :input-value="true"
              color="primary"
              :class="['rounded-lg', $vuetify.rtl ? 'ml-3' : 'mr-3']"
              @click="editItem(item)"
            >
              <v-icon small :class="$vuetify.rtl ? 'ml-2' : 'mr-2'">
                mdi-pencil
              </v-icon>
              تعديل
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      fromMenu: false,
      fromDate: '',
      toMenu: false,
      toDate: '',
      headers: [
        { text: 'التاريخ', value: 'date', align: 'center' },
        { text: 'وقت الحضور', value: 'start', align: 'center' },
        { text: 'وقت الإنصراف', value: 'end', align: 'center' },
        { text: 'ساعات العمل', value: 'time', align: 'center' },
        { text: 'الحالة', value: 'status', align: 'center' },
        { text: '', value: 'actions', align: 'center', sortable: false }
      ],
      info: [
        {
          date: '01/11/2023',
          start: '8:00',
          end: '5:00',
          time: '9',
          status: 'حاضر'
        },
        {
          date: '01/11/2023',
          start: '8:00',
          end: '5:00',
          time: '9',
          status: 'إجازة'
        },
        {
          date: '01/11/2023',
          start: '8:00',
          end: '5:00',
          time: '9',
          status: 'غائب'
        },
        {
          date: '01/11/2023',
          start: '8:00',
          end: '5:00',
          time: '9',
          status: 'حاضر'
        },
        {
          date: '01/11/2023',
          start: '8:00',
          end: '5:00',
          time: '9',
          status: 'حاضر'
        },
        {
          date: '01/11/2023',
          start: '8:00',
          end: '5:00',
          time: '9',
          status: 'إجازة'
        },
        {
          date: '01/11/2023',
          start: '8:00',
          end: '5:00',
          time: '9',
          status: 'غائب'
        }
      ],
      editedIndex: -1,
      editedItem: {
        date: '',
        start: '',
        end: '',
        time: '',
        status: ''
      },
      defaultItem: {
        date: '',
        start: '',
        end: '',
        time: '',
        status: ''
      },
      statusDialog: false
    }
  },
  dialog (val) {
    val || this.close()
  },
  methods: {
    getColor (status) {
      if (status === 'حاضر') {
        return {
          chip: '#ccf8e9',
          text: '#00526e'
        }
      } else if (status === 'إجازة') {
        return {
          chip: '#fef9c0',
          text: '#F57F17'
        }
      } else {
        return {
          chip: '#f8d1ce',
          text: '#2c0502'
        }
      }
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.$refs.observer.reset()
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      this.$refs.observer.validate().then((noErrors) => {
        if (noErrors) {
          try {
            if (this.editedIndex > -1) {
              Object.assign(this.staffs[this.editedIndex], this.editedItem)
            } else {
              this.infoDialog = true
              this.staffs.push(this.editedItem)
            }
            this.close()
          } catch (error) {
            console.log(error)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  border: thin solid #d8dadb;
}
</style>
