<template>
  <div id="projects">
    <label>Проекты</label>
    <button type="is-success" inverted @click="createProject" class="create-btn" style="">{{ $t("btn.create.project") }}</button>
    <user-projects :projects="myProjects" @showProjectDetail="showProjectDetail"></user-projects>
    <the-popup ref="popup" :closable="true" height="25rem">
      <create-project @closePopup="closePopup"></create-project>
    </the-popup>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import ThePopup from "@/components/ThePopup.vue";
import CreateProject from "@/components/project/CreateProject.vue";
import UserProjects from "@/components/project/UserProjects.vue";

export default {
  data() {
    return {
      myProjects: null
    };
  },
  created() {
    this.getMyProjects();
  },
  methods: {
    getMyProjects() {
      MockService.getAllMyProjects().then((oResponse) => {
        this.myProjects = oResponse.data;
      });
    },
    createProject() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
      this.getMyProjects();
    },
    showProjectDetail(sId){
      this.$router.push({
        name: "projectDetail",
        params: { projectId: sId }
      });
    }
  },
  components: {
    ThePopup,
    CreateProject,
    UserProjects
  }
};
</script>

<style lang="scss">
.create-btn {
  display: block;
  margin-left: auto;
}
</style>
