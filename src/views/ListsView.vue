<template>
  <div id="projects">
    <label>{{ $t("title.lists")}}</label>
    <button type="is-success" inverted @click="createProject" class="default-btn" style="">{{ $t("btn.list.create") }}</button>
    <user-lists :lists="myLists" @showListItem="showListItem" @updateLists="updateLists"></user-lists>
    <the-popup ref="popup" :closable="true" height="auto">
      <create-list @closePopup="closePopup"></create-list>
    </the-popup>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import ThePopup from "@/components/ThePopup.vue";
import CreateList from "@/components/list/CreateList.vue";
import UserLists from "@/components/list/UserLists.vue";

export default {
  data() {
    return {
      myLists: null
    };
  },
  created() {
    this.getMyLists();
  },
  methods: {
    getMyLists() {
      MockService.getAllMyLists().then((oResponse) => {
        this.myLists = oResponse.data;
      });
    },
    createProject() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
      this.getMyLists();
    },
    updateLists() {
      this.getMyLists();
    }, 
    showListItem(sId){
      this.$router.push({
        name: "ListItem",
        params: { listId: sId }
      });
    }
  },
  components: {
    ThePopup,
    CreateList,
    UserLists
  }
};
</script>

<style lang="scss">
.default-btn {
  display: block;
  margin-left: auto;
}
</style>
