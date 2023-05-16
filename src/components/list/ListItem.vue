<template>
  <div class="list-component">
    <list-detail :items="list" class="list-detail"></list-detail>
   <create-list-item @getListInfo="getListInfo" class="list-item"></create-list-item>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
// import ThePopup from "@/components/ThePopup.vue";
import CreateListItem from "@/components/list/CreateListItem.vue";
// import ListItemDetail from "@/components/list/ListItemDetail.vue";
import ListDetail from "@/components/list/ListDetail.vue";
export default {
  data() {
    return {
      list: null,
      participantsList: [],
      isListItemDetailShow: false,
      ListItemDetail: null
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
          this.list = oResponse.data;
          // (this.participantsList = oResponse.data.listParticipants), (this.projectTasks = oResponse.data.projectTasks);
        })
        .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
    handleDoubleClick(taskId) {
      // MockService.getListDetail(taskId)
      //   .then((oResponse) => {
      //     this.isListItemDetailShow = true;
      //     this.ListItemDetail = oResponse.data;
      //     //   (this.participantsList = oResponse.data.projectParticipants), (this.projectTasks = oResponse.data.projectTasks);
      //   })
      //   .catch((oError) => {
      //     this.$buefy.toast.open({
      //       duration: 5000,
      //       message: oError.response.data.message,
      //       type: "is-warning"
      //     });
      //   });
    },
  },
  components: {
    // ThePopup,
    ListDetail, 
    CreateListItem,
    // ListItemDetail
  }
};
</script>

<style lang="scss">
.list-component {
  display: flex;
  height: 100%;
  .list-detail {
    /*background-color: red;*/
    width: 50%;
  }
  .list-item {
    /*background-color: blue;*/
    width: 50%;
  }
}
</style>
