<template>
  <b-menu-list class="menu-list">
    <!-- <router-link to="/">
      <h2>{{ $t("title.home") }}</h2>
    </router-link> -->
    <router-link to="/calendar">
      <h1>{{ $t("title.calendar") }}</h1>
    </router-link>
    <router-link to="/projects">
      <h1>{{ $t("title.projects") }}</h1>
    </router-link>
    <router-link to="/lists">
      <h1>{{ $t("title.lists") }}</h1>
    </router-link>
    <router-link to="/settings">
      <h1>{{ $t("title.settings") }}</h1>
    </router-link>
  </b-menu-list>
</template>

<script>
export default {
  name: "RouteLinks"
};
</script>

<style>
.menu-list {
  
}
.menu {
  position: fixed;
}
</style>
