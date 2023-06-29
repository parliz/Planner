<template>
  <div class="list-component">
    <div class="list-content">

      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div style="display: flex; gap: 1rem">
          <b-button type="is-primary is-small is-rounded" icon-right="fa-arrow-left" @click="navBack" />
          <h2>{{ listTitle }}</h2>
        </div>
        <button class="default-btn" is-primary is-small is-rounded @click="showParticipants">{{ $t("participants.list") }}</button>
      </div>

      <div style="display: flex;">
        <list-detail :items="list" class="list-detail" @showListItem="showListItem" @showCreateView="showCreateView"
          @getListInfo="getListInfo"></list-detail>
        <list-item-detail v-if="isListItemDetailShow" :item="listItem" @updateList="updateList"></list-item-detail>
        <create-list-item v-else @getListInfo="getListInfo" class="list-item"></create-list-item>
      </div>

    </div>

    <the-popup ref="popupParticipants" :closable="true" height="auto">
      <participants-list requestType="getListParticipants" :itemId="this.$route.params.listId"
        @closeParticipantPopup="closeParticipantPopup"></participants-list>
    </the-popup>

  </div>
</template>

<script>
import MockService from "@/services/MockService";
import ThePopup from "@/components/ThePopup.vue";
import ParticipantsList from "@/components/ParticipantsList.vue";
import CreateListItem from "@/components/list/CreateListItem.vue";
import ListItemDetail from "@/components/list/ListItemDetail.vue";
import ListDetail from "@/components/list/ListDetail.vue";
export default {
  data() {
    return {
      list: null,
      participantsList: [],
      isListItemDetailShow: false,
      ListItemDetail: null,
      listItem: {},
      listTitle: null
    };
  },
  created() {
    this.getListInfo();
  },
  methods: {
    getListInfo() {
      const sId = this.$route.params.listId;
      MockService.getListDetails(sId)
        .then((oResponse) => {
          this.list = oResponse.data.listItems;
          this.listTitle = oResponse.data.listTitle;
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
    showListItem(itemId) {
      MockService.getItemDetail(itemId)
        .then((oResponse) => {
          this.isListItemDetailShow = true;
          this.listItem = oResponse.data;
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
    showCreateView() {
      this.isListItemDetailShow = false;
    },
    navBack() {
      this.$router.go(-1);
    },
    showParticipants() {
      this.$refs.popupParticipants.open();
    },
    closeParticipantPopup() {
      this.$refs.popupParticipants.close();
      // this.getProjectInfo();
    },
    updateList() {
      this.getListInfo();
      this.isListItemDetailShow = false;
    }
  },
  components: {
    ThePopup,
    ListDetail,
    ListItemDetail,
    CreateListItem,
    ParticipantsList
  }
};
</script>

<style lang="scss">
.list-component {
  display: flex;
  height: 100%;

  .list-content {
    width: 100%;
  }

  .list-detail {
    width: 30rem;
  }

  .list-item {
    width: 100%;
  }
}
</style>
