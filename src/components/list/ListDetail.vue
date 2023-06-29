<template>
  <div class="my-list-items">
    <div class="list" v-for="(item, idx) in items" :key="idx">
      <div class="list-link" >
        <b-checkbox :value="item.isListItemDone" @input="onItemDoneChange(item.listItemId, item.isListItemDone)"></b-checkbox>
        <h2 @click="selectListItem(item.listItemId)">{{ item.listItemTitle }}</h2>
      </div>
    </div>
    <b-button icon-right="fa-plus" @click="openCreateListItem"></b-button>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectListItem(itemId) {
      this.$emit("showListItem", itemId);
    },
    openCreateListItem() {
      this.$emit("showCreateView");
    },
    onItemDoneChange(itemId, isItemDone) {
      console.log("checkbox")
      MockService.changeListItemDone(itemId,isItemDone)
      .then(() => {
        this.$emit("getListInfo");
      })
      .catch((oError) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: oError.response.data.message,
          type: "is-warning"
        });
      });
    }
  }
};
</script>

<style lang="scss">
.my-list-items {
  background-color: #fff;
  border-radius: 8px;
  --offset-x: var(--island-offset-x, 20px);
  padding: 15px var(--offset-x) 16px;
  font-size: 16px;
  line-height: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .list {
    border-radius: 8px;
    padding: 0.5rem;
    .list-link {
      display: flex;
    }
  }
  .list:hover {
    cursor: pointer;
    background-color: #F79E4C;
  }
}
</style>
