<template>
  <div class="calendar-page">
    <div class="tasks">
      <create-task class="task-create" :selectedDay="taskDay" @createTask="createTask"/>
      <day-tasks :taskList="taskList" @updateTasks="getTaskListByDay"></day-tasks>
    </div>
    <div class="full-calendar">
      <main-calendar @selectDay="selectDay"></main-calendar>
    </div>
      
    
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import CreateTask from "@/components/calendar/CreateTask.vue";
import DayTasks from "@/components/calendar/DayTasks.vue";
import MainCalendar from "@/components/calendar/MainCalendar.vue";
export default {
  components: { MainCalendar, CreateTask, DayTasks },
  data() {
    return {
      taskDay: this.$moment().format("DD.MM"),
      selectedDay: this.$moment().format("YYYY-MM-DD"),
      taskList: []
    };
  },
  created() {
    this.getTaskListByDay()
  },
  methods: {
    getTaskListByDay() {
      const taskDay = this.$moment(this.selectedDay).format("YYYY-MM-DD");
      MockService.getTasksByDay(taskDay)
      .then((oResponse) => {
        this.taskList = oResponse.data;
      })
    },
    selectDay(day) {
      this.selectedDay = day;
      this.taskDay = this.$moment(day).format("DD.MM")
      this.getTaskListByDay();
    },
    createTask(taskText) {
      let newTask = {
        taskComment: taskText,
        taskDate: this.$moment(this.selectedDay).format("YYYY-MM-DD")
      }
      MockService.addNewTask(newTask)
      .then(() => {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Задача успешно добавлена",
          type: "is-success"
        });
        this.getTaskListByDay();
        })
        .catch(() => {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Возникла ошибка",
          type: "is-warning"
        });
        })
        .finally(() => {
          this.newTask = "";
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  .full-calendar {
    display: flex;
    justify-content: flex-end;
  }
  .tasks {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 2rem;
    
  .task-create {
    width: 20rem;
  }
}
  .button-test {
    position: absolute;
    top: 10rem;
    left: 20rem;
    background-color: red;
  }
}

</style>
