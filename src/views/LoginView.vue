<template>
  <div class="login-page">
    <div class="login-form">
      <h3>{{ $t("login.label.authorization") }}</h3>
      <div class="login-content">
        <form>
          <b-field :label="$t('login.label.email')">
            <b-input size="is-small" :placeholder="$t('login.label.email').toLowerCase()" v-model="email"></b-input>
          </b-field>
          <b-field :label="$t('login.label.password')">
            <b-input v-model="password" type="password" size="is-small" :placeholder="$t('login.label.password').toLowerCase()" class="customInput" password-reveal></b-input>
          </b-field>
        </form>
        <b-button type="is-warning is-small" inverted @click="onLoginClick">{{ $t("login.btn.enter") }}</b-button>
        <b-button type="is-success is-small" inverted @click="onSignUpClick">{{ $t("signup.btn.enter") }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  data() {
    return {
      email: "",
      password: "",
      isEmailValid: true,
      isPasswordValid: true
    };
  },
  methods: {
    onLoginClick() {
      this.isEmailValid = this.email.length > 0;
      this.isPasswordValid = this.password.length > 0;
      if (!this.isPasswordValid || !this.isEmailValid) {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Введите данные для входа",
          type: "is-warning"
        });
      } else {
        let user = {
          email: this.email,
          password: this.password
        };
        MockService.getUser(user)
          .then((oResponse) => {
            this.$store.state.userToken = oResponse.data.token;
            this.$store.state.user = {
              userLogin: oResponse.data.userLogin,
              userEmail: oResponse.data.userEmail,
              userLanguage: oResponse.data.userLanguage
            };
            this.$buefy.toast.open({
              duration: 5000,
              message: "Авторизация прошла успешно",
              type: "is-success"
            });
            this.$router.push({
              name: "/"
            });
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
    onSignUpClick() {
      this.$router.push({
        name: "signup"
      });
    }
  }
};
</script>

<style lang="scss"></style>
