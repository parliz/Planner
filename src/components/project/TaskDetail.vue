<template>
  <div>
    <div class="task-detail-view">
      <h1 class="task-detail-title">{{ task.taskTitle }}</h1>

      <div>
        <h2>{{ $t("project.task.priority") }}</h2>
        <div class="dropdown">
          <button @click="toggleDropdown">{{ selected }}</button>
          <ul v-show="isDropdownOpen">
            <li v-for="priority in priorities" :key="priority.value" @click="selectPriority(priority)">
              {{ priority.priorityText }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2>{{ $t("project.task.date") }}</h2>
        <div class="dropdown">
          <h2>{{ formatterDate(task.taskPlanDate) }}</h2>
        </div>
      </div>
      <div>
        <h2>{{ $t("project.task.responsible") }}</h2>

        <b-autocomplete
          v-model="userEmail"
          :placeholder="$t('login.label.login')"
          :keep-first="false"
          :open-on-focus="true"
          :data="filteredDataObj"
          field="userEmail"
          @select="changeResponsible"
          :clearable="clearable"
          size="is-small"
        >
        </b-autocomplete>
      </div>
      <div>
        <h2>{{ $t("project.task.comments") }}</h2>
        <div class="task-comments">
          <div v-for="(comment, index) in task.taskComment" :key="index">
            <div style="display: flex; justify-content: space-between;">         
              <h4>{{ formatterDate(comment.commentDate) }}</h4>
              <h4>{{ comment.commentAuthor }}</h4>
            </div>
            <h2>{{ comment.commentText }}</h2>
            
          </div>
        <b-input size="is-small" v-model="newTaskComment" v-on:keyup.native.enter="onPostNewComment"></b-input>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  props: {
    task: {
      type: Object,
      default: () => ({

      })
    }
  },
  data() {
    return {
      userList: [],
      userEmail: this.task.taskResponsible,
      editTaskResponsible: this.task.taskResponsible,
      taskComment: "",
      newTaskComment: "",
      isDropdownOpen: false,
      selected: this.$t("project.task.priority.notUrgent"),
      priorities: [
        { priorityText: this.$t("project.task.priority.immediately"), value: '1' },
        { priorityText: this.$t("project.task.priority.important"), value: '2' },
        { priorityText: this.$t("project.task.priority.notUrgent"), value: '3' },
      ],
    };
  },
  watch:{
    task (newTask)
      {
        console.log(newTask)
        this.userEmail = newTask.taskResponsible;
        this.taskComment = newTask.taskComment;
        this.selected = this.priorities.find((priority) => priority.value === this.task.taskPriority).priorityText
        return newTask;
      }
  },
  created() {
    const projectId = this.$route.params.projectId;
      MockService.getProjectParticipants(projectId)
      .then((oResponse) => {
        this.userList = oResponse.data;
      })
      .catch((oError) => {
        this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
      })
      
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectPriority(priority) {
      MockService.changeTaskPriority(this.task.taskId, {taskPriority: priority.value, taskPriorityText: priority.priorityText, taskDate: this.$moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")})
      .then(() => {
        this.selected = priority.priorityText;
        this.$emit("handleDoubleClick", this.task.taskId)
      })
      .catch((oError) => {
        this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
      })
      .finally(() => {
        this.isDropdownOpen = false;
      })
    },
    onPostNewComment() {
      const comment = {
        taskId: this.task.taskId,
        taskComment: this.newTaskComment,
        taskDate: this.$moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
      }
      MockService.postNewComment(comment)
      .then(() => {
        this.newTaskComment = "",
        this.$emit("handleDoubleClick", this.task.taskId)
      })
      .catch((oError) => {
        this.$buefy.toast.open({
            duration: 5000,
            message: "Ошибка",
            type: "is-warning"
          });
      })
    },
    changeResponsible(option) {
      MockService.changeTaskResponsible(this.task.taskId, {taskResponsible: option.userId, taskResponsibleEmail: option.userEmail, taskDate: this.$moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")})
      .then(() => {
        this.$emit("handleDoubleClick", this.task.taskId)
      })
      .catch((oError) => {
        this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
      })
      .finally(() => {
      })
    }
  },
  computed: {
    filteredDataObj() {
      return this.userList.filter((option) => {
        return option?.userEmail?.toString()?.toLowerCase().indexOf(this.userEmail.toString().toLowerCase()) >= 0;
      });
    }
  },
};
</script>

<style lang="scss">
.task-detail-view {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .task-detail-title {
    display: flex;
    justify-content: center;
  }
}
.edit-btn {
  width: fit-content;
}

.dropdown {
  position: relative;
}
ul {
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  list-style-type: none;
  z-index: 1;
}
li {
  display: block;
  padding: 0.5em;
  cursor: pointer;
}
li:hover {
  background-color: #f5f5f5;
}
button {
  padding: 0.5em 1em;
  background-color: #4a4a4a;
  color: #fff;
  border: none;
  border-radius: 0.2em;
  cursor: pointer;
}
.task-comments {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem
}
</style>
