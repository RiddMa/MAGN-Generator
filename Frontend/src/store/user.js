const md5 = require("md5");
const userStore = {
  state: {
    username: "",
    password: "",
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setMD5Password(state, password) {
      state.password = md5(password);
    },
  },
  getters: {},
  actions: {},
};
export default userStore;
