import Vue from "vue";
import Vuex from "vuex";
import netStore from "@/store/net";
import userStore from "@/store/user";
import movieStore from "@/store/movie";
import _ from "lodash";
import { theme } from "@/plugins/vuetify";
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
      timer: 2250,
      icon: "",
      dialog: false,
      func: undefined,
      accept: undefined,
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
    isViewing: false,
    movieBak: {
      create: undefined,
      edit: undefined,
      view: undefined,
    },
    currentTag: "/",
    reloadWarning: false,
    isSSR: false,
  }),
  mutations: {
    setIsEditing(state, toBool) {
      state.isEditing = toBool;
    },
    setEditURL(state, reviewId) {
      state.editURL = `/edit/${reviewId}`;
    },
    setIsViewing(state, toBool) {
      state.isViewing = toBool;
    },
    setViewURL(state, reviewId) {
      state.viewURL = `/view/${reviewId}`;
    },
    setCurrentTag(state, tag) {
      state.currentTag = tag;
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
    setIsSSR(state, toBool) {
      state.isSSR = toBool;
    },
    setFitPhone(state, toBool) {
      state.fitPhone = toBool;
    },
    setToastResult(state, toBool) {
      state.toast.accept = toBool;
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
      if (data.icon === undefined && data.type === undefined) {
        state.toast.icon = "mdi-information-outline";
      }
      if (data.dialog === true) {
        // if use toast as a dialog
        state.toast.dialog = true;
        state.toast.timer = -1;
        state.toast.color = "primary";
        state.toast.icon = "mdi-help-circle-outline";
        state.toast.func = data.type;
        // if (data.payload !== undefined) {
        //   state.toast.payload = data.payload;
        // }
      } else {
        // not a dialog
        state.toast.dialog = false;
        if (data.timer !== undefined) {
          state.toast.timer = data.timer;
        } else {
          state.toast.timer = 2250;
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
    backupMovie(context, place) {
      const _ = require("lodash");
      switch (place) {
        case "/": {
          context.state.movieBak.create = _.cloneDeep(context.state.movie);
          break;
        }
        case "/view": {
          context.state.movieBak.view = _.cloneDeep(context.state.movie);
          break;
        }
        case "/edit": {
          context.state.movieBak.edit = _.cloneDeep(context.state.movie);
          break;
        }
      }
    },
    restoreMovie(context, place) {
      const _ = require("lodash");
      switch (place) {
        case "/": {
          if (context.state.movieBak.create !== undefined) {
            context.state.movie = _.cloneDeep(context.state.movieBak.create);
          }
          break;
        }
        case "/view": {
          context.state.movie = _.cloneDeep(context.state.movieBak.view);
          break;
        }
        case "/edit": {
          context.state.movie = _.cloneDeep(context.state.movieBak.edit);
          break;
        }
      }
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
        color: theme.light.primary,
        point: {
          size: 2,
        },
        area: {
          style: {
            fill: theme.light.primary,
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
        color: theme.light.primary,
        point: {
          size: 2,
        },
        area: {
          style: {
            fill: theme.light.primary,
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
    getToastResult(context) {
      let tmp = context.state.toast.accept;
      context.state.toast.accept = undefined;
      return tmp;
    },
  },
});
