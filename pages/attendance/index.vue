<template>
  <v-container class="pa-12">
    <v-card outlined class="card">
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="staffs"
          class="overflow-hidden"
        >
          <template v-slot:top>
            <v-row>
              <v-col md="3" cols="12" class="align-self-center">
                <h2 class="text-h5 secondary--text">
                  الحضور والإنصراف
                </h2>
              </v-col>
              <v-col md="3" cols="12">
                <div>
                  <v-menu
                    ref="dateMenu"
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-combobox
                        v-model="date"
                        solo
                        flat
                        outlined
                        label="تاريخ الإجازة"
                        background-color="#f5f7f7"
                        dense
                        hide-details="auto"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-combobox>
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
                      @change="$refs.dateMenu.save(date)"
                    />
                  </v-menu>
                </div>
              </v-col>
              <v-col md="3" cols="12">
                <div>
                  <div class="subtitle-2 mb-2">
                    عدد الحضور
                  </div>
                  <div class="secondary--text title">
                    {{ attendancePeople }}
                  </div>
                </div>
              </v-col>
              <v-col md="3" cols="12" class="align-self-center">
                <v-btn
                  block
                  color="primary white--text"
                  depressed
                  class="rounded-lg"
                  @click="addHoliday"
                >
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  إضافة إجازة
                </v-btn>
                <!-- <v-dialog
                  v-model="dialog"
                  class="overflow-hidden"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      block
                      color="primary white--text"
                      depressed
                      class="rounded-lg"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left>
                        mdi-plus
                      </v-icon>
                      إضافة إجازة
                    </v-btn>
                  </template>
                  <v-card class="d-flex flex-column overflow-hidden">
                    <v-card-title>
                      <v-btn
                        icon
                        @click="dialog = false"
                        class="ml-1"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <span class="text-h5">إضافة إجازة</span>
                    </v-card-title>

                    <v-card-text class="overflow-auto">
                      <v-container class="px-8">
                        <ValidationObserver ref="vacation">
                          <v-menu
                            ref="vacationMenu"
                            v-model="vacationMenu"
                            :close-on-content-click="false"
                            :return-value.sync="vacationDate"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <ValidationProvider v-slot="{ errors }" name="تاريخ الاجازة" rules="required">
                                <v-combobox
                                  v-model="vacationDate"
                                  solo
                                  flat
                                  outlined
                                  label="تاريخ الاجازة"
                                  hide-details="auto"
                                  readonly
                                  :error-messages="errors"
                                  class="rounded-lg"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-combobox>
                              </ValidationProvider>
                            </template>
                            <v-date-picker
                              v-model="vacationDate"
                              no-title
                              scrollable
                              @change="$refs.vacationMenu.save(vacationDate)"
                            />
                          </v-menu>
                        </ValidationObserver>

                        <div class="my-3">
                          <v-btn
                            color="primary"
                            block
                            x-large
                            depressed
                            class="rounded-lg"
                            @click="saveVacation"
                          >
                            التالي
                          </v-btn>
                        </div>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog> -->
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
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/avatar.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-right">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
            <v-btn
              color="primary white--text"
              depressed
              class="rounded-lg px-8"
              nuxt
              :to="`/attendance/${item.id}`"
            >
              عرض
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
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
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    dialog: false,
    statusDialog: false,
    headers: [
      { text: 'الموظف', align: 'center', value: 'name' },
      { text: 'الحالة', align: 'center', value: 'status' },
      { text: '', value: 'actions', align: 'left', sortable: false }
    ],
    status: [
      {
        id: 1,
        text: 'حاضر'
      },
      {
        id: 2,
        text: 'إجازة'
      },
      {
        id: 3,
        text: 'غائب'
      }
    ],
    staffs: [],
    state: '',
    editedIndex: -1,
    editedItem: {
      id: null,
      status: ''
    },
    defaultItem: {
      id: null,
      status: ''
    },
    dateMenu: false,
    date: '',
    vacationMenu: false,
    vacationDate: '',
    attendanceMenu: false,
    attendanceDate: ''
  }),

  watch: {
    dialog (val) {
      if (val === false) {
        this.vacationDate = ''
      }
    },
    statusDialog (val) {
      val || this.close()
    }
  },

  mounted () {
    this.initialize()
  },

  computed: {
    attendancePeople () {
      let count = 0
      this.staffs.forEach((staff) => {
        if (staff.status === 'حاضر') {
          count += 1
        }
      })
      return count
    }
  },
  methods: {
    initialize () {
      this.staffs = [
        {
          id: 1,
          name: 'أحمد العكبري',
          email: 'test@test.com',
          phoneNumber: '+9645345343',
          status: 'حاضر'
        },
        {
          id: 2,
          name: 'حمزة العمودي',
          email: 'test2@test.com',
          phoneNumber: '+9645345343',
          status: 'حاضر'
        },
        {
          id: 3,
          name: 'سالم جابر',
          email: 'test3@test.com',
          phoneNumber: '+9645345343',
          status: 'إجازة'
        },
        {
          id: 4,
          name: 'خالد دلمخ',
          email: 'test4@test.com',
          phoneNumber: '+9645345343',
          status: 'حاضر'
        },
        {
          id: 5,
          name: 'نور أحمد',
          email: 'test5@test.com',
          phoneNumber: '+9645345343',
          status: 'غائب'
        },
        {
          id: 6,
          name: 'زينب خالد',
          email: 'test6@test.com',
          phoneNumber: '+9645345343',
          status: 'حاضر'
        },
        {
          id: 7,
          name: 'يونس المعاري',
          email: 'test7@test.com',
          phoneNumber: '+9645345343',
          status: 'إجازة'
        },
        {
          id: 8,
          name: 'أحمد الشاطري',
          email: 'test8@test.com',
          phoneNumber: '+9645345343',
          status: 'غائب'
        },
        {
          id: 9,
          name: 'حذيفة مديحج',
          email: 'test9@test.com',
          phoneNumber: '+9645345343',
          status: 'غائب'
        },
        {
          id: 10,
          name: 'محمد الغامدي',
          email: 'test10@test.com',
          phoneNumber: '+9645345343',
          status: 'حاضر'
        },
        {
          id: 11,
          name: 'راحم الدوسري',
          email: 'test11@test.com',
          phoneNumber: '+9645345343',
          status: 'حاضر'
        },
        {
          id: 12,
          name: 'لؤي محمد',
          email: 'test12@test.com',
          phoneNumber: '+9645345343',
          status: 'إجازة'
        },
        {
          id: 13,
          name: 'خديجة محمد',
          email: 'test13@test.com',
          phoneNumber: '+9645345343',
          status: 'غائب'
        },
        {
          id: 14,
          name: 'سعود الزهراني',
          email: 'test14@test.com',
          phoneNumber: '+9645345343',
          status: 'حاضر'
        }
      ]
    },
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

    editItem (item) {
      this.editedIndex = this.staffs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.statusDialog = true
    },

    close () {
      this.statusDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    addHoliday () {
      try {
        this.date = ''
      } catch (error) {
        console.log(error)
      }
    },
    async saveVacation () {
      try {
        this.dialog = false
        this.vacationDate = ''
        this.$refs.vacation.reset()
        await console.log(this.dialog)
      } catch (error) {
        console.log(error)
      }
    },
    async saveAttendance () {
      try {
        this.statusDialog = false
        const item = this.staffs[this.editedIndex]
        item.status = this.editedItem.status
        console.log('item: ', this.editedItem)
        this.staffs.splice(this.editedIndex, 1, item)
        this.attendanceDate = ''
        this.$refs.attendance.reset()
        await this.close()
      } catch (error) {
        console.log(error)
      }
    },
    selectedImage () {
      this.previewImg = null
      this.previewImg = URL.createObjectURL(this.uploadImg)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 20px !important;
  border: solid 1px #d8dadb !important;
}
.search {
  border-radius: 15px !important;
  flex: 4 1 auto !important;
}

.avatar {
  border: 2px dashed #00a4dc;
  cursor: pointer;
}
</style>
