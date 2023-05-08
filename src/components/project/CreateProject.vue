<template>
  <div>
    <b-label>{{ $t("project.label.create.newProject") }}</b-label>
    <div>
      <h3>{{ $t("project.label.create.projectName") }}</h3>
      <b-input size="is-small" v-model="projectName"></b-input>
    </div>
    <div>
      <h3>{{ $t("project.label.create.projectParticipants") }}</h3>
      <multiselection-control :items="userList" @changeUserList="changeUserList"></multiselection-control>
    </div>
    <div>
      <button type="is-success" inverted class="create-btn" @click="createProject">{{ $t("btn.create") }}</button>
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
          projectParticipants: this.projectParticipants
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

<style></style>
