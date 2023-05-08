<template>
  <div>
    <h2>{{ $t("project.label.create.task") }}</h2>
    <div>
      <h4>Название задачи</h4>
      <b-input size="is-small" v-model="taskTitle"></b-input>
    </div>
    <div>
      <h4>Комментарий к задаче</h4>
      <b-input size="is-small" v-model="taskDescription"></b-input>
    </div>
    <div>
      <h4>Выберите приоритет</h4>
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
    <div>
      <h4>Назначьте ответственного</h4>
      <b-autocomplete v-model="userEmail" placeholder="e.g. Anne" :keep-first="keepFirst" :open-on-focus="openOnFocus" :data="filteredDataObj" field="userEmail" @select="(option) => (taskResponsible = option.userId)" :clearable="clearable" size="is-small">
      </b-autocomplete>
    </div>
    <button type="is-success" inverted class="create-btn" @click="createTask">{{ $t("btn.create") }}</button>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
// import MultiselectionControl from "@/components/MultiselectionControl.vue";
export default {
  props: {
    userList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      taskTitle: "",
      taskDescription: "",
      taskResponsible: null,
      taskPriority: 1,
      userEmail: "",
      keepFirst: true,
      openOnFocus: true,
      clearable: true
    };
  },
  methods: {
    createTask() {
      const projectId = this.$route.params.projectId;
      const task = {
        taskTitle: this.taskTitle,
        taskResponsible: this.taskResponsible,
        taskPriority: this.taskPriority
      };
      MockService.addProjectTask(projectId, task)
        .then((oResponse) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oResponse.data.message,
            type: "is-success"
          });
          this.taskDescription = "";
          this.taskResponsible = null;
          this.userEmail = "";
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
    }
  },
  computed: {
    filteredDataObj() {
      return this.userList.filter((option) => {
        return option.userEmail.toString().toLowerCase().indexOf(this.userEmail.toLowerCase()) >= 0;
      });
    }
  },
  components: {
    // MultiselectionControl
  }
};
</script>

<style lang="scss">

</style>
