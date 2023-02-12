<template>
  <div class="login-page">
    <div class="login-form">
      <div class="login-content">
        <form>
          <b-field :label="$t('login.label.login')">
            <b-input
              size="is-small"
              :placeholder="$t('login.label.login').toLowerCase()"
              v-model="login"
            ></b-input>
          </b-field>
          <b-field :label="$t('login.label.password')">
            <b-input
              v-model="password"
              type="password"
              size="is-small"
              :placeholder="$t('login.label.password').toLowerCase()"
              class="customInput"
              password-reveal
            ></b-input>
          </b-field>
        </form>
        <b-button type="is-warning is-small" inverted @click="onLoginClick">{{
          $t("login.btn.enter")
        }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    onLoginClick() {
      this.$store
        .dispatch("secure/login", {
          login: this.login,
          password: this.password,
        })
        .then(() => {
          this.$router.push({
            name: "home",
          });
        })
        .catch((sMessage) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: sMessage,
            type: "is-warning",
          });
        });
    },
  },
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
    background-color: #2c3e50;
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
