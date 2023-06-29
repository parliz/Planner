<template>
  <div class="create-task-view">
    <h3 class="task-label">{{ $t("project.label.create.task") }}</h3>
    <div class="create-row">
      <h3>{{ $t("project.createTask.taskName") }}</h3>
      <b-input v-model="taskTitle"></b-input>
    </div>
    <div class="create-row">
      <h3>{{ $t("project.createTask.choosePriority")}}</h3>
      <b-dropdown v-model="taskPriority" aria-role="list">
        <template v-if="taskPriority === 1" #trigger>
          <b-button :label="$t('project.task.priority.immediately')" type="is-error" size="is-small"/>
        </template>

        <template v-else-if="taskPriority === 2" #trigger>
          <b-button :label="$t('project.task.priority.important')" type="is-warning" size="is-small"/>
        </template>

        <template v-else #trigger>
          <b-button :label="$t('project.task.priority.notUrgent')" type="is-success" size="is-small"/>
        </template>

        <b-dropdown-item :value="1" aria-role="listitem">
          <div class="media">
            <div class="media-content">
              <h3>{{ $t('project.task.priority.immediately') }}</h3>
            </div>
          </div>
        </b-dropdown-item>

        <b-dropdown-item :value="2" aria-role="listitem">
          <div class="media">
            <div class="media-content">
              <h3>{{ $t('project.task.priority.important') }}</h3>
            </div>
          </div>
        </b-dropdown-item>

        <b-dropdown-item :value="3" aria-role="listitem">
          <div class="media">
            <div class="media-content">
              <h3>{{ $t('project.task.priority.notUrgent') }}</h3>
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="create-row">
      <h3>Выполнить до</h3>
      <input type="datetime-local" id="datetime-picker" v-model="datetime">
    </div>
    <div class="create-row">
      <h3>Назначьте ответственного</h3>
      <b-autocomplete v-model="userLogin" placeholder="" :keep-first="true" :open-on-focus="openOnFocus" :data="filteredDataObj" field="userLogin" @select="(option) => (taskResponsible = option.userId)" :clearable="clearable" size="is-small">
      </b-autocomplete>
    </div>
    <div class="create-row">
      <h3></h3>
      <b-input maxlength="200" type="textarea" resize="none" v-model="taskComment"></b-input>
    </div>
    <button type="is-success" inverted class="default-btn" @click="createTask">{{ $t("btn.create") }}</button>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
// import MultiselectionControl from "@/components/MultiselectionControl.vue";
import TimePicker from "@/components/TimePicker.vue";
export default {
  props: {
    userList: {
      type: Array,
      default: () => []
    },
    status: {
      type: String
    }
  },
  data() {
    return {
      taskTitle: "",
      taskComment: "",
      taskDate: "",
      taskResponsible: null,
      taskPriority: 1,
      userLogin: "",
      openOnFocus: true,
      clearable: true,
      datetime: null
    };
  },
  methods: {
    createTask() {
      if (this.taskTitle) {
        const projectId = this.$route.params.projectId;
      const task = {
        taskTitle: this.taskTitle,
        taskResponsible: this.taskResponsible,
        taskPriority: this.taskPriority,
        taskComment: this.taskComment,
        taskPlanDate: this.$moment(this.datetime).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
        taskDate: this.$moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
        taskStatus: this.status
      };
      MockService.addProjectTask(projectId, task)
        .then((oResponse) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oResponse.data.message,
            type: "is-success"
          });
          this.taskComment = "";
          this.taskResponsible = null;
          this.userLogin = "";
          this.$emit("closePopup");
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        })
        .finally(() => {});
      } else {
        this.$buefy.toast.open({
            duration: 5000,
            message: "Введите название задачи",
            type: "is-warning"
          });
      }
      
    }
  },
  computed: {
    filteredDataObj() {
      return this.userList.filter((option) => {
        return option.userLogin.toString().toLowerCase().indexOf(this.userLogin.toLowerCase()) >= 0;
      });
    }
  },
  components: {
    // TimePicker
  }
};
</script>

<style lang="scss">
.create-task-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .task-label {
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
  .create-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .default-btn {
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
