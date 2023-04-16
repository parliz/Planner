<template>
    
  <div class="calendar-page">
      <div class="calendar">
        <main-calendar class="full-calendar"></main-calendar>
      </div>
    
  </div>
</template>
  
  <script>
import MainCalendar from '@/components/calendar/MainCalendar.vue';
export default { 
components: { MainCalendar }
}
</script>
  
  <style lang="scss" scoped>
  .full-calendar{
    width: 100%;
  }
</style>
  