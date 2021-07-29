import Vue from "vue";
import Vuex from "vuex";
import netStore from "@/store/net";
import userStore from "@/store/user";
import movieStore from "@/store/movie";
import _ from "lodash";
const { Radar } = require("@antv/g2plot");

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    netStore: netStore,
    userStore: userStore,
    movie: movieStore,
  },
  state: () => ({
    toast: {
      show: false,
      message: "",
      color: "",
      timer: 1500,
      icon: "",
    },
    showTitleInput: false,
    showCommentInput: true,
    searchText: "The Shawshank Redemption",
    fitPhone: true,
    radarPlot: undefined,
    pendingQueue: [],
    editURL: "/",
    viewURL: "/",
    isEditing: false,
    movieBak: undefined,
  }),
  mutations: {
    setIsEditing(state, toBool) {
      state.isEditing = toBool;
    },
    setEditURL(state, reviewId) {
      state.editURL = `/edit/${reviewId}`;
    },
    setViewURL(state, reviewId) {
      state.editURL = `/view/${reviewId}`;
    },
    setSearchText(state, searched) {
      state.searchText = searched;
    },
    setTitleInput(state, toBool) {
      state.showTitleInput = toBool;
    },
    setCommentInput(state, toBool) {
      state.showCommentInput = toBool;
    },
    setFitPhone(state, toBool) {
      state.fitPhone = toBool;
    },
    pushPendingQueue(state, message) {
      state.pendingQueue.push(message);
    },
    popPendingQueue(state, message) {
      state.pendingQueue.findIndex((msg, i) => {
        if (msg === message) {
          state.pendingQueue.splice(i, 1);
        }
      });
    },
    showToast(state, data) {
      state.toast.message = data.message;
      if (data.timer !== undefined) {
        state.toast.timer = data.timer;
      } else {
        state.toast.timer = 2250;
      }
      if (data.icon === undefined && data.type === undefined) {
        state.toast.icon = "mdi-information-outline";
      }

      switch (data.type) {
        case "success": {
          state.toast.color = "green";
          state.toast.icon = "mdi-check-circle-outline";
          break;
        }
        case "info": {
          state.toast.color = "blue";
          state.toast.icon = "mdi-information-outline";
          break;
        }
        case "error": {
          state.toast.color = "red";
          state.toast.icon = "mdi-alert-outline";
          break;
        }
      }
      state.toast.show = true;
    },
  },
  getters: {
    radarData: (state) => {
      return [
        { name: "剧情", rating: state.movie.rating.screenplay },
        { name: "演出\n/剪辑", rating: state.movie.rating.editing },
        { name: "视效/摄影", rating: state.movie.rating.visual },
        { name: "音乐\n/音效", rating: state.movie.rating.sound },
      ];
    },
  },
  actions: {
    async isUserLoggedIn(context) {
      if (localStorage.getItem("token") === null) {
        context.commit("showToast", {
          message: "请先登录。您的更改已缓存。",
          type: "info",
        });
        return false;
      } else {
        return true;
      }
    },
    backupMovie(context) {
      const _ = require("lodash");
      context.state.movieBak = _.cloneDeep(context.state.movie);
      context.commit("clearMovie");
      // if (context.state.radarPlot !== undefined) {
      //   context.state.radarPlot.destroy();
      //   context.state.radarPlot = undefined;
      // }
    },
    restoreMovie(context) {
      const _ = require("lodash");
      context.state.movie = _.cloneDeep(context.state.movieBak);
      context.state.movieBak = undefined;
    },
    drawRadar(context, container) {
      const data = context.getters.radarData;
      context.state.radarPlot = new Radar(container, {
        data: data,
        xField: "name",
        yField: "rating",
        padding: "auto",
        meta: {
          rating: {
            alias: "评分",
            min: 0,
            max: 10,
          },
        },
        autoFit: true,
        tooltip: {
          showCrosshairs: false,
        },
        color: "#42C090",
        point: {
          size: 2,
        },
        area: {
          style: {
            fill: "#61DDAA",
          },
        },
      });
      context.state.radarPlot.render();
    },
    drawRadarNoAnimation(context, container) {
      const data = context.getters.radarData;
      context.state.radarPlot = new Radar(container, {
        data: data,
        xField: "name",
        yField: "rating",
        padding: "auto",
        meta: {
          rating: {
            alias: "评分",
            min: 0,
            max: 10,
          },
        },
        autoFit: true,
        tooltip: {
          showCrosshairs: false,
        },
        color: "#42C090",
        point: {
          size: 2,
        },
        area: {
          style: {
            fill: "#61DDAA",
          },
        },
        animation: false,
      });
      context.state.radarPlot.render();
    },
    updateRadar(context) {
      const data = context.getters.radarData;
      context.state.radarPlot.changeData(data);
    },
  },
});
