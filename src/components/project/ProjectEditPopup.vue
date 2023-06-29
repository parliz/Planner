<template>
    <div class="edit-window">
      
      <b-input v-if="editMode" v-model="editName" ></b-input>
      <h3 v-else>{{ projectName }}</h3>
      <!-- <multiselection-control :items="allUsers" :selectedItems="seletedParticipants" @changeUserProject="changeUserProject"></multiselection-control>
      <button type="is-error" class="default-btn" @click="deleteProject">{{ $t("btn.project.delete")}}</button> -->
      
      <div v-if="editMode" class="edit-btn">
        <button type="is-success" class="project-edit-btn" @click="saveProjectName">{{ $t("btn.edit.save")}}</button>
        <button type="is-success" class="project-edit-btn" @click="cancelRename">{{ $t("btn.edit.cancel")}}</button>
      </div>
      <div v-if="!editMode" class="edit-btn">
        <button type="is-success" class="project-edit-btn" @click="renameProject">{{ $t("btn.edit.rename.project")}}</button>
        <button type="is-error" class="project-edit-btn" @click="deleteProject">{{ $t("btn.delete")}}</button>
      </div>
      
    </div>
  </template>
  
  <script>
  import MockService from "@/services/MockService";
  import MultiselectionControl from "@/components/MultiselectionControl.vue";
  export default {
    props: {
      projectId: {
        type: Number
      },
      projectName: {
        type: String
      }
    },
    data(){
      return {
        editName: "",
        seletedParticipants: [],
        editMode: false
      }
    },
    watch: {
      projectName (newName)
        {
          this.editName = newName;
          return newName;
        }
    },
    mounted(){
      this.editName = this.projectName;
    },
    methods: {
      deleteProject() {
        MockService.deleteProject(this.projectId)
          .then((oResponse) => {
            
            this.$buefy.toast.open({
              duration: 5000,
              message: oResponse.data.message,
              type: "is-success"
            });
            this.$emit("updateProjects");
          })
          .catch((oError) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oError.response.data.message,
              type: "is-warning"
            });
          });
          
      },
      renameProject() {
        this.editMode = true;
      },
      cancelRename() {
        this.editMode = false;
        this.editName = this.projectName;
      },
      saveProjectName() {
        if (this.editName) {
          MockService.renameProject(this.projectId, {projectName: this.editName})
        .then((oResponse) => {
          this.$emit("updateProjects");
          this.editMode = false;
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
        } 
        else {
          this.$buefy.toast.open({
            duration: 5000,
            message: "Название проекта не может быть пустым",
            type: "is-warning"
          });
        }
        
      }

    },
    components: {
    //   MultiselectionControl
    }
  }
  </script>
  
  <style>
  .edit-window {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .edit-btn {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .project-edit-btn {
    border-radius: 10px;
  border: 1px solid #C8F57A;
  background-color: white;
  color: black;
  padding: 10px 25px;
  cursor: pointer;
  width: 100%;
  }

  .project-edit-bt:hover {
    background-color: #C8F57A;
    color: white;
  }
  </style>
  