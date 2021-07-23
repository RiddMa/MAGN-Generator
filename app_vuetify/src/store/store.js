import Vue from "vue";
import Vuex from "vuex";
import netStore from "@/store/net";
import userStore from "@/store/user";
import movieStore from "@/store/movie";
const { Radar } = require("@antv/g2plot");
const { message } = require("ant-design-vue/es/message");

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    netStore: netStore,
    userStore: userStore,
    movie: movieStore,
  },
  state: () => ({
    showTitleInput: false,
    showCommentInput: true,
    searchText: "The Shawshank Redemption",
    fitPhone: true,
    radarPlot: undefined,
    pendingQueue: [],
  }),
  mutations: {
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
  },
  getters: {
    titleWithYear: (state) => {
      return state.movie.title + "-" + state.movie.year.toString();
    },
    avgScore: (state) => {
      let tmpRating = 0;
      const ratingTypeCount = Object.keys(state.movie.rating).length - 1;
      for (let i = 0; i < ratingTypeCount; i++) {
        tmpRating += Object.values(state.movie.rating)[i];
      }
      return tmpRating / ratingTypeCount;
    },
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
    async isUserLoggedIn(context, that) {
      if (localStorage.getItem("token") === null) {
        message.error("请先登录");
        await that.$router.push("/login");
        return false;
      } else {
        return true;
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
