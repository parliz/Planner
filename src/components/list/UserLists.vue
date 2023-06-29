<template>
  <div class="my-lists">
    <div class="list" v-for="(list, idx) in lists" :key="idx">
      <div class="list-link" @click="selectList(list.listId)">
        <h2>{{ list.listName }}</h2>
        
      </div>
      <b-button v-if="list.isCreator" icon-right="fa-gear" @click="onListEdit(idx, list.listId, list.listName)"></b-button>
      <the-popup ref="editPopup" :closable="true" height="auto">
        <list-edit-popup :listId="editListId" :listName="editListName" @updateLists="updateLists"></list-edit-popup>
      </the-popup>
    </div>

  </div>
</template>

<script>
import ThePopup from "@/components/ThePopup.vue";
import ListEditPopup from "./ListEditPopup.vue";
export default {
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      editListId: null,
      editListName: ""
    }
  },
  methods: {
    selectList(listId) {
      this.$emit("showListItem", listId);
    },
    onListEdit(idx, listId, listName) {
      this.$refs.editPopup[idx].open();
      this.editListId = listId;
      this.editListName = listName;
    },
    updateLists(){
      this.$emit("updateLists");
    }
  },
  components: {
    ThePopup,
    ListEditPopup
  }
};
</script>

<style lang="scss">
.my-lists {
  background-color: #fff;
  border-radius: 8px;
  --offset-x: var(--island-offset-x, 20px);
  padding: 15px var(--offset-x) 16px;
  font-size: 16px;
  line-height: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-y: scroll;
  /*height: calc(100% - 5rem);*/
  height: 45rem;

  .list {
    border-radius: 8px;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    .list-link {
      display: flex;
      box-sizing: border-box;
      width: 100%;
    }
  }
  .list:hover {
    cursor: pointer;
    background-color: #f36993;
  }
}
</style>
