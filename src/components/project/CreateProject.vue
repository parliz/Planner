<template>
  <div class="create-project-view">
    <h3 class="project-label">{{ $t("project.label.create.newProject") }}</h3>
    <div class="create-row">
      <h3>{{ $t("project.label.create.projectName") }}</h3>
      <b-input v-model="projectName"></b-input>
    </div>
    <div class="create-row">
      <h3>{{ $t("project.label.create.projectParticipants") }}</h3>
      <multiselection-control :items="userList" @changeUserList="changeUserList"></multiselection-control>
    </div>
    <div>
      <button type="is-success" inverted class="default-btn" @click="createProject">{{ $t("btn.create") }}</button>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import MultiselectionControl from "@/components/MultiselectionControl.vue";
export default {
  data() {
    return {
      projectName: "",
      projectParticipants: [],
      userList: []
    };
  },
  created() {
    MockService.getUsers()
      .then((oResponse) => {
        this.userList = oResponse.data;
      })
      .catch((oError) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: oError.response.data.message,
          type: "is-warning"
        });
      });
  },
  methods: {
    createProject() {
      if (this.projectName.length > 0) {
        const project = {
          projectName: this.projectName,
          projectParticipants: this.projectParticipants,
          projectDate: this.$moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        };

        MockService.createProject(project)
          .then((oResponse) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oResponse.data.message,
              type: "is-success"
            });
            this.projectName = "";
            this.tags = null;
            this.$emit("closePopup");
          })
          .catch((oError) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oError.data.message,
              type: "is-warning"
            });
          });
      }
    },
    changeUserList(users) {
      this.projectParticipants = [];
      users.map((user) => {
        this.projectParticipants.push(user.userId);
      });
    }
  },
  components: {
    MultiselectionControl
  }
};
</script>

<style lang="scss">
.create-project-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .project-label {
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
