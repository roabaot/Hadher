<template>
  <v-container :class="['pa-12', !$vuetify.breakpoint.mdAndUp ? 'pt-0' : '']">
    <v-card outlined class="card">
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="staffs"
          :search="search"
          class="overflow-hidden"
        >
          <template v-slot:top>
            <StaffNewUser :dialog="infoDialog" :info="info" @close="infoDialog = false" />
            <v-toolbar
              flat
            >
              <v-toolbar-title class="text-h5 secondary--text">
                الموظفين
              </v-toolbar-title>
              <v-spacer />

              <v-text-field
                v-if="$vuetify.breakpoint.mdAndUp"
                v-model="search"
                solo
                prepend-inner-icon="mdi-magnify"
                background-color="#f5f7f7"
                color="#616d71"
                label="أبحث عن موظف"
                flat
                hide-details
                class="rounded-lg search"
              />

              <v-spacer />
              <v-dialog
                v-model="dialog"
                class="overflow-hidden"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    :class="['rounded-lg', $vuetify.breakpoint.mdAndUp ? 'mb-2' : '']"
                    depressed
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon :class="$vuetify.breakpoint.mdAndUp ? $vuetify.rtl ? 'ml-3' : 'mr-3' : ''">
                      mdi-plus
                    </v-icon>
                    <span v-if="$vuetify.breakpoint.mdAndUp">
                      إضافة موظف
                    </span>
                  </v-btn>
                </template>
                <v-card height="calc(100vh - 62px)" class="d-flex flex-column overflow-hidden">
                  <v-card-title>
                    <v-btn
                      icon
                      @click="dialog = false"
                      class="ml-1"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text class="overflow-auto">
                    <div class="full-width d-flex justify-center mt-9">
                      <client-only>
                        <v-file-input
                          ref="uploader"
                          v-model="editedItem.image"
                          accept="image/*"
                          name="صور العرض"
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
                          <ValidationProvider v-slot="{ errors }" name="اسم المستخدم" rules="required|min:3|max:50">
                            <v-text-field
                              v-model="editedItem.name"
                              label="اسم المستخدم"
                              outlined
                              required
                              :error-messages="errors"
                              class="rounded-lg subtitle-2"
                            />
                          </ValidationProvider>
                          <!-- <ValidationProvider v-slot="{ errors }" name="كلمة المرور" rules="required|min:8|max:16">
                            <v-text-field
                              v-model="editedItem.password"
                              label="كلمة المرور"
                              outlined
                              required
                              :error-messages="errors"
                              class="rounded-lg subtitle-2"
                            />
                          </ValidationProvider> -->
                          <ValidationProvider v-slot="{ errors }" name="رقم الهاتف" rules="required|numeric">
                            <v-text-field
                              v-model="editedItem.phoneNumber"
                              label="رقم الهاتف"
                              outlined
                              required
                              :error-messages="errors"
                              class="rounded-lg subtitle-2"
                              @keypress="isNumber"
                            />
                          </ValidationProvider>
                          <ValidationProvider v-slot="{ errors }" name="البريد الالكتروني" rules="required|email">
                            <v-text-field
                              v-model="editedItem.email"
                              label="البريد الالكتروني"
                              :error-messages="errors"
                              outlined
                              required
                              class="rounded-lg subtitle-2"
                            />
                          </ValidationProvider>
                          <!-- <ValidationProvider v-slot="{ errors }" name="عنوان الشركة" rules="min:3|max:100">
                            <v-text-field
                              v-model="editedItem.address"
                              label="عنوان الشركة"
                              :error-messages="errors"
                              outlined
                              required
                              class="rounded-lg subtitle-2"
                            />
                          </ValidationProvider> -->
                        </ValidationObserver>

                        <div class="my-3">
                          <v-btn
                            color="primary"
                            block
                            x-large
                            depressed
                            class="rounded-lg"
                            @click="save"
                          >
                            {{ formTitle }}
                          </v-btn>
                        </div>
                      </v-container>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">
                    <v-btn
                      icon
                      large
                      @click="dialogDelete = false"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="text-center mt-4 pb-12 mx-auto" style="width: 75%;">
                    <v-icon x-large class="error--text text-h2 mb-4">
                      mdi-alert-circle-outline
                    </v-icon>
                    <div class="text-center justify-center">
                      <h2 class="title black--text">
                        هل أنت متاكد من حذف {{ editedItem.name }}
                      </h2>
                    </div>
                  </v-card-text>
                  <v-card-actions class="px-6 pb-4">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error"
                      input-value="true"
                      text
                      width="48%"
                      class="rounded-lg"
                      @click="deleteItemConfirm"
                    >
                      <v-icon color="error">
                        mdi-trash-can
                      </v-icon>
                      حذف
                    </v-btn>
                    <v-btn color="primary" depressed width="48%" class="rounded-lg" @click="dialogDelete = false">تراجع</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
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
              text
              :input-value="true"
              color="error"
              class="rounded-lg"
              @click="deleteItem(item)"
            >
              <v-icon small :class="$vuetify.rtl ? 'ml-2' : 'mr-2'">
                mdi-delete
              </v-icon>
              حذف
            </v-btn>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-list-item>
              <v-list-item-avatar>
                <!-- <v-img src="/img/avatar.png"></v-img> -->
                <img :src="item.image ? `http://127.0.0.1:8000/${item.image}` : '/img/avatar.png'" class="fill-size">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-right">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
    infoDialog: false,
    dialogDelete: false,
    staffs: [],
    headers: [
      { text: 'الموظف', align: 'center', value: 'name' },
      { text: 'الإيميل', align: 'center', value: 'email' },
      { text: 'رقم الهاتف', align: 'center', value: 'phoneNumber' },
      { text: '', value: 'actions', align: 'left', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      image: null,
      name: '',
      password: '',
      email: '',
      phoneNumber: '',
      address: ''
    },
    defaultItem: {
      image: null,
      name: '',
      password: '',
      email: '',
      phoneNumber: '',
      address: ''
    },
    search: '',
    previewImg: null,
    uploadImg: null,
    info: null
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'إضافة موظف' : 'تعديل موظف'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    infoDialog (val) {
      if (val === false) {
        this.info = null
      }
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.staffs = [
        {
          id: 1,
          name: 'أحمد العكبري',
          email: 'test@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 2,
          name: 'حمزة العمودي',
          email: 'test2@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 3,
          name: 'سالم جابر',
          email: 'test3@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 4,
          name: 'خالد دلمخ',
          email: 'test4@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 5,
          name: 'نور أحمد',
          email: 'test5@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 6,
          name: 'زينب خالد',
          email: 'test6@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 7,
          name: 'يونس المعاري',
          email: 'test7@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 8,
          name: 'أحمد الشاطري',
          email: 'test8@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 9,
          name: 'حذيفة مديحج',
          email: 'test9@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 10,
          name: 'محمد الغامدي',
          email: 'test10@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 11,
          name: 'راحم الدوسري',
          email: 'test11@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 12,
          name: 'لؤي محمد',
          email: 'test12@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 13,
          name: 'خديجة محمد',
          email: 'test13@test.com',
          phoneNumber: '+9645345343',
          address: ''
        },
        {
          id: 14,
          name: 'سعود الزهراني',
          email: 'test14@test.com',
          phoneNumber: '+9645345343',
          address: ''
        }
      ]
    },
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

    editItem (item) {
      this.editedIndex = this.staffs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.staffs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      try {
        this.staffs.splice(this.editedIndex, 1)
        this.closeDelete()
      } catch (error) {
        console.log(error)
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.$refs.observer.reset()
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.previewImg = ''
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      this.$refs.observer.validate().then((noErrors) => {
        if (noErrors) {
          try {
            const formData = new FormData()
            for (const key in this.editedItem) {
              formData.set(key, this.editedItem[key])
            }
            if (this.editedIndex > -1) {
              Object.assign(this.staffs[this.editedIndex], this.editedItem)
            } else {
              this.info = this.editedItem
              this.infoDialog = true
              this.staffs.push(this.editedItem)
            }
            this.close()
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    selectedImage () {
      this.previewImg = null
      this.previewImg = URL.createObjectURL(this.editedItem.image)
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
