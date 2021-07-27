const moment = require("moment");
require("moment/locale/zh-cn");

const movieStore = {
  state: {
    reviewId: "",
    timestamp: null,
    title: "The Shawshank Redemption",
    titleCN: "肖申克的救赎",
    year: 1994,
    genre: {
      action: false,
      adventure: false,
      animation: false,
      comedy: false,
      drama: true,
      fantasy: false,
      historical: false,
      horror: false,
      sci_fi: false,
      thriller: true,
    },
    rating: {
      screenplay: 10,
      visual: 8,
      editing: 10,
      sound: 9,
      avg: 0,
    },
    comment:
      "瑞德说，希望是危险的东西，是精神苦闷的根源。重重挤压之下的牢狱里呆了三十年的他的确有资格这么说。因为从进来的那一天起，狱长就说过，「把灵魂交给上帝，把身体交给我。」除了他能弄来的香烟和印着裸女的扑克牌，任何其他异动在这个黑暗的高墙之内似乎都无法生长。\n然而安迪告诉他，「记住，希望是好事——甚至也许是人间至善。而美好的事永不消失。」",
  },
  mutations: {
    setReviewDate(state, date = null) {
      if (date === null) {
        moment.locale("zh-cn");
        state.timestamp = moment();
      } else {
        date.locale("zh-cn");
        state.timestamp = date;
      }
    },
    setMovieRatingAvg(state) {
      let tmpRating = 0;
      const ratingTypeCount = Object.keys(state.rating).length - 1;
      for (let i = 0; i < ratingTypeCount; i++) {
        tmpRating += Object.values(state.rating)[i];
      }
      state.rating.avg = tmpRating / ratingTypeCount;
    },
    setMovieGenre(state, newGenreList) {
      for (let i = 0; i < Object.keys(state.genre).length; i++) {
        Object.keys(state.genre).filter((genre) => {
          state.genre[genre] = newGenreList.includes(genre);
        });
      }
    },
    setMovieYear(state, year) {
      const max = parseInt(moment().year().toFixed()) + 1;
      const min = 1888;
      if (year > max) {
        state.year = max;
      } else if (year < min) {
        if (year === 0) {
          state.year = year;
        } else {
          state.year = min;
        }
      } else {
        state.year = year;
      }
    },
    setMovieComment(state, newComment) {
      state.comment = newComment;
    },
    setMovie(state, newMovie) {
      state.reviewId = newMovie.reviewId;
      state.title = newMovie.title;
      state.titleCN = newMovie.titleCN;
      state.year = newMovie.year;
      state.genre = newMovie.genre;
      state.rating = newMovie.rating;
      state.comment = newMovie.comment;
    },
    clearMovie(state) {
      state.reviewId = "";
      state.title = "";
      state.titleCN = "";
      state.year = "";
      state.genre = {
        action: false,
        sci_fi: false,
        adventure: false,
        drama: false,
        animation: false,
        fantasy: false,
        thriller: false,
        historical: false,
        comedy: false,
        horror: false,
      };
      state.rating = {
        visual: 0,
        screenplay: 0,
        sound: 0,
        editing: 0,
        avg: 0,
      };
      state.comment = "";
    },
  },
  getters: {
    reviewDate: (state) => {
      return moment(state.timestamp).format("L");
    },
    genreList: (state) => {
      let genreList = [];
      const values = Object.values(state.genre);
      Object.keys(state.genre).filter((genre, index) => {
        if (values[index]) {
          genreList.push(genre);
        }
      });
      return genreList;
    },
    genreTags() {
      return [
        { genre: "action", genreCN: "动作" },
        { genre: "sci_fi", genreCN: "科幻" },
        { genre: "adventure", genreCN: "冒险" },
        { genre: "drama", genreCN: "剧情" },
        { genre: "animation", genreCN: "动漫/动画" },
        { genre: "fantasy", genreCN: "奇幻/幻想" },
        { genre: "thriller", genreCN: "悬疑/惊险" },
        { genre: "historical", genreCN: "历史/记录" },
        { genre: "comedy", genreCN: "喜剧" },
        { genre: "horror", genreCN: "恐怖" },
      ];
    },
    checkedGenreCN(state) {
      let checked = [];
      // fxxking ugly but works
      let genreCN = [
        { genre: "action", genreCN: "动作" },
        { genre: "sci_fi", genreCN: "科幻" },
        { genre: "adventure", genreCN: "冒险" },
        { genre: "drama", genreCN: "剧情" },
        { genre: "animation", genreCN: "动漫/动画" },
        { genre: "fantasy", genreCN: "奇幻/幻想" },
        { genre: "thriller", genreCN: "悬疑/惊险" },
        { genre: "historical", genreCN: "历史/记录" },
        { genre: "comedy", genreCN: "喜剧" },
        { genre: "horror", genreCN: "恐怖" },
      ];
      genreCN.forEach((item) => {
        if (state.genre[item.genre]) {
          checked.push(item.genreCN);
        }
      });
      return checked;
    },
  },
  actions: {},
};
export default movieStore;
