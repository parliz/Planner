<template>
  <div>    
    <mobile-nav/>
    <desktop-nav/>
  </div>
</template>

<script>
import DesktopNav from "@/components/nav/DesktopNav.vue";
import MobileNav from "@/components/nav/MobileNav.vue";

export default {
  props: {},
  computed: {
    currentRoute() {
      return this.$t(this.$route.name);
    },
  },
  methods: {},
  data() {
    return {      
    };
  },
  components: {
    DesktopNav,
    MobileNav
  },
};
</script>
