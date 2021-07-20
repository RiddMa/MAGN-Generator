import axios from "axios";
import QS from "qs";
const { v1: UUIDv1 } = require("uuid");

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
          const token = localStorage.getItem("token");
          if (token) {
            // Bearer是JWT的认证头部信息
            config.headers.common["Authorization"] = "Bearer " + token;
          }
          return config;
        },
        (error) => {
          return Promise.error(error);
        }
      );
      // newInstance.interceptors.response.use(
      //   function (response) {
      //     // 对响应数据做点什么
      //     return response;
      //   },
      //   function (error) {
      //     // 对响应错误做点什么
      //     console.log("response" + error);
      //     return error;
      //   }
      // );
      context.state.instance = newInstance;
    },
    async userLogin(context, userInfo) {
      try {
        let response = await context.state.instance.post("/login", {
          username: userInfo.username,
          password: userInfo.password,
        });
        localStorage.setItem("token", response.data.token);
        return { status: response.status, data: response.data };
      } catch (e) {
        console.log(e);
        return { status: e.response.status, data: e.response.data };
      }
    },
    async userRegister(context, userInfo) {
      try {
        let response = await context.state.instance.post("/register", {
          username: userInfo.username,
          password: userInfo.password,
        });
        localStorage.setItem("token", response.data.token);
        return { status: response.status, data: response.data };
      } catch (e) {
        console.log(e);
        return { status: e.response.status, data: e.response.data };
      }
    },
    async saveUserReview(context) {
      context.rootState.movie.reviewId = UUIDv1().toString(); // generate new reviewId for this review
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/saveUserReview", context.rootState.movie)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e.response.data.errors);
          });
      });
      // now movie review in vueX has signed reviewId
    },
    async updateMovieReview(context) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/generatePoster", context.rootState.movie)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e.response.data.errors);
          });
      });
    },
    async generatePoster(context) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/generatePoster", {
            reviewId: context.rootState.movie.reviewId,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e.response.data.errors);
          });
      });
    },
    async downloadPoster(context) {
      return new Promise((resolve, reject) => {
        context.state
          .instance({
            url: "/downloadPoster",
            method: "post",
            data: {
              reviewId: context.rootState.movie.reviewId,
            },
            responseType: "blob",
          })
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
    async getMovieAttrTid(context, uuid) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/internal/getMovieAttr/" + uuid)
          .then((response) => {
            console.log(response.data);
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
