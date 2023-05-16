<template>
  <div id="projects">
    <label>Списки</label>
    <button type="is-success" inverted @click="createProject" class="create-btn" style="">{{ $t("btn.create.list") }}</button>
    <user-lists :lists="myLists" @showListItem="showListItem"></user-lists>
    <the-popup ref="popup" :closable="true" height="25rem">
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
.create-btn {
  display: block;
  margin-left: auto;
}
</style>
