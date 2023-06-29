<template>
  <div class="settings-page">
    <div class="user-settings">
      <button type="is-success" inverted v-show="!isEditing" @click="onEdit" class="default-btn" style="">{{ $t("btn.edit") }}</button>
      <button type="is-success" inverted  v-show="isEditing" @click="onSaveSettings" class="default-btn" style="">{{ $t("btn.save") }}</button>
      <button type="is-success" inverted v-show="isEditing" @click="onCancel" class="default-btn" style="">{{ $t("btn.cancel") }}</button>
    </div>
    <div class="user-info-block">
      <div class="user-icon">
        <font-awesome-icon icon="fa-solid fa-user" />
      </div>
      <div class="user-form">
        <div class="form-item">
          <label>{{ $t("settings.label.login") }}</label>
          <div>{{ $store.state.user.userLogin }}</div>
        </div>
        <div class="form-item">
          <label>{{ $t("settings.label.email") }}</label>
          <div>
            <span v-if="!isEditing">{{ formatTextField($store.state.user.userEmail) }}</span>
            <div v-else>
              <b-input :class="{ invalid: !isEmailValid }" v-model="userChanges.userEmail" type="text" @blur="emailChange('blur')" @input="emailChange('input')" />
            </div>
          </div>
        </div>
        <div class="form-item margin-top">
          <label>{{ $t("settings.label.language") }}</label>
          <div>
            <span v-if="!isEditing">{{ languages.find((oLang) => oLang.key === $store.state.user.userLanguage)?.text }}</span>
            <div v-else>
              <div>
                <b-field>
                  <b-radio-button v-for="language in languages" :key="language.key" v-model="userChanges.userLanguage" :native-value="language.key">
                    <span>{{ language.text }}</span>
                  </b-radio-button>
                </b-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isEditing: false,
      defaultData: {},
      userChanges: {
        userEmail: this.$store.state.user.userEmail,
        userLanguage: this.$store.state.user.userLanguage
      },
      isEmailValid: true,
      languages: [
        { key: "RU", text: "Русский" },
        { key: "EN", text: "English" }
      ]
    };
  },
  computed: {
    userLanguageText() {
      return this.languages.find((language) => language.key.toLowerCase() === this.userChanges.userLanguage.toLowerCase()).text;
    },
    ...mapState(["user"])
  },
  methods: {
    onEdit() {
      this.isEditing = true;
    },
    onSaveSettings() {
      if (this.isEmailValid) {
        this.isEditing = false;
        MockService.setUserUpdate(this.userChanges)
          .then(() => {
            this.$store.state.user.userLanguage = this.userChanges.userLanguage;
            this.$store.state.user.userEmail = this.userChanges.userEmail;

            this.changeLocale(this.userChanges.userLanguage.toLowerCase());
            localStorage.setItem("language", this.userChanges.userLanguage.toLowerCase());
            this.updateHeader();
          })
          .catch((error) => {
            this.errorMessage(error.response?.data.errorMessage);
          });
      } else {
        this.errorMessage(this.$t("settings.warning.email"));
      }
    },
    onCancel() {
      this.userChanges.userLanguage = this.$store.state.user.userLanguage;
      this.userChanges.userEmail = this.$store.state.user.userEmail;
      this.isEditing = false;
      this.isEmailValid = true;
    },
    emailChange(eventType) {
      if (this.userChanges.userEmail === "") {
        this.isEmailValid = false;
        return;
      }
      if (/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.userChanges.userEmail)) {
        this.isEmailValid = true;
      } else {
        if (eventType === "blur") {
          this.isEmailValid = false;
          this.errorMessage(this.$t("settings.warning.email"));
        } else {
          this.isEmailValid = true;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.settings-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  .user-settings {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .user-info-block {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;

    .user-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .form-item {
        display: flex;
        flex-direction: row;
        align-items: center;
  
        & > label {
          width: 10rem;
          text-align: end;
        }
      }
  
      .form-item > div {
        margin-left: 0.5rem;
      }
    }
    

    .user-icon {
      width: 12em;
      height: 12em;
      text-align: center;
      background-color: #ffffff;
      svg {
        color: #F36993;
        height: 7rem;
      }
    }
  }
  .b-radio.radio.button.is-selected {
    background-color: #F36993;
  }
  .invalid {
    outline-width: 3px;
    outline-style: solid;
    outline-color: #F79E4C;
    border-radius: 4px;
  }
}
</style>
