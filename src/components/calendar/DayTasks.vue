<template>
  <div class="task-container">
    <div class="main-task-list">
      <label style="display: flex; justify-content: center">{{ $t("calendar.task.taskList") }}</label>
      <div class="day-tasks">
        <div v-for="task of taskList" :key="task.taskId">
          <div class="task" v-if="!task.isTaskDone">
            <b-checkbox :value="task.isTaskDone" @input="onTaskDoneChange(task.taskId, task.isTaskDone)"></b-checkbox>
            <b-input size="is-small" v-if="editTaskId === task.taskId" v-model="editTaskText"></b-input>
            <label v-else style="text-align: center">{{ task.taskComment }}</label>

            <div class="task-btn">
              <b-button v-if="isEditMode && editTaskId === task.taskId" size="is-small" icon-right="fa-floppy-disk" @click="saveMode(task.taskId)" />
              <b-button v-if="isEditMode && editTaskId === task.taskId" size="is-small" icon-right="fa-xmark" @click="cancelEdit(task.taskId)" />
              <b-button v-if="!isEditMode || editTaskId !== task.taskId" size="is-small" icon-right="fa-pen" @click="editMode(task.taskId, task.taskComment)" />
              <b-button v-if="!isEditMode || editTaskId !== task.taskId" size="is-small" icon-right="fa-trash" @click="deleteTask(task.taskId)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="main-task-list">
      <label style="display: flex; justify-content: center">{{ $t("calendar.task.closeTasks") }}</label>
      <div class="day-tasks">
        <div v-for="task of taskList" :key="task.taskId">
          <div class="task" v-if="task.isTaskDone">
            <b-checkbox :value="task.isTaskDone" @input="onTaskDoneChange(task.taskId, task.isTaskDone)"></b-checkbox>
            <b-input size="is-small" v-if="editTaskId === task.taskId" v-model="editTaskText"></b-input>
            <label v-else style="text-align: center">{{ task.taskComment }}</label>
            <div class="task-btn">
              <b-button v-if="isEditMode && editTaskId === task.taskId" size="is-small" icon-right="fa-floppy-disk" @click="saveMode(task.taskId)" />
              <b-button v-if="isEditMode && editTaskId === task.taskId" size="is-small" icon-right="fa-xmark" @click="cancelEdit(task.taskId)" />
              <b-button v-if="!isEditMode || editTaskId !== task.taskId" size="is-small" icon-right="fa-pen" @click="editMode(task.taskId, task.taskComment)" />
              <b-button v-if="!isEditMode || editTaskId !== task.taskId" size="is-small" icon-right="fa-trash" @click="deleteTask(task.taskId)" />
            </div>
          </div>
        </div>
      </div>
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
      newTask: "",
      editTaskText: "",
      isEditMode: false,
      editTaskId: null
    };
  },
  methods: {
    onTaskDoneChange(taskId, isTaskDone) {
      MockService.taskUpdateFromCalendar(taskId, { isTaskDone: !isTaskDone })
        .then(() => {
          this.$emit("updateTasks");
        })
        .finally(() => {});
    },
    editMode(editTaskId, editTaskComment) {
      this.isEditMode = true;
      this.editTaskId = editTaskId;
      this.editTaskText = editTaskComment;
    },
    saveMode(editTaskId) {
      MockService.taskUpdateFromCalendar(editTaskId, { taskComment: this.editTaskText })
        .then(() => {
          this.$emit("updateTasks");
        })
        .catch(() => {
          this.$buefy.toast.open({
            duration: 5000,
            message: "Возникла ошибка",
            type: "is-warning"
          });
        })
        .finally(() => {
          this.isEditMode = false;
          this.editTaskId = null;
          this.editTaskText = "";
        });
    },
    cancelEdit() {
      this.isEditMode = false;
      this.editTaskId = null;
      this.editTaskText = "";
    },
    deleteTask(taskId) {
      MockService.deleteTaskFromCalendar(taskId)
        .then(() => {
          this.$buefy.toast.open({
            duration: 5000,
            message: "Задача успешно удалена",
            type: "is-success"
          });
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: "Возникла ошибка",
            type: "is-warning"
          });
        })
        .finally(() => {
          this.newTask = "";
          this.$emit("updateTasks");
        });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
button:hover {
  color: #000000;
  background: #ffffff;
}

.day-tasks {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  .task {
    display: flex;
    justify-content: space-between;
    .task-btn {
      display: flex;
      gap: 0.2rem;
    }
  }
}
.task {
  display: flex;
  flex-direction: row;
}
.line {
  border-bottom: 1px solid pink; /* Параметры линии */
}
</style>
