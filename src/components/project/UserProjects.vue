<template>
  <div class="my-projects">
    <h3>{{ $t("project.label.myProjects") }}</h3>
    <div class="project-link" v-for="(project, idx) in projects" :key="idx">
      <h2 @click="selectProject(project.projectId)">{{ project.projectName }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectProject(index) {
    //   console.log(index);
    this.$emit("showProjectDetail", index);
    }
  }
};
</script>

<style>
.project-link:hover {
  cursor: pointer;
}
</style>
