<template>
  <div id="app">
    <desktop-nav-bar class="navBar"/>
    <div class="page-сontent">
      <div class="view">
        <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import MockService from "@/services/MockService";
import DesktopNavBar from "@/components/DesktopNavBar.vue"
import { mapGetters } from 'vuex';

export default {
  computed: {
    currentRoute() {
      return this.$t(this.$route.name);
    },
     ...mapGetters({
      isLoggedIn: 'secure/isLoggedIn',
    }),
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
    },
  },
  methods: {
    // changeHeaderParam() {
    //   this.updateHeader();
    // }
  },
  components: {
    DesktopNavBar
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: row;
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

