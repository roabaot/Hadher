<template>
  <v-app>
    <CoreDrawer :drawer="drawer" @drawer="drawer = $event" />
    <v-main class="grey lighten-5">
      <v-app-bar
        v-if="!$vuetify.breakpoint.mdAndUp"
        dense
        flat
        color="transparent"
      >
        <v-app-bar-nav-icon @click="drawer = true" />
      </v-app-bar>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false
    }
  },
  mounted () {
  }
}
</script>
