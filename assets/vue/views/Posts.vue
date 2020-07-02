<template>
  <div>
    <h1>Posts</h1>

    <div
      v-if="canCreatePost"
    >
      <form>
        <input
          v-model="message"
          type="text"
          class="form-control"
        >
        <button
          :disabled="message.length === 0 || isLoading"
          type="button"
          @click="createPost()"
        >
          Create
        </button>
      </form>
    </div>

    <p v-if="isLoading">
      Loading...
    </p>
    <p v-else-if="hasError">
      {{ error }}
    </p>

    <div
      v-else-if="!hasPosts"
    >
      No posts!
    </div>

    <div
      v-for="post in posts"
      v-else
      :key="post.id"
    >
      <post :message="post.message" />
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";

export default {
  name: "Posts",
  components: {
    Post
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["post/isLoading"];
    },
    hasError() {
      return this.$store.getters["post/hasError"];
    },
    error() {
      return this.$store.getters["post/error"];
    },
    hasPosts() {
      return this.$store.getters["post/hasPosts"];
    },
    posts() {
      return this.$store.getters["post/posts"];
    },
    canCreatePost() {
      return this.$store.getters["security/hasRole"]("ROLE_FOO");
    }
  },
  created() {
    this.$store.dispatch("post/findAll");
  },
  methods: {
    async createPost() {
      const result = await this.$store.dispatch("post/create", this.$data.message);
      if (result !== null) {
        this.$data.message = "";
      }
    }
  }
};
</script>
