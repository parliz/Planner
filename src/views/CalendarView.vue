<template>
    
  <div class="calendar-page">
      <div class="calendar">
        <!-- <b-button class="button-test" @click="sendRequest">отправить запрос на таску</b-button> -->
        <main-calendar class="full-calendar"></main-calendar>
      </div>
    
  </div>
</template>
  
  <script>
import MockService from "@/services/MockService";
import MainCalendar from '@/components/calendar/MainCalendar.vue';
export default { 
components: { MainCalendar },
methods: {
  sendRequest() {
    MockService.getTask()
    .then((oResponse) => {
      console.log(oResponse);
    })
  }
}
}
</script>
  
  <style lang="scss" scoped>
  .full-calendar{
    width: 100%;
  }
  .button-test {
    position: absolute;
    top: 10rem;
    left: 20rem;
    background-color: red;
  }
</style>
  