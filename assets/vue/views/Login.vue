<template>
  <div>
    <h1>Login</h1>

    <form>
      <input
        v-model="login"
        type="text"
      >
      <input
        v-model="password"
        type="password"
      >
      <button
        :disabled="login.length === 0 || password.length === 0 || isLoading"
        type="button"
        @click="performLogin()"
      >
        Login
      </button>
    </form>
    
    <p v-if="isLoading">
      Loading...
    </p>
    <p v-else-if="hasError">
      error
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: ""
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["security/isLoading"];
    },
    hasError() {
      return this.$store.getters["security/hasError"];
    },
    error() {
      return this.$store.getters["security/error"];
    }
  },
  created() {
    let redirect = this.$route.query.redirect;

    if (this.$store.getters["security/isAuthenticated"]) {
      if (typeof redirect !== "undefined") {
        this.$router.push({path: redirect});
      } else {
        this.$router.push({path: "/home"});
      }
    }
  },
  methods: {
    async performLogin() {
      let payload = {login: this.$data.login, password: this.$data.password},
        redirect = this.$route.query.redirect;

      await this.$store.dispatch("security/login", payload);
      if (!this.$store.getters["security/hasError"]) {
        if (typeof redirect !== "undefined") {
          this.$router.push({path: redirect});
        } else {
          this.$router.push({path: "/home"});
        }
      }
    }
  }
}
</script>