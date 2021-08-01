import axios from "axios";
import QS from "qs";
const { v1: UUIDv1 } = require("uuid");

const netStore = {
  state: {
    instance: undefined,
    posterURL: undefined,
  },
  mutations: {},
  actions: {
    initStore(context) {
      let newInstance = axios.create({
        baseURL: "https://www.ridd.xyz/api/",
        // baseURL: "http://localhost:8090/api/",
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
    async saveUserReview(context, reviewItem) {
      context.rootState.movie.reviewId = UUIDv1().toString(); // generate new reviewId for this review
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/saveUserReview", reviewItem)
          .then((response) => {
            context.commit("setReviewList", response.data);
            context.commit("showToast", {
              type: "success",
              message: "保存成功",
            });
            resolve(response);
          })
          .catch((e) => {
            // message.error("保存失败：" + e.response.data.errors);
            reject(e.response.data.errors);
          });
      });
      // now movie review in vueX has signed reviewId
    },
    async updateUserReview(context, reviewItem) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/updateUserReview", reviewItem)
          .then((response) => {
            context.commit("setReviewList", response.data);
            context.commit("showToast", {
              type: "success",
              message: "更新成功",
            });
            resolve(response);
          })
          .catch((e) => {
            // message.error("更新失败：" + e.response.data.errors);
            reject(e.response.data.errors);
          });
      });
    },
    async getAllUserReview(context) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/getAllUserReview")
          .then((response) => {
            context.commit("setReviewList", response.data);
            // context.commit("showToast", {
            //   type: "success",
            //   message: "获取成功",
            // });
            resolve(response);
          })
          .catch((e) => {
            // message.error("获取失败：" + e.response.data.errors);
            reject(e.response.data.errors);
          });
      });
    },
    async deleteUserReview(context, reviewId) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post("/deleteUserReview", {
            reviewId: reviewId,
          })
          .then((response) => {
            context.commit("showToast", {
              type: "success",
              message: "删除成功",
            });
            context.commit("setReviewList", response.data);
            resolve(response);
          })
          .catch((e) => {
            context.commit("showToast", {
              type: "error",
              message: `删除失败:${e.response.data.errors}`,
            });
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
    async downloadPoster(context, reviewId) {
      return new Promise((resolve, reject) => {
        context.state
          .instance({
            url: "/downloadPoster",
            method: "post",
            data: {
              reviewId: reviewId,
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
    async getMovieAttrTid(context, info) {
      return new Promise((resolve, reject) => {
        context.state.instance
          .post(`/internal/getMovieAttr/${info.uuid}/${info.reviewId}`)
          .then((response) => {
            // context.rootState.movie = response.data;
            context.commit("setMovie", response.data);
            context.commit("setMovieRatingAvg");
            context.dispatch("updateRadar");
            resolve(response);
          })
          .catch((e) => {
            reject(e.response.data.errors);
          });
      });
    },
    async heartbeat(context) {
      try {
        let response = await context.state.instance.post("/heartbeat", {});
        return { status: response.status, data: response.data };
      } catch (e) {
        console.log(e);
        return { status: e.response.status, data: e.response.data };
      }
    },
    async getUsername(context, uuid) {
      try {
        let response = await context.state.instance.post(
          "/internal/getUsername",
          {
            uuid: uuid,
          }
        );
        context.commit("setUsername", response.data);
        return response.data;
      } catch (e) {
        console.log(e);
        return { status: e.response.status, data: e.response.data };
      }
    },
  },
  getters: {},
};

export default netStore;
