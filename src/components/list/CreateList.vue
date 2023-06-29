<template>
  <div class="create-list-view">
    <h3 class="list-label">{{ $t("list.label.create.newLists") }}</h3>
    <div class="create-row">
      <h3>{{ $t("list.label.create.listName") }}</h3>
      <b-input v-model="listName"></b-input>
    </div>
    <div class="create-row">
      <h3>{{ $t("list.label.create.listParticipants") }}</h3>
      <multiselection-control :items="userList" @changeUserList="changeUserList"></multiselection-control>
    </div>
    <div>
      <button type="is-success" inverted class="default-btn" @click="createList">{{ $t("btn.create") }}</button>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import MultiselectionControl from "@/components/MultiselectionControl.vue";
export default {
  data() {
    return {
      listName: "",
      listParticipants: [],
      userList: [],
      currentSection: null,
      sectionList: []
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
    createList() {
      if (this.listName.length > 0) {
        const project = {
          listName: this.listName,
          listParticipants: this.listParticipants
        };

        MockService.createList(project)
          .then((oResponse) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oResponse.data.message,
              type: "is-success"
            });
            this.listName = "";
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
      this.listParticipants = [];
      users.map((user) => {
        this.listParticipants.push(user.userId);
      });
    }
  },
  components: {
    MultiselectionControl
  }
};
</script>

<style lang="scss">
.create-list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .list-label {
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
