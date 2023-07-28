<template>
  <v-navigation-drawer
    v-model="Drawer"
    app
    :permanent="$vuetify.breakpoint.mdAndUp"
    :mini-variant="Mini"
    :right="$vuetify.rtl"
    color="#fcfcfc"
    class="pt-5 card-shadow-2"
  >
    <v-img src="/img/logo.png" width="80%" class="mx-auto" />
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
        to="/attendance"
        nuxt
        exact
      >
        <v-list-item-icon>
          <!-- <SettingIcon width="24" height="24" :color="$route.path === '/settings' ? '#00a4dc' : '#000'" /> -->
          <OptionIcon width="24" height="24" :color="$route.path === '/attendance' ? '#00a4dc' : '#000'" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            الحضور والانصراف
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="py-2 px-4 mb-3">
        <v-btn
          block
          depressed
          color="error white--text"
          class="rounded-lg"
          :disabled="loading"
          @click="signout"
        >
          تسجيل الخروج
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import HomeIcon from '@/components/Icons/Home.vue'
import StaffsIcon from '@/components/Icons/Staffs.vue'
import OptionIcon from '@/components/Icons/Option.vue'
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
    OptionIcon
  },
  data () {
    return {
      loading: false
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
    signout () {
      try {
        this.loading = true
        this.$router.push('/auth/login')
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style>
  .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
    background-color: unset;
  }
</style>
