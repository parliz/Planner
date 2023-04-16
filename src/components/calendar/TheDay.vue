<template>
  <button id="lists" @click="getInfoByDay">
    <p class="day-number">{{ day.monthDay }}</p>
  </button>
</template>
  
  
  <script>
import MockService from "@/services/MockService";

export default {
  props: {
    day: {
      type: Object
    }
  },
  methods: {
    getInfoByDay() {
      MockService.getTasksByDay(123, this.day.date._d)
      .then((oResponse) => {
        this.$emit("selectDay", oResponse.data);
        })
        .finally(() => {
        });
    }
  },
  components: {}
};
</script>
  
  <style lang="scss" scoped>
</style>
  
  