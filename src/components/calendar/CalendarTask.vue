<template>
  <div>
    <div v-if="taskList.length > 0" class="task-container">
      <div class="add-task">
        <label>{{ $t("calendar.task.addTask") }}</label>
        <div class="add-task-content">
        <b-input v-model="newTask" size="is-small"></b-input>
        <button @click="addTask" id="add-btn">{{ $t("btn.add") }}</button>
      </div>
      </div>

      <div class="line"></div>

      <div class="main-task-list">
        <label>{{ $t("calendar.task.taskList") }}</label>
        <div v-for="task of taskList" :key="task.taskId">
          <div v-if="!task.taskDone" class="task">
            <b-checkbox v-model="task.taskDone"></b-checkbox>
            <label>{{ task.taskText }}</label>
            <div class="task-btn">
                <b-button size="is-small" icon-right="fa-pen" />
                <b-button size="is-small" icon-right="fa-trash" />
            </div>
            
          </div>
        </div>
      </div>

      <div class="line"></div>

      <div class="close-task">
        <label>{{ $t("calendar.task.closeTasks") }}</label>
        <div v-for="task of taskList" :key="task.taskId">
          <div v-if="task.taskDone" class="task">
            <b-checkbox v-model="task.taskDone"></b-checkbox>
            <label>{{ task.taskText }}</label>
            <div class="task-btn">
                <b-button size="is-small" icon-right="fa-pen" />
                <b-button size="is-small" icon-right="fa-trash" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="task-container">
      <label>НЕТ ЗАДАЧ</label>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  props: {
    taskList: {
      type: Array
    }
  },
  data() {
    return {
      newTask: ""
    };
  },
  methods: {
    addTask() {
      MockService.setNewTask(this.newTask)
      .then(() => {
        // this.$emit("selectDay", oResponse.data);
        })
        .finally(() => {
          this.newTask = "";
        });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.task-container {
  border: 2px solid #000000;
  border-radius: 15px;
}
.add-task-content {
  display: flex;
}
button:hover {
  color: #000000;
  background: #ffffff;
}

#add-btn:hover {
  border-radius: 14px;
  border: 1px solid #ddd
}

#add-btn {
  float: right;    
  padding: 10px;
  margin-top: 0;
  border: 1px solid #ffffff;
  background: #ffffff;
}
.task{
    display: flex;
    flex-direction: row;
}
.line {
  border-bottom: 1px solid pink; /* Параметры линии */
}
</style>
