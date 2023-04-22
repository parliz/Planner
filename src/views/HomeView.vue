<template>
  <div class="home-page">
    
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  data() {
    return {
    };
  },

  created() {
    // MockService.getRequests().then((oResponse) => {
    //   this.pageCounters.requests = oResponse.data.length.toString();
    // });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$accentColor: #f26c41;

.home-page {
  margin: 0;
}


</style>
