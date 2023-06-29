<template>
    <div class="create-item">
      <!-- <b-label>{{ $t("list.label.create.newLists") }}</b-label> -->
      <div>
        <h3>{{ $t("list.item.create.name") }}</h3>
        <b-input size="is-small" v-model="listItemTitle"></b-input>
      </div>
      <div class="image">
        <div v-if="imageData">
          <img class="item-img" :src="imageData">
        </div>
        <h3>{{ $t("list.item.file") }}</h3>
        <!-- <b-input size="is-small" v-model="listItemName"></b-input> -->
        <input type="file" @change="onFileChanged($event)" accept="image/*">
      </div>
      <div>
        <h3>{{ $t("list.item.comment") }}</h3>
        <b-input size="is-small" v-model="listItemText" type="textarea" maxlength="1500"></b-input>
        <button type="is-success" inverted class="default-btn" @click="createListItem">{{ $t("btn.create") }}</button>
      </div>
      <div>
        
      </div>
    </div>
  </template>
  
  <script>
  import MockService from "@/services/MockService";
  import MultiselectionControl from "@/components/MultiselectionControl.vue";
  export default {
    data() {
      return {
        listItemTitle: "",
        listItemText: "",
        imageData: null
      };
    },
    created() {
      
    },
    methods: {
      createListItem() {
        if (this.listItemTitle.length > 0) {
          const listItem = {
            listId: this.$route.params.listId,
            listItemTitle: this.listItemTitle,
            listItemText: this.listItemText,
            listItemImg: this.imageData
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
              this.imageData = null;
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
    }
    },
    components: {
    }
  };
  </script>
  
  <style>
.create-item {
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.image {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item-img {
  max-width: 200px;
  max-height: 200px;
}
</style>
  