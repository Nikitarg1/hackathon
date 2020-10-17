<template>
  <div>
    <div class="container--fluid pa-md-16 jarallax widthMobile" style="min-height: 80vh">
      <v-img
          class="jarallax-img"
          src="../../assets/img/qwe.jpg"
          :gradient="this.$vuetify.theme.dark ? 'to bottom, rgba(0,0,0,.2), rgba(0,0,0,.2)' : 'to bottom, rgba(0,0,0,0), rgba(0,0,0,.01)'"
      />

      <div class="container" style="padding-top: 64px; max-width: 1280px;">
        <div class="col-lg-6 col-md-8 col-sm-8 pl-md-16 pl-sm-5 pt-16 customText--text">
          <h1 class="mb-6 text-h2 font-weight-bold">123</h1>
          <p class="" style="font-size: 1.125rem">
            Узнавайте всю актуальную информацию о стройке вашей квартиры самым удобным способом с помощью Rubble и
            Яндекс Алисы.
          </p>
        </div>
      </div>
    </div>

  <div class="container">
    <PeopleSearch/>
  </div>
  </div>
</template>

<script>
import {jarallax} from 'jarallax';
import 'jarallax/dist/jarallax.css'
import PeopleSearch from "@/components/people/PeopleSearch";

export default {
name: "people",
  components:{
    PeopleSearch
  },
  mounted() {
    jarallax(document.querySelectorAll('.jarallax'), {
      type: 'scale', //scale-opacity
      speed: 0.2,
    });
  }
}
</script>

<style scoped>

</style>