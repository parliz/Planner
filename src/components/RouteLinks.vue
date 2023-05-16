<template>
  <b-menu-list class="menu-list">
    <router-link to="/">
      <h2>{{ $t("title.home") }}</h2>
    </router-link>
    <router-link to="/calendar">
      <h2>{{ $t("title.calendar") }}</h2>
    </router-link>
    <router-link to="/projects">
      <h2>{{ $t("title.projects") }}</h2>
    </router-link>
    <router-link to="/lists">
      <h2>{{ $t("title.lists") }}</h2>
    </router-link>
    <router-link to="/settings">
      <h2>{{ $t("title.settings") }}</h2>
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
