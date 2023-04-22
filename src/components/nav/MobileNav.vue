<template>
  <div class="mobile-nav">
    <div class="nav-bar">
      <div class="nav-bar_header horizontal-layout align-center">
        <div class="horizontal-layout align-center" _style="max-width: 80%;">
          <button v-on:click="onExpandMenu">
            <font-awesome-icon icon="fa-solid fa-bars" />
          </button>
          <span class="overflow-text">{{ $store.state.headerParams.title }}</span>
        </div>
      </div>
    </div>
    <section>
      <b-sidebar type="is-light" :fullheight="fullheight" :fullwidth="fullwidth" :overlay="overlay" :right="right" v-model="isExpanded" class="mobileSidebar topMargin">
        <div class="p-1">
          <div class="nav-user-block">
            <div class="block vertical-layout align-start">
              <h2>{{ $store.state.user.userFullname }}</h2>
              <div class="horizontal-layout align-center">
                <div><user-icon /></div>
                <short-user-info :user="$store.state.user" />
              </div>
            </div>
            <b-menu>
              <route-links />
            </b-menu>
          </div>
          <div class="footer-button">
            <a @click="openDevDialog" style="display: none">
              <div class="footer-icon">
                <font-awesome-icon icon="fa-solid fa-circle-question" class="fasIcon" />
              </div>
            </a>
 
            <a @click="logout">
              <div class="footer-icon">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="fasIcon" />
              </div>
              <h2>{{ $t("btn.logout") }}</h2>
            </a>
            
          </div>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
import UserIcon from "@/components/UserIcon.vue";
import RouteLinks from "@/components/RouteLinks.vue";
import ShortUserInfo from "@/components/ShortUserInfo.vue";
// import MockService from "@/services/MockService.js";

export default {
  name: "MobileNav",
  data() {
    return {
      isExpanded: false,
      overlay: false,
      fullheight: false,
      fullwidth: false,
      right: false,
      user: {}
    };
  },
  computed: {
    currentRouteTitle() {
      return this.$t("title." + this.$route.name);
    }
  },
  methods: {
    onExpandMenu() {
      this.isExpanded = true;
    },
    openDevDialog() {
      this.$refs.popup.open();
    }
  },
  watch: {
    $route() {
      this.isExpanded = false;
    }
  },
  components: {
    ShortUserInfo,
    UserIcon,
    RouteLinks
  }
};
</script>

<style lang="scss">
$primaryColor: #2c3e50;

.mobile-nav,
.mobileSidebar {
  display: none;
  position: relative;
  z-index: 1;
  // overflow: auto;
}

@media screen and (max-width: 600px) and (orientation: portrait) {
  .mobile-nav,
  .mobileSidebar {
    display: block !important;
  }
}

@media screen and (max-height: 600px) and (orientation: landscape) and (max-width: 900px) {
  .mobile-nav,
  .mobileSidebar {
    display: block !important;
  }
}

.mobileSidebar .p-1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .nav-user-block {
    display: flex;
    flex-direction: column;
    height: 70%;
    .menu {
      overflow: auto;
    }

    .user-info span {
      max-width: 150px;
      overflow-wrap: break-word;
    }
  }
}

.mobileSidebar .p-1::-webkit-scrollbar {
  display: none;
}

.nav-bar {
  background-color: $primaryColor;
  width: 100%;
}

.nav-bar_header {
  padding: 0.825rem 0.3rem;
  height: 3rem;
  justify-content: space-between;
  color: #ffffff;
}

.nav-bar_header span {
  margin-left: 0.5rem;
}

button {
  background-color: inherit;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

button svg {
  font-size: 1.5rem;
}

.nav-bar_header .imgLogo {
  width: 3rem;
}

.nav-bar_header img {
  width: 3rem;
}

.mobileSidebar .p-1 {
  //height: calc(100vh - 3rem) !important;
  height: 100% !important;
  //height: 100vh !important;
  //height: calc(var(--vh, 1vh) * 100);
}

.mobileSidebar label {
  cursor: pointer;
}

.b-sidebar.mobileSidebar .sidebar-content.is-light {
  background-color: #ffffff;
  height: 100% !important;
}

.mobileSidebar .menu-list a {
  color: $primaryColor;
  opacity: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    width: 30px;
  }
}

.mobileSidebar .menu-list a.router-link-exact-active.router-link-active {
  opacity: 100%;
}

.mobileSidebar .block h2 {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.overflow-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.mobileSidebar .footer-button {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}
.mobileSidebar .footer-button a {
  display: flex;
  text-align: center;
  flex-direction: row;
  color: #2c3e50;
  opacity: 70%;
  padding: 0.5em 0.75em;
  border-radius: 2px;
  align-items: center;

  h2 {
    font-size: 0.725rem;
  }

  &:hover {
    opacity: 100%;
  }

  .footer-icon {
    margin-bottom: 0.1rem;
    svg {
      font-size: 1rem;
      width: 30px;
    }
  }
}
</style>
