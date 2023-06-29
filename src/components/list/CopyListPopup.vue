<template>
  <div>
    <h2>{{ $t("list.item.copy.question") }}</h2>
    <b-input size="is-small" v-model="searchStr" placeholder="Поиск" />
    <div class="participants" v-for="list in filteredLists" :key="list.listId">
      <div><button class="user-btn" @click="copyList(list.listId)">{{ list.listName }}</button></div>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  props: {
    listItemId: {
      type: Number
    }
  },
  data() {
    return {
        searchStr: "",
        lists: []
    };
  },
  mounted(){
    MockService.getCopyLists()
        .then((oResponse) => {
          this.lists = oResponse.data;
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
    copyList(listId) {
      let listItem = {
        listItemId: this.listItemId
      }
      MockService.copyListItem(listId, listItem)
        .then((oResponse) => {
          this.$emit("updateLists");
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
  computed: {
    filteredLists() {
      return this.lists.filter((list) => list.listName?.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1);
    }
  }
}
</script>

<style>
</style>
