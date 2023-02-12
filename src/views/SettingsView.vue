<template>
  <div class="settings-page">
    <div class="client-settings">
      <b-button size="is-small" type="is-primary" v-show="!isEditing" @click="onEdit">{{ $t("btn.edit") }}</b-button>
      <b-button size="is-small" type="is-primary" v-show="isEditing" @click="onSaveSettings">{{ $t("btn.save") }}</b-button>
      <b-button size="is-small" type="is-primary" v-show="isEditing" @click="onCancel">{{ $t("btn.cancel") }}</b-button>
    </div>
    <div class="client-info-block">
      <div class="client-icon">
        <font-awesome-icon icon="fa-solid fa-user" />
      </div>
      <div class="client-form">
        <div class="form-item">
          <label>{{ $t("settings.label.fio") }}</label>
          <div>{{ $store.state.user.name }}</div>
        </div>
        <div class="form-item">
          <label>{{ $t("settings.label.email") }}</label>
          <div>{{ $store.state.user.email }}</div>
        </div>
        <div class="form-item">
          <label>{{ $t("settings.label.company") }}</label>
          <div>{{ $store.state.user.company }}</div>
        </div>
        <div class="form-item">
          <label>{{ $t("settings.label.phone") }}</label>
          <div>{{ $store.state.user.phone }}</div>
        </div>
        <div class="form-item">
          <label>{{ $t("settings.label.address") }}</label>
          <div>{{ $store.state.user.address }}</div>
        </div>
        <div class="form-item">
          <label>{{ $t("settings.label.telegram") }}</label>
          <div>
            <span v-if="!isEditing">{{ $store.state.user.telegram }}</span>
            <div v-else>
              <b-input v-model="userChanges.telegram" type="text" size="is-small" />
            </div>
          </div>
        </div>
        <div class="form-item margin-top">
          <label>{{ $t("settings.label.language") }}</label>
          <div>
            <span v-if="!isEditing">{{ languages.find((oLang) => oLang.key === $store.state.user.language)?.text }}</span>
            <div v-else>
              <div>
                <b-field>
                  <b-radio-button v-for="language in languages" :key="language.key" v-model="userChanges.language" :native-value="language.key" size="is-small" type=" is-primary">
                    <span>{{ language.text }}</span>
                  </b-radio-button>
                </b-field>
              </div>
            </div>
          </div>
        </div>
        <div class="form-item">
          <label>{{ $t("settings.label.duplicateToEmail") }}</label>
          <div>
            <b-checkbox v-if="isEditing" v-model="userChanges.agreeToDuplicate" size="is-small" />
            <div v-else>{{ !!userChanges.agreeToDuplicate ? $t("txt.yes") : $t("txt.no") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  data() {
    return {
      isEditing: false,
      defaultData: {},
      userChanges: {
        telegram: this.$store.state.user.telegram,
        language: this.$store.state.user.language,
        agreeToDuplicate: this.$store.state.user.agreeToDuplicateNotifications
      },
      languages: [
        { key: "ru", text: "Русский" },
        { key: "en", text: "English" }
      ]
    };
  },
  methods: {
    onEdit() {
      this.isEditing = true;
    },
    onSaveSettings() {
      this.$i18n.locale = this.userChanges.language;
      this.$store.state.user.language = this.userChanges.language;
      this.$store.state.user.telegram = this.userChanges.telegram;
      this.$store.state.user.agreeToDuplicateNotifications = this.userChanges.agreeToDuplicate;
      this.isEditing = false;
      this.updateHeader();
    },
    onCancel() {
      this.userChanges.language = this.$store.state.user.language;
      this.userChanges.telegram = this.$store.state.user.telegram;
      this.userChanges.agreeToDuplicate = this.$store.state.user.agreeToDuplicateNotifications;
      this.isEditing = false;
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

  .client-settings {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .client-info-block {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;

    .form-item {
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

    .client-icon {
      width: 12rem;
      text-align: center;
      svg {
        color: #2c3e50;
        height: 7rem;
      }
    }

    select {
    }
  }
}
</style>
