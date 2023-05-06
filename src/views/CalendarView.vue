<template>
  <div class="calendar-page">
    <div class="tasks">
      <create-task class="task-create" :selectedDay="selectedDay" @createTask="createTask"/>
      <day-tasks ></day-tasks>
    </div>
      <!-- <b-button class="button-test" @click="sendRequest">отправить запрос на таску</b-button> -->
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
import moment from "moment";
export default {
  components: { MainCalendar, CreateTask, DayTasks },
  data() {
    return {
      selectedDay: this.$moment().format("DD.MM"),
      taskList: []
    };
  },
  created() {
    this.getTaskListByDay()
  },
  methods: {
    getTaskListByDay() {
      MockService.getTasksByDay(this.$moment(this.selectedDay).format("YYYY-MM-DD"))
      .then((oResponse) => {
        this.taskList = oResponse;
      })
    },
    selectDay(day) {
      this.selectedDay = this.$moment(day).format("DD.MM");
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
