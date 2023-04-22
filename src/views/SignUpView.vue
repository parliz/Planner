<template>
  <div class="login-page">
    <div class="login-form">
      <h3>{{ $t("login.label.registration") }}</h3>
      <div class="login-content">
        <form>
          <b-field :label="$t('login.label.email')">
            <b-input size="is-small" :placeholder="$t('login.label.email').toLowerCase()" v-model="email"></b-input>
          </b-field>
          <b-field :label="$t('login.label.login')">
            <b-input size="is-small" :placeholder="$t('login.label.login').toLowerCase()" v-model="login"></b-input>
          </b-field>
          <b-field :label="$t('login.label.password')">
            <b-input v-model="password" type="password" size="is-small" :placeholder="$t('login.label.password').toLowerCase()" class="customInput" password-reveal></b-input>
          </b-field>
        </form>
        <b-button type="is-warning is-small" inverted @click="onSignUpClick">{{ $t("signup.btn.enter") }}</b-button>
        <b-button type="is-success is-small" inverted @click="onLoginClick">{{ $t("login.btn.enter") }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import MockService from "@/services/MockService";
export default {
  data() {
    return {
      login: "",
      password: "",
      email: "",
      isEmailValid: true,
      isLoginValid: true,
      isPasswordValid: true
    };
  },
  methods: {
    onSignUpClick() {
      this.isEmailValid = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.email);
      this.isLoginValid = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/.test(this.login);
      this.isPasswordValid = this.password.length > 4 && this.password.length < 10;
      if (!this.isPasswordValid) {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Длина пароля должна быть не менее 4 символов и не более 10",
          type: "is-warning"
        });
      }
      if (!this.isLoginValid) {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Логин не должен быть пустым и должен содержать латинские буквы и цифры",
          type: "is-warning"
        });
      }
      if (!this.isEmailValid) {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Введите корректную почту",
          type: "is-warning"
        });
      }
      if (this.isEmailValid && this.isLoginValid && this.isPasswordValid) {
        const newUser = {
          login: this.login,
          email: this.email,
          password: this.password,
          language: "RU"
        };
        MockService.setUser(newUser)
          .then((oResponse) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: oResponse.data.message,
              type: "is-success"
            });
            this.$router.push({
              name: "login"
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
    onLoginClick() {
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style lang="scss"></style>
