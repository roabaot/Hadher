<template>
  <v-app>
    <CoreDrawer />
    <v-main class="grey lighten-5">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
