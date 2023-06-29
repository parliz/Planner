<template>
  <div class="edit-window">
    <b-input v-if="editMode" v-model="editName"></b-input>
    <h3 v-else>{{ editName }}</h3>

    <div v-if="editMode" class="edit-btn">
      <button type="is-success" class="list-edit-btn" @click="saveListName">{{ $t("btn.edit.save") }}</button>
      <button type="is-success" class="list-edit-btn" @click="cancelRename">{{ $t("btn.edit.cancel") }}</button>
    </div>
    <div v-if="!editMode" class="edit-btn">
      <button type="is-success" class="list-edit-btn" @click="renameList">{{ $t("btn.edit.rename.list") }}</button>
      <button type="is-success" class="list-edit-btn" @click="copyList">{{ $t("btn.edit.copy.list") }}</button>
      <button type="is-error" class="list-edit-btn" @click="deleteList">{{ $t("btn.delete") }}</button>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  props: {
    listId: {
      type: Number
    },
    listName: {
      type: String
    }
  },
  data() {
    return {
      editName: "",
      seletedList: [],
      editMode: false
    };
  },
  watch: {
    listName(newName) {
      this.editName = newName;
      return newName;
    }
  },
  mounted() {
    this.editName = this.listName;
  },
  methods: {
    deleteList() {
      MockService.deleteList(this.listId)
        .then((oResponse) => {
          this.$emit("updateLists");
          this.$buefy.toast.open({
            duration: 5000,
            message: oResponse.data.message,
            type: "is-success"
          });
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
    renameList() {
      this.editMode = true;
    },
    cancelRename() {
      this.editMode = false;
      this.editName = this.projectName;
    },
    saveListName() {
      if (this.editName) {
        MockService.renameList(this.listId, { listName: this.editName })
          .then((oResponse) => {
            this.$emit("updateLists");
            this.editMode = false;
          })
          .catch((oError) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oError.response.data.message,
              type: "is-warning"
            });
          });
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Название списка не может быть пустым",
          type: "is-warning"
        });
      }
    },
    copyList() {
      MockService.copyList(this.listId)
        .then((oResponse) => {
          this.$emit("updateLists");
          // this.$emit("updateProjects");
          // this.editMode = false;
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    }
  },
  components: {}
};
</script>

<style>
.edit-window {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-edit-btn {
  border-radius: 10px;
  border: 1px solid #c8f57a;
  background-color: white;
  color: black;
  padding: 10px 25px;
  cursor: pointer;
  width: 100%;
}

.list-edit-bt:hover {
  background-color: #c8f57a;
  color: white;
}
</style>
