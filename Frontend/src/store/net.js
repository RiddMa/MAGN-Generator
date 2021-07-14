import axios from "axios";
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到

// if (process.env.NODE_ENV === "development") {
//   axios.defaults.baseURL = "https://www.baidu.com";
// } else if (process.env.NODE_ENV === "debug") {
//   axios.defaults.baseURL = "https://www.ceshi.com";
// } else if (process.env.NODE_ENV === "production") {
//   axios.defaults.baseURL = "https://www.production.com";
// }

const netStore = {
  state: {
    instance: null,
    posterURL: null,
  },
  mutations: {},
  actions: {
    initStore(context) {
      let newInstance = axios.create({
        baseURL: "/api",
        method: "post",
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
        paramsSerializer: function (params) {
          return QS.stringify(params, { arrayFormat: "brackets" });
        },
      });
      newInstance.interceptors.request.use(
        (config) => {
          return config;
        },
        (error) => {
          return Promise.error(error);
        }
      );
      newInstance.interceptors.response.use(
        function (response) {
          // 对响应数据做点什么
          return response;
        },
        function (error) {
          // 对响应错误做点什么
          return Promise.reject(error);
        }
      );
      context.state.instance = newInstance;
    },
    async login(context, username, password) {
      try {
        let data = await context.state.instance.post("/login", {
          username: username,
          password: password,
        });
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
    async sendMovieAttr(context, tid) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/generatePoster/" + tid, {
            movie: context.rootState.movie,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e.response.data.errors);
          });
      });
    },
    async getPoster(context, tid) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post(
            "/getPoster",
            {
              tid: tid,
            },
            {
              responseType: "blob",
            }
          )
          .then((response) => {
            let urlCreator = window.URL || window.webkitURL;
            context.state.posterURL = urlCreator.createObjectURL(response.data);
            resolve(response);
          })
          .catch((e) => {
            reject(e.response.data.errors);
          });
      });
    },
    async getMovieAttr(context, tid) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/getMovieAttr", {
            tid: tid,
          })
          .then((response) => {
            context.rootState.movie = response.data;
            context.commit("updateRadar");
            resolve(response);
          })
          .catch((e) => {
            reject(e.response.data.errors);
          });
      });
    },
    async getMovieAttrTid(context, tid) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/getMovieAttr/" + tid)
          .then((response) => {
            context.rootState.movie = response.data;
            context.commit("updateRadar");
            resolve(response);
          })
          .catch((e) => {
            reject(e.response.data.errors);
          });
      });
    },
  },
  getters: {},
};

export default netStore;
