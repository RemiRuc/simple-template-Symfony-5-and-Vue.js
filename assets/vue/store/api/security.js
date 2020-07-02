import axios from "axios";

export default {
  login(username, password) {
    return axios.post("/api/security/login", {
      username: username,
      password: password
    });
  }
}