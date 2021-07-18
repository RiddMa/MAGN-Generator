import { createStore } from "vuex";
import netStore from "@/store/net";
import userStore from "@/store/user";
import movieStore from "@/store/movie";

const { Radar } = require("@antv/g2plot");

export default createStore({
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
    drawRadar(state, container) {
      const data = [
        { name: "剧情", rating: state.movie.rating.screenplay },
        { name: "演出\n/剪辑", rating: state.movie.rating.editing },
        { name: "视效/摄影", rating: state.movie.rating.visual },
        { name: "音乐\n/音效", rating: state.movie.rating.sound },
      ];
      state.radarPlot = new Radar(container, {
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
      state.radarPlot.render();
    },
    drawRadarNoAnimation(state, container) {
      const data = [
        { name: "剧情", rating: state.movie.rating.screenplay },
        { name: "演出\n/剪辑", rating: state.movie.rating.editing },
        { name: "视效/摄影", rating: state.movie.rating.visual },
        { name: "音乐\n/音效", rating: state.movie.rating.sound },
      ];
      state.radarPlot = new Radar(container, {
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
      state.radarPlot.render();
    },
    updateRadar(state) {
      const data = [
        { name: "剧情", rating: state.movie.rating.screenplay },
        { name: "演出\n/剪辑", rating: state.movie.rating.editing },
        { name: "视效/摄影", rating: state.movie.rating.visual },
        { name: "音乐\n/音效", rating: state.movie.rating.sound },
      ];
      state.radarPlot.changeData(data);
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
  actions: {},
});
