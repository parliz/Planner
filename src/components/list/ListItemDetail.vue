<template>
  <div class="create-item">
    <!-- <h2 class="list-item-title">{{ item.listItemTitle }}</h2> -->
    <b-input v-model="editListName"></b-input>
    <!-- <button type="is-success" class="default-btn" size="is-small" inverted @click="deleteListItem">{{ $t("btn.edit") }}</button> -->
    <div class="image">
      <div v-if="imageData">
        <img :src="imageData">
      </div>
      <!-- <h3 v-else>{{ $t("list.item.file") }}</h3> -->
      <input class="img-input" type="file" @change="onFileChanged($event)" accept="image/*">
    </div>
    <div>
      <h3>{{ $t("list.item.comment") }}</h3>
      <b-input v-model="listItemText" type="textarea" maxlength="1500"></b-input>
    </div>
    <div style="display: flex; gap: 1rem;">
      <button type="is-success" class="default-btn" size="is-small" inverted @click="saveEditListItem">{{ $t("btn.edit.save") }}</button>
      <button type="is-success" class="default-btn" size="is-small" inverted @click="copyEditListItem">{{ $t("btn.copy.tolist") }}</button>
      <button type="is-success" class="default-btn" size="is-small" inverted @click="deleteListItem">{{ $t("btn.delete") }}</button>
      
    </div>
    
    <the-popup ref="popup" :closable="true" height="auto" :width="auto">
      <copy-list-popup :listItemId="this.item.listItemId" @updateList="updateList"></copy-list-popup>
    </the-popup>
  </div>
</template>

<script>
import ThePopup from "@/components/ThePopup.vue";
import MockService from "@/services/MockService";
import CopyListPopup from "@/components/list/CopyListPopup.vue";
export default {
  data() {
    return {
      listItemTitle: "",
      listItemText: "",
      imageData: null,
      showZoom: false,
      editListName: "",
      lists: []
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    copyList: {
      type: Array,
      default: () => ([])
    }
  },
  watch:{
    item (newItem)
      {
        this.listItemTitle = newItem.listItemTitle;
        this.listItemText = newItem.listItemText;
        this.imageData = newItem.listItemImg;
        this.editListName = this.item.listItemTitle;
        return newItem;
      }
  },
  mounted() {
    // this.editListName = this.item.listItemTitle;
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
    onFileChanged(event) {
      let input = event.target
      if (input.files && input.files[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    saveEditListItem() {
      const listItem = {
        listId: this.$route.params.listId,
        listItemTitle: this.editListName,
        listItemText: this.listItemText,
        listItemImg: this.imageData,
        isListItemDone: this.item.isListItemDone
      };
      MockService.editListItem(this.item.listItemId, listItem)
          .then((oResponse) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oResponse.data.message,
              type: "is-success"
            });
            this.listItemTitle = "";
            this.listItemText = "";
            this.$emit("updateList");
          })
          .catch((oError) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oError.data.message,
              type: "is-warning"
            });
          });
    },
    deleteListItem() {
      MockService.deleteListItem(this.item.listItemId)
          .then((oResponse) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oResponse.data.message,
              type: "is-success"
            });
            // this.listItemTitle = "";
            // this.listItemText = "";
            this.$emit("updateList");
          })
          .catch((oError) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oError.data.message,
              type: "is-warning"
            });
          });
    },
    copyEditListItem() {
      this.$refs.popup.open();
    },
    updateList(){
      this.$emit("updateList");
    }
  },
  components: {
    ThePopup,
    CopyListPopup
  }
};
</script>

<style lang="scss">
.create-item {
  width: 100%;
  padding: 1.5rem;

  .list-item-title {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    
  }

  .image {
    display: flex;
    flex-direction: column;
    align-items: center;
  
    .img-input {
      margin-top: 0.75rem;
    }
  
    .item-img {
      max-width: 200px;
      max-height: 200px;
    }
  }
}

</style>
