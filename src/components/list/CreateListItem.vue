<template>
    <div class="create-item">
      <!-- <b-label>{{ $t("list.label.create.newLists") }}</b-label> -->
      <div>
        <h3>{{ $t("list.label.create.listItemName") }}</h3>
        <b-input size="is-small" v-model="listItemTitle"></b-input>
      </div>
      <div>
        <h3>добавьте картинку/файл</h3>
        <!-- <b-input size="is-small" v-model="listItemName"></b-input> -->
      </div>
      <div>
        <h3>Комментарий</h3>
        <b-input size="is-small" v-model="listItemText"></b-input>
        <!-- <multiselection-control :items="userList" @changeUserList="changeUserList"></multiselection-control> -->
      </div>
      <div>
        <button type="is-success" inverted class="create-btn" @click="createListItem">{{ $t("btn.create") }}</button>
      </div>
    </div>
  </template>
  
  <script>
  import MockService from "@/services/MockService";
  import MultiselectionControl from "@/components/MultiselectionControl.vue";
  export default {
    data() {
      return {
        listItemTitle: "",
        listItemText: ""
      };
    },
    created() {
      
    },
    methods: {
      createListItem() {
        if (this.listItemTitle.length > 0) {
          const listItem = {
            listId: this.$route.params.listId,
            listItemTitle: this.listItemTitle,
            listItemText: this.listItemText
          };
  
          MockService.createListItem(listItem)
            .then((oResponse) => {
              this.$buefy.toast.open({
                duration: 5000,
                message: oResponse.data.message,
                type: "is-success"
              });
              this.listItemTitle = "";
              this.listItemText = "";
              this.$emit("getListInfo");
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
      // MultiselectionControl
    }
  };
  </script>
  
  <style>
.create-item {
  padding: 1.5rem;
}
</style>
  