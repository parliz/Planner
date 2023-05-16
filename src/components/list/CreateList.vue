<template>
    <div>
      <b-label>{{ $t("list.label.create.newLists") }}</b-label>
      <div>
        <h3>{{ $t("list.label.create.listName") }}</h3>
        <b-input size="is-small" v-model="listName"></b-input>
      </div>
      <!-- <div>
        <h3>добавьте тег</h3>
        <b-input size="is-small" v-model="listTag"></b-input>
      </div> -->
      <div>
        <h3>{{ $t("list.label.create.listParticipants") }}</h3>
        <multiselection-control :items="userList" @changeUserList="changeUserList"></multiselection-control>
      </div>
      <div>
        <button type="is-success" inverted class="create-btn" @click="createList">{{ $t("btn.create") }}</button>
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
              this.$emit("updateList");
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
  
  <style></style>
  