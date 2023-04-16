<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar position="static" :expand-on-hover="expandOnHover" :reduce="reduce" open class="customMenu">
        <div class="p-2">
          <b-menu>
            <route-links />
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
import RouteLinks from "@/components/RouteLinks.vue";
export default {
  name: "DesktopNav",
  data() {
    return {
      expandOnHover: false,
      expandWithDelay: false,
      mobile: "hidden",
      reduce: true
    };
  },
  components: {
    RouteLinks
  }
};
</script>

<style lang="scss">
.customMenu .p-2 {
  height: 100vh;
}
.b-sidebar.customMenu .sidebar-content.is-mini {
  width: 15rem;
}
</style>
