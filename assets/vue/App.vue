<template>
    <router-view />
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  computed: {
    isAuthenticated() {
      return this.$store.getters["security/isAuthenticated"]
    },
  },
  created() {
      let isAuthenticated = JSON.parse(this.$parent.$el.attributes["data-is-authenticated"].value),
        user = JSON.parse(this.$parent.$el.attributes["data-user"].value);

      let payload = { isAuthenticated: isAuthenticated, user: user };
      this.$store.dispatch("security/onRefresh", payload);

      axios.interceptors.response.use(undefined, (err) => {
        return new Promise(() => {
          if (err.response.status === 401) {
            this.$router.push({path: "/login"})
          } else if (err.response.status === 500) {
            document.open();
            document.write(err.response.data);
            document.close();
          }
          throw err;
        });
      });
    },
};
</script>