import moment from "moment";

const md5 = require("md5");
const userStore = {
  state: {
    username: "",
    password: "",
    reviewList: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setMD5Password(state, password) {
      state.password = md5(password);
    },
    setReviewList(state, reviewList) {
      state.reviewList = reviewList;
    },
    sortMovie(state, sortType) {
      switch (sortType) {
        case "dateDesc": {
          state.reviewList = state.reviewList.sort((a, b) => {
            return moment(a.timestamp).isBefore(moment(b.timestamp));
          });
          break;
        }
        case "dateAsc": {
          state.reviewList = state.reviewList.sort((a, b) => {
            return moment(a.timestamp).isBefore(moment(b.timestamp));
          });
          break;
        }
        case "ratingDesc": {
          state.reviewList = state.reviewList.sort((a, b) => {
            return b.rating.avg - a.rating.avg;
          });
          break;
        }
        case "ratingAsc": {
          state.reviewList = state.reviewList.sort((a, b) => {
            return a.rating.avg - b.rating.avg;
          });
          break;
        }
        case "yearDesc": {
          state.reviewList = state.reviewList.sort((a, b) => {
            return b.year - a.year;
          });
          break;
        }
        case "yearAsc": {
          state.reviewList = state.reviewList.sort((a, b) => {
            return a.year - b.year;
          });
          break;
        }
      }
    },
  },
  getters: {
    getReviewById: (state) => (reviewId) => {
      return state.reviewList.find((item) => {
        return item.reviewId === reviewId;
      });
    },
  },
  actions: {},
};
export default userStore;
