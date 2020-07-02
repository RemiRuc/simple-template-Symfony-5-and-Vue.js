import axios from "axios";

export default {
  post(message) {
    return axios.post("/api/posts", {
      message: message
    });
  },
  get() {
    return axios.get("/api/posts");
  }
};