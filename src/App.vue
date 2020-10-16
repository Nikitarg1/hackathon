<template>
  <v-app>
    <Header :isLoading="isLoading" :valueProgress="valueProgress"></Header>
    <v-main>
      <router-view v-if="!isLoading"></router-view>
    </v-main>

  </v-app>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: 'App',
  components: {
    Header,
  },

  data: () => ({
    isLoading: false,
    valueProgress: 0,
    interval: 0
  }),
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.isLoading = true
      this.valueProgress = 0
      clearInterval(this.interval)

      this.interval = setInterval(() => {
        this.valueProgress += 25
      }, 300)

      setTimeout(() => {
        this.isLoading = false
      }, 1500);
    }
  }
};
</script>
<style scoped>

</style>