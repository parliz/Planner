<template>
  <div :class="isTaskDetailShow ? 'project-with-details' : 'project'">
    <div class="project-tasks">
      <div style="display: flex; justify-content: space-between; margin-right: 1rem;">
        <div style="display: flex; gap: 1rem">
          <b-button type="is-primary is-small is-rounded" icon-right="fa-arrow-left" @click="navBack" />
          <h1>{{ project.projectName }}</h1>
        </div>
        <button class="default-btn" is-primary is-small is-rounded @click="showParticipants">{{ $t("participants.list") }}</button>
      </div>
      <div class="drag-and-drop">
        <div class="drop-area" @drop="dropTask('InPlan')" @dragover.prevent>
          <h1>{{ $t("project.label.status.inPlan") }}</h1>
          <div class="task-list">
            <div v-for="task in projectTasks.filter((task) => task.taskStatus === 'InPlan')" :key="task.taskId" class="task" draggable="true" @dragstart="dragStart(task)" @dblclick="handleDoubleClick(task.taskId)">
              <div>{{ task.taskTitle }}</div>
              <div>{{ task.description }}</div>
            </div>
          </div>
          <button type="is-success" inverted @click="addTask('InPlan')" class="default-btn footer-btn" style="">{{ $t("btn.create.task") }}</button>
        </div>

        <div class="drop-area" @drop="dropTask('InWork')" @dragover.prevent>
          <h1>{{ $t("project.label.status.inWork") }}</h1>

          <div class="task-list">
            <div v-for="task in projectTasks.filter((task) => task.taskStatus === 'InWork')" :key="task.taskId" class="task" draggable="true" @dragstart="dragStart(task)" @dblclick="handleDoubleClick(task.taskId)">
              <div>{{ task.taskTitle }}</div>
              <div>{{ task.description }}</div>
            </div>
          </div>
          <button type="is-success" inverted @click="addTask('InWork')" class="default-btn footer-btn" style="">{{ $t("btn.create.task") }}</button>
        </div>

        <div class="drop-area" @drop="dropTask('Complete')" @dragover.prevent>
          <h1>{{ $t("project.label.status.inFinish") }}</h1>

          <div class="task-list">
            <div v-for="task in projectTasks.filter((task) => task.taskStatus === 'Complete')" :key="task.taskId" class="task" draggable="true" @dragstart="dragStart(task)" @dblclick="handleDoubleClick(task.taskId)">
              <div>{{ task.taskTitle }}</div>
              <div>{{ task.description }}</div>
            </div>
          </div>
          <button type="is-success" inverted @click="addTask('Complete')" class="default-btn footer-btn" style="">{{ $t("btn.create.task") }}</button>
        </div>
      </div>
    </div>
    <div class="task-detail" v-if="isTaskDetailShow">
      <b-button icon-right="fa-xmark" size="is-small" style="position: absolute; right: 2rem" @click="isTaskDetailShow = false"></b-button>
      <task-detail :task="taskDetail" @handleDoubleClick="handleDoubleClick"></task-detail>
    </div>
    <the-popup ref="popup" :closable="true" height="auto">
      <create-task @closePopup="closePopup" :userList="participantsList" :status="taskStatus"></create-task>
    </the-popup>
    <the-popup ref="popupParticipants" :closable="true" height="auto">
      <participants-list requestType="getProjectParticipants" :itemId="project.projectId" @closeParticipantPopup="closeParticipantPopup"></participants-list>
    </the-popup>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import ThePopup from "@/components/ThePopup.vue";
import CreateTask from "@/components/project/CreateTask.vue";
import TaskDetail from "@/components/project/TaskDetail.vue";
import ParticipantsList from "@/components/ParticipantsList.vue";
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

      MockService.changeTaskStatus(this.dragTask.taskId, { taskStatus: taskStatus, taskDate: this.$moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") })
        .then(() => {
          this.getProjectInfo();
        })
        .finally(() => {
          this.dragTask = {};
        });
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
    },
    closeParticipantPopup() {
      this.$refs.popupParticipants.close();
      this.getProjectInfo();
    },
    navBack() {
      this.$router.go(-1);
    },
    showParticipants() {
      this.$refs.popupParticipants.open();
    }
  },
  components: {
    ThePopup,
    CreateTask,
    TaskDetail,
    ParticipantsList
  }
};
</script>

<style lang="scss">
.project-with-details {
  display: flex;
  justify-content: space-between;
  .task-detail {
    background-color: #68acea;
    width: 30rem;

    .task-detail-detail {
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
  margin-top: 1.5rem;
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

.footer-btn {
  margin-left: auto;
  margin-right: auto;
}
</style>
