<template>
  <button id="lists" @click="getInfoByDay">
    <p class="day-number">{{ day.monthDay }}</p>
  </button>
</template>
  
  
  <script>
import MockService from "@/services/MockService";
import moment from "moment";
import { mapState } from "vuex";
export default {
  props: {
    day: {
      type: Object
    }
  },
  methods: {
    getInfoByDay() {
      this.$emit("selectNewDay", this.day.date._d)
      // this.$store.state.currentDayFromMainCalendar = this.day.date._d;
      // console.log(this.day.date._d)
      // MockService.getTasksByDay(123, this.day.date._d)
      // .then((oResponse) => {
      //   this.$emit("selectDay", oResponse.data);
      //   })
      //   .finally(() => {
      //   });
    }
  },
  computed: {
    ...mapState(["currentDayFromMainCalendar"])
  },
  components: {}
};
</script>
  
  <style lang="scss" scoped>
</style>
  
  