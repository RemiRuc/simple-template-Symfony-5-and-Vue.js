<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="performLogin()">
      <input v-model="username" type="text">
      <input v-model="password" type="password" />
      <input type="submit" value="Login"/>
    </form>
    <p v-if="hasError">{{error}}</p>
    <p v-if="isLoading">Loading...</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
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
        this.$router.push({path: "/"});
      }
    }
  },
  methods: {
    async performLogin() {
      let payload = {username: this.$data.username, password: this.$data.password},
        redirect = this.$route.query.redirect;

      await this.$store.dispatch("security/login", payload);
      if (!this.$store.getters["security/hasError"]) {
        if (typeof redirect !== "undefined") {
          this.$router.push({path: redirect});
        } else {
          this.$router.push({path: "/"});
        }
      }
    }
  }
};
</script>