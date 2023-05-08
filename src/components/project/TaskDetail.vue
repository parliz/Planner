<template>
  <div>
    <b-button class="edit-btn" icon-right="fa-pen" size="is-small" @click="editMode = true"></b-button>

    <div class="task-detail-view">
      <h2 class="task-detail-title">{{ task.taskTitle }}</h2>

      <div>
        <h4 v-if="editMode">Выберите приоритет</h4>
        <h4>Приоритет</h4>
        <b-dropdown v-if="editMode" v-model="taskPriority" aria-role="list">
          <template v-if="taskPriority === 1" #trigger>
            <b-button :label="$t('project.task.priority.immediately')" type="is-error" size="is-small" />
          </template>

          <template v-else-if="taskPriority === 2" #trigger>
            <b-button :label="$t('project.task.priority.important')" type="is-warning" size="is-small" />
          </template>

          <template v-else #trigger>
            <b-button :label="$t('project.task.priority.notUrgent')" type="is-success" size="is-small" />
          </template>

          <b-dropdown-item :value="1" aria-role="listitem">
            <div class="media">
              <div class="media-content">
                <h3>{{ $t("project.task.priority.immediately") }}</h3>
              </div>
            </div>
          </b-dropdown-item>

          <b-dropdown-item :value="2" aria-role="listitem">
            <div class="media">
              <div class="media-content">
                <h3>{{ $t("project.task.priority.important") }}</h3>
              </div>
            </div>
          </b-dropdown-item>

          <b-dropdown-item :value="3" aria-role="listitem">
            <div class="media">
              <div class="media-content">
                <h3>{{ $t("project.task.priority.notUrgent") }}</h3>
              </div>
            </div>
          </b-dropdown-item>
        </b-dropdown>
        <h3 v-else>{{ priorityFormatt(task.taskPriority) }}</h3>
      </div>
      <div>
        <h4>Ответственный</h4>

        <b-autocomplete
          v-if="editMode"
          v-model="userEmail"
          placeholder="e.g. Anne"
          :keep-first="keepFirst"
          :open-on-focus="openOnFocus"
          :data="filteredDataObj"
          field="userEmail"
          @select="(option) => (taskResponsible = option.userId)"
          :clearable="clearable"
          size="is-small"
        >
        </b-autocomplete>
        <h3 v-else>{{ task.taskResponsible }}</h3>
      </div>
      <div>
        <h4>Комментарий к задаче</h4>
        <b-input v-if="editMode" size="is-small" v-model="taskDescription"></b-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editMode: false,
      taskPriority: this.task.taskPriority || null
    };
  },
  methods: {
    priorityFormatt(priority) {
      if (priority === 1) {
        return this.$t("project.task.priority.immediately");
      } else if (priority == 2) {
        return this.$t("project.task.priority.important");
      } else {
        return this.$t("project.task.priority.notUrgent");
      }
    }
  }
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
</style>
