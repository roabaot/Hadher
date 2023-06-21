<template>
  <div>
    <v-dialog
      v-model="Dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-btn
            icon
            large
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="text-center mt-4 pb-12 mx-auto" style="width: 75%;">
          <v-icon x-large class="success--text text-h2 mb-4">
            mdi-check-circle-outline
          </v-icon>

          <div class="text-center justify-center">
            <h2 class="title black--text">
              تم إضافة الموظف بنجاح
            </h2>
            <v-card-subtitle class="subtitle">
              أحفظ معلومات حساب الموظف للمشاركة
            </v-card-subtitle>
            <div class="d-flex justify-evenly">
              <label class="thirdly--text">
                اسم المستخدم:
              </label>
              <div class="black--text">
                {{ info.username }}
              </div>
            </div>
            <div class="d-flex justify-evenly">
              <label class="thirdly--text">
                كلمة المرور:
              </label>
              <div class="black--text">
                {{ info.password }}
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {
        return {
          username: 'ahmed',
          password: '****'
        }
      }
    }
  },
  data () {
    return {
      Dialog: this.dialog
    }
  },
  watch: {
    dialog (val) {
      this.Dialog = val
    },
    Dialog (val) {
      if (val === false) {
        this.close()
      }
    }
  },
  methods: {
    close () {
      this.Dialog = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
