<template>
  <div class="page-header">
    <div class="horizontal-layout align-center">
      <b-button v-show="$store.state.headerParams.isNavBack" type="is-primary is-small is-rounded" class="customButton" icon-right="fa-arrow-left" inverted @click="navBack" />
      <h1 class="margin-left">{{ $store.state.headerParams.title }}</h1>
    </div>
    <div class="user-header">
      <UserIcon id="userIcon" @iconClick="openMenuIconClick" />
      <div id="userMenu" class="header-menu-card-content" :style="{ display: isMenuVisible ? 'flex' : 'none' }">
        <short-user-info :user="$store.state.user" />
        <hr class="dropdown-divider" />
        <div class="menu-item">
          <b-button size="is-small" type="is-primary" outlined @click="settingsClick" icon-left="fa-gear" class="customButton">{{ $t("title.settings") }}</b-button>
        </div>
        <div class="menu-item" value="logout">
          <b-button size="is-small" type="is-primary" outlined @click="logoutClick" icon-left="fa-right-from-bracket" class="customButton">{{ $t("btn.logout") }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShortUserInfo from "@/components/commonLib/header/ShortUserInfo.vue";
import UserIcon from "@/components/commonLib/UserIcon.vue";

export default {
  data() {
    return {
      user: {},
      isMenuVisible: false
    };
  },
  watch: {
    $route() {
      this.isMenuVisible = false;
    },
    isMenuVisible(bValue) {
      if (bValue) {
        window.addEventListener("click", this.pageClickEvent);
      } else {
        window.removeEventListener("click", this.pageClickEvent);
      }
    }
  },
  computed: {},
  methods: {
    logoutClick() {
      this.$store.dispatch("secure/logout").then(() => {
        this.$router.push({ path: "/login", replace: true });
      });
    },
    settingsClick() {
      this.$router.push({ path: "/settings", replace: true });
    },
    navBack() {
      this.$router.go(-1);
    },
    openMenuIconClick() {
      this.isMenuVisible = true;
    },
    pageClickEvent(e) {
      let oPanelElement = document.getElementById("userMenu");
      let oIconElement = document.getElementById("userIcon");
      if (!oPanelElement.contains(e.target) && !oIconElement.contains(e.target)) {
        this.isMenuVisible = false;
      }
    }
  },
  components: {
    ShortUserInfo,
    UserIcon
  }
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 5rem;
  place-items: center;
  position: relative;
  z-index: 1;
}

@media screen and (max-width: 600px) and (orientation: portrait) {
  .page-header {
    display: none !important;
  }
}

@media screen and (max-height: 600px) and (orientation: landscape) and (max-width: 900px) {
  .page-header {
    display: none !important;
  }
}

.user-header {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 2rem;


  .header-menu-card-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    top: 3rem;
    right: 0rem;
    background-color: white;
    font-size: 0.8rem;
    box-shadow: 0px 10px 13px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0.5rem;

    .menu-item {
      display: flex;
      gap: 0.6rem;
    }
  }
}

.user-header {
  position: fixed;
  right: 2rem;}

.dropdown-divider {
  margin: 0.1rem 0;
}
</style>
