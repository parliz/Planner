<template>
  <div id="app">
    <the-header />
    <div class="main">
      <nav-bar class="navBar"/>
      <div class="page-content">
        <div class="view">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import NavBar from "@/components/nav/NavBar.vue";
import TheHeader from "@/components/TheHeader.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    currentRoute() {
      return this.$t(this.$route.name);
    },
    ...mapGetters({
      isLoggedIn: "secure/isLoggedIn"
    })
  },
  created() {
    // this.changeHeaderParam();
    // MockService.getUser().then((oResponse) => {
    //   this.$store.state.user = oResponse.data;
    // });
  },
  watch: {
    $route() {
      // this.changeHeaderParam();
    }
  },
  methods: {
    // changeHeaderParam() {
    //   this.updateHeader();
    // }
  },
  components: {
    TheHeader,
    NavBar
  }
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
}
.main {
  display: flex;
  .page-content {
    width: 100%;
    .view {
    height: 100%;
    width: 100%;
    padding: 2rem;
  }
  }
}
.navBar {
  width: 15rem;
}
/*@media screen and (max-width: 600px) {
  .page-сontent .page-header {
    display: none;
  }
}*/


</style>



<!-- this.$moment(this.rangePicker[0]).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"); -->
