<template>
  <div>
    <!-- <h2>{{ $t("participants.list") }}</h2> -->
    <div>
      <b-input size="is-small" v-model="searchStr" placeholder="Поиск"/>
      <div v-if="creator.isUserCreator">
      <b-tabs v-model="activeTab" position="is-centered" >
        <b-tab-item :label="$t('btn.delete')">
          <div class="participants" v-for="user in filteredParticipants" :key="user.userId">
            <div>
              <button :class="user.userId === creator.userId ? 'creator-btn': 'user-btn'" :disabled="user.userId === creator.userId" @click="deleteParticipant(user.userId)">{{ user.userLogin }}</button>
            </div>
            
          </div>
        </b-tab-item>

        <b-tab-item :label="$t('btn.add')" v-if="creatorMode">
          <div class="participants" v-for="user in filteredUsers" :key="user.userId">
            <div><button class="user-btn" @click="addParticipant(user.userId)">{{ user.userLogin }}</button></div>
            
          </div>
        </b-tab-item>
    </b-tabs>
  </div>
    <div v-else style="margin-top: 0.5rem;">
      <div class="participants" v-for="user in filteredParticipants" :key="user.userId" >
        <div>
          <button :class="user.userId === creator.userId ? 'creator-btn': 'user-btn'" disabled>{{ user.userLogin }}</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  props: {
    requestType: {
      type: String
    },
    itemId: {
      type: Number
    }
  },
  data() {
    return {
        list: [],
        participants: [],
        creator: null,
        searchStr: "",
        activeTab: 0,
        creatorMode: true
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
        MockService[this.requestType](this.itemId)
          .then((oResponse) => {
            this.participants = oResponse.data.participants;
            this.list = oResponse.data.users;
            this.creator = oResponse.data.creator;
          })
          .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
    addParticipant(userId) {
      let putRequest = "";
        if (this.requestType === "getProjectParticipants") {
          putRequest = "addProjectParticipants";
        } else {
          putRequest = "addListParticipants";
        }
      MockService[putRequest](this.itemId, {userId: userId})
          .then((oResponse) => {
            this.$emit("closeParticipantPopup");
            this.getUsers();
          })
          .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
    deleteParticipant(userId) {
      let putRequest = "";
        if (this.requestType === "getProjectParticipants") {
          putRequest = "deleteProjectParticipants";
        } else {
          putRequest = "deleteListParticipants";
        }
      MockService[putRequest](this.itemId, userId)
          .then((oResponse) => {
            this.$emit("closeParticipantPopup");
            this.getUsers();
          })
          .catch((oError) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: oError.response.data.message,
            type: "is-warning"
          });
        });
    },
  },
  computed: {
    filteredParticipants() {
      return this.participants.filter((user) => user.userLogin?.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1);
    },
    filteredUsers() {
      return this.list.filter((user) => user.userLogin?.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1);
    }
  }
};
</script>

<style>
.participants {
  /*display: flex;
  flex-direction: column;
  gap: 0.2rem;*/
  .button {
    width: 100%;
  }
}
.participant-btn i {
  margin-left: 10px; /* отступ от названия кнопки */
  color: #999; /* цвет крестика */
}
.user-btn {
  border-radius: 10px;
  border: 1px solid #C8F57A;
  background-color: white;
  color: black;
  padding: 10px 25px;
  cursor: pointer;
  width: 100%;
}

.user-btn:hover {
  background-color: #C8F57A;
  color: white;
}

.creator-btn {
  border-radius: 10px;
  border: 1px solid #F36993;
  background-color: #F36993;
  color: white;
  padding: 10px 25px;
  cursor: pointer;
  width: 100%;
}

.creator-btn:hover {
  background-color: #F36993;
  color: white;
}
</style>
