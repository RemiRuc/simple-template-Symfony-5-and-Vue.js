<template>
  <div>
    <nav>
      <router-link
        to="/home"
      >
        App
      </router-link>
      <ul>
        <router-link
          tag="li"
          to="/home"
        >
          <a>Home</a>
        </router-link>
        <router-link
          tag="li"
          to="/posts"
        >
          <a>Posts</a>
        </router-link>
        <li
          v-if="isAuthenticated"
        >
          <a
            href="/api/security/logout"
          >Logout</a>
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
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
}
</script>