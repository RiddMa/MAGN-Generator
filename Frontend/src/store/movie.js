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
      visual: 8,
      screenplay: 10,
      sound: 9,
      editing: 10,
    },
    comment:
      "瑞德说，希望是危险的东西，是精神苦闷的根源。重重挤压之下的牢狱里呆了三十年的他的确有资格这么说。因为从进来的那一天起，狱长就说过，「把灵魂交给上帝，把身体交给我。」除了他能弄来的香烟和印着裸女的扑克牌，任何其他异动在这个黑暗的高墙之内似乎都无法生长。\n然而安迪告诉他，「记住，希望是好事——甚至也许是人间至善。而美好的事永不消失。」",
  },
  mutations: {
    setReviewDate(state, date = null) {
      if (date === null) {
        moment.locale("zh-cn");
        state.timestamp = moment().format();
      } else {
        date.locale("zh-cn");
        state.timestamp = date;
      }
    },
    setMovieRating(state, rating) {
      state.rating = rating;
    },
    setMovieRatingAvg(state) {
      let tmpRating = 0;
      const ratingTypeCount = Object.keys(state.rating).length - 1;
      for (let i = 0; i < ratingTypeCount; i++) {
        tmpRating += Object.values(state.rating)[i];
      }
      state.rating.avg = tmpRating / ratingTypeCount;
    },
    setMovieGenre(state, newGenre) {
      for (let i = 0; i < Object.keys(state.genre).length; i++) {
        Object.keys(state.genre).filter((genre) => {
          state.genre[genre] = newGenre.includes(genre);
        });
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
    genreListCN: (state) => {
      let genreListCN = [];
      const values = Object.values(state.genre);
      Object.keys(state.genre).filter((genre, index) => {
        if (values[index]) {
          let genreCN = "";
          switch (genre) {
            case "action":
              genreCN = "动作";
              break;
            case "adventure":
              genreCN = "冒险";
              break;
            case "animation":
              genreCN = "动漫/动画";
              break;
            case "comedy":
              genreCN = "喜剧";
              break;
            case "drama":
              genreCN = "剧情";
              break;
            case "fantasy":
              genreCN = "奇幻/幻想";
              break;
            case "historical":
              genreCN = "历史/记录";
              break;
            case "horror":
              genreCN = "恐怖";
              break;
            case "sci_fi":
              genreCN = "科幻";
              break;
            case "thriller":
              genreCN = "悬疑/惊险";
              break;
          }
          genreListCN.push(genreCN);
        }
      });
      // function compareList() {
      //   const order = {
      //     动作: 1,
      //     科幻: 2,
      //     冒险: 3,
      //     剧情: 4,
      //     "动漫/动画": 5,
      //     "奇幻/幻想": 6,
      //     "悬疑/惊险": 7,
      //     "历史/记录": 8,
      //     喜剧: 9,
      //     恐怖: 10,
      //   };
      //   return (a, b) =>
      //     (order[a] || order.default) - (order[b] || order.default);
      // }
      return genreListCN;
    },
  },
  actions: {},
};
export default movieStore;
