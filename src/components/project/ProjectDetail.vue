<template>
  <div :class="isTaskDetailShow ? 'project-with-details' : 'project'">
    <div class="project-tasks">
      <h1>{{ project.projectName }}</h1>
      <div class="drag-and-drop">
        <div class="drop-area" @drop="dropTask('InPlan')" @dragover.prevent>
          <h2>{{ $t("project.label.status.inPlan") }}</h2>
          <div class="task-list">
            <div v-for="task in projectTasks.filter((task) => task.taskStatus === 'InPlan')" :key="task.taskId" class="task" draggable="true" @dragstart="dragStart(task)"  @dblclick="handleDoubleClick(task.taskId)">
              <div>{{ task.taskTitle }}</div>
              <div>{{ task.description }}</div>
            </div>
          </div>
          <button type="is-success" inverted @click="addTask('InPlan')" class="create-btn" style="">{{ $t("btn.create.task") }}</button>
        </div>

        <div class="drop-area" @drop="dropTask('InWork')" @dragover.prevent>
          <h2>{{ $t("project.label.status.inWork") }}</h2>

          <div class="task-list">
            <div v-for="task in projectTasks.filter((task) => task.taskStatus === 'InWork')" :key="task.taskId" class="task" draggable="true" @dragstart="dragStart(task)" @dblclick="handleDoubleClick(task.taskId)">
              <div>{{ task.taskTitle }}</div>
              <div>{{ task.description }}</div>
            </div>
          </div>
          <button type="is-success" inverted @click="addTask('InWork')" class="create-btn" style="">{{ $t("btn.create.task") }}</button>
        </div>

        <div class="drop-area" @drop="dropTask('Complete')" @dragover.prevent>
          <h2>{{ $t("project.label.status.inFinish") }}</h2>

          <div class="task-list">
            <div v-for="task in projectTasks.filter((task) => task.taskStatus === 'Complete')" :key="task.taskId" class="task" draggable="true" @dragstart="dragStart(task)" @dblclick="handleDoubleClick(task.taskId)">
              <div>{{ task.taskTitle }}</div>
              <div>{{ task.description }}</div>
            </div>
          </div>
          <button type="is-success" inverted @click="addTask('Complete')" class="create-btn" style="">{{ $t("btn.create.task") }}</button>
        </div>
      </div>
    </div>
    <div class="task-detail" v-if="isTaskDetailShow">
        <b-button icon-right="fa-xmark" size="is-small" @click="isTaskDetailShow = false"></b-button>
      <task-detail :task="taskDetail" @handleDoubleClick="handleDoubleClick"></task-detail>
    </div>
    <the-popup ref="popup" :closable="true" height="25rem">
        
      <create-task @closePopup="closePopup" :userList="participantsList" :status="taskStatus"></create-task>
    </the-popup>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import ThePopup from "@/components/ThePopup.vue";
import CreateTask from "@/components/project/CreateTask.vue";
import TaskDetail from "@/components/project/TaskDetail.vue";
export default {
  data() {
    return {
      project: null,
      projectTasks: [],
      participantsList: [],
      dragTask: {},
      isTaskDetailShow: false,
      taskDetail: null,
      taskStatus: null
    };
  },
  created() {
    this.getProjectInfo();
  },
  methods: {
    getProjectInfo() {
      const sId = this.$route.params.projectId;
      MockService.getProjectDetail(sId)
        .then((oResponse) => {
          this.project = oResponse.data;
          (this.participantsList = oResponse.data.projectParticipants), (this.projectTasks = oResponse.data.projectTasks);
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
    addTask(status) {
      this.taskStatus = status;
      this.$refs.popup.open();
      
    },
    dragStart(task) {
      this.dragTask = task;
    },

    dropTask(taskStatus) {
      if (this.dragTask.taskStatus === taskStatus) return;

      MockService.changeTaskStatus(this.dragTask.taskId, {taskStatus: taskStatus}).then(() => {
        this.getProjectInfo();
      })
      .finally(() => {
        this.dragTask = {};
      })
    //   this.dragTask.taskStatus = taskStatus;

      
    },
    handleDoubleClick(taskId) {
        MockService.getTaskDetail(taskId)
        .then((oResponse) => {
            this.isTaskDetailShow = true;
          this.taskDetail = oResponse.data;
        //   (this.participantsList = oResponse.data.projectParticipants), (this.projectTasks = oResponse.data.projectTasks);
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
    closePopup() {
      this.$refs.popup.close();
      this.getProjectInfo();
    }
  },
  components: {
    ThePopup,
    CreateTask,
    TaskDetail
  }
};
</script>

<style lang="scss">
.project-with-details {
    display: flex;
    justify-content: space-between;
    .task-detail {
      background-color: #00d7d0;
      width: 30rem;
      
      .task-detail-detail{
        display: flex;
    flex-direction: column;
    gap: 1.5rem;
      }
    }
}
.project {

}
.project-tasks {
    width: 100%;
}
.project-detail {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.drag-and-drop {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.drop-area {
  flex-basis: calc(33.33% - 20px);
  padding: 10px;
  border-radius: 5px;
  background-color: #f7f7f7;
  margin-right: 20px;
}

.drop-area:last-child {
  margin-right: 0;
}

.task-list {
  margin-top: 20px;
}

.task {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: move;
}
</style>
