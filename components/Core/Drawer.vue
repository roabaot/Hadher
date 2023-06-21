<template>
  <v-navigation-drawer
    v-model="Drawer"
    app
    :permanent="$vuetify.breakpoint.mdAndUp"
    :mini-variant="Mini"
    :right="$vuetify.rtl"
    color="subbackground"
    class="pt-5"
  >
    <v-list>
      <v-list-item
        active-class="primary--text"
        to="/"
        nuxt
        exact
      >
        <v-list-item-icon>
          <HomeIcon width="24" height="24" :color="$route.path === '/' ? '#00a4dc' : '#000'" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            الرئيسية
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        active-class="primary--text"
        to="/staffs"
        nuxt
        exact
      >
        <v-list-item-icon>
          <StaffsIcon width="24" height="24" :color="$route.path === '/staffs' ? '#00a4dc' : '#000'" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            الموظفين
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        active-class="primary--text"
        to="/settings"
        nuxt
        exact
      >
        <v-list-item-icon>
          <SettingIcon width="24" height="24" :color="$route.path === '/settings' ? '#00a4dc' : '#000'" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            الإعدادات
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import HomeIcon from '@/components/Icons/Home.vue'
import StaffsIcon from '@/components/Icons/Staffs.vue'
import SettingIcon from '@/components/Icons/Setting.vue'
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  components: {
    HomeIcon,
    StaffsIcon,
    SettingIcon
  },
  data () {
    return {
    }
  },
  computed: {
    Drawer: {
      get () {
        return this.drawer
      },
      set (drawer) {
        console.log(drawer)
        this.$emit('drawer', drawer)
        return drawer
      }
    },
    Mini: {
      get () {
        return this.mini
      },
      set (mini) {
        this.$emit('mini', mini)
        return mini
      }
    }
  },
  methods: {
    // logout () {
    //   // await this.$auth.logout()
    //   this.$router.push('/login')
    //   this.$store.commit('clearUser')
    // }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>
