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
        <b-button type="is-warning is-small" inverted @click="onSignUpClick">{{ $t("signip.btn.enter") }}</b-button>
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
      email: ""
    };
  },
  methods: {
    onSignUpClick() {
      const newUser = {
        login: this.login,
        email: this.email,
        password: this.email
      };
      MockService.setUser(newUser).then((oResponse) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: oResponse.data,
          type: "is-success"
        });

        this.$router.push({
          name: "login"
        });
      });
    }
  }
};
</script>

<style lang="scss">
.login-page {
  z-index: 8999;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .login-form {
    padding: 1.5rem;
    width: 20rem;
    height: 25rem;
    box-shadow: 0px 0px 4px #2c3e5020;
    border-radius: 30px;
    background-color: #00d7d9;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    label {
      font-size: 0.725rem;
      color: #fff;
    }

    button {
      margin-top: 0.5rem;
    }

    img {
      max-width: 75%;
      margin-top: 2rem;
    }

    .login-content {
      width: 100%;
      display: flex;
      gap: 2rem;
      flex-direction: column;

      button {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .login-page {
    .login-form {
      height: 100vh;
      width: 100%;
    }
  }
}
</style>
