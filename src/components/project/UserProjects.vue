<template>
  <div class="my-projects">
    <div class="project" v-for="(project, idx) in projects" :key="idx">
      <div class="project-link" @click="selectProject(project.projectId)">
        <h2 class="project-column">{{ project.projectName }}</h2>
        <!-- <h2 class="project-column">{{ project.projectEditorLogin }}</h2> -->
        <h2 class="project-column">{{ formatTimeField(project.projectLastUpdated) }}</h2>
      </div>
      <b-button class="edit-btn" v-if="project.isProjectCreator" icon-right="fa-gear" @click="onProjectEdit(idx, project.projectId, project.projectName)"></b-button>
      <the-popup ref="editPopup" :closable="true" height="auto">
        <project-edit-popup :projectId="editProjectId" :projectName="editProjectName" @updateProjects="updateProjects"></project-edit-popup>
      </the-popup>
    </div>
  </div>
</template>

<script>
import ThePopup from "@/components/ThePopup.vue";
import ProjectEditPopup from "./ProjectEditPopup.vue";
export default {
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      editProjectId: null,
      editProjectName: ""
    }
  },
  methods: {
    selectProject(index) {
      //   console.log(index);
      this.$emit("showProjectDetail", index);
    },
    onProjectEdit(idx, projectId, projectName) {
      this.$refs.editPopup[idx].open();
      this.editProjectId = projectId;
      this.editProjectName = projectName;
    },
    updateProjects(){
      this.$emit("getMyProjects");
    }
  },
  components: {
    ThePopup,
    ProjectEditPopup
  }
};
</script>

<style lang="scss">
.my-projects {
  background-color: #fff;
  border-radius: 8px;
  --offset-x: var(--island-offset-x, 20px);
  padding: 15px var(--offset-x) 16px;
  font-size: 16px;
  line-height: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .project-columns-name {
    display: flex;
  }
  .project {
    border-radius: 8px;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    .project-link {
      display: flex;
      width: 100%;
      .project-column {
        width: 33%;
      }
    }
    
  }
  .project:hover {
    cursor: pointer;
    background-color: #F36993;
  }
  .edit-btn {
    
  }

}
</style>
