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
    filterMovie(state, filters) {
      console.log(filters);
      if (filters.genre !== undefined) {
        state.reviewList = state.reviewList.filter((v) => {
          for (let i = 0; i < filters.genre.length; i++) {
            if (v.genre[filters.genre[i]] === true) {
              return true;
            }
          }
          return false;
        });
      }
      if (filters.rating !== undefined) {
        state.reviewList = state.reviewList.filter((v) => {
          return (
            filters.rating.range[0] <= v.rating[filters.rating.type] &&
            v.rating[filters.rating.type] <= filters.rating.range[1]
          );
        });
      }
      if (filters.year !== undefined) {
        state.reviewList = state.reviewList.filter((v) => {
          return filters.year[0] <= v.year && v.year <= filters.year[1];
        });
      }
      if (filters.date !== undefined) {
        state.reviewList = state.reviewList.filter((v) => {
          return moment(v.timestamp).isBetween(moment(filters.date[0]), moment(filters.date[1]));
        });
      }
    },
    /**
     * sortType,sortRatingType,sortOrder
     * @param state
     * @param sortMethod
     */
    sortMovie(state, sortMethod) {
      if (sortMethod.sortType === "rating") {
        if (sortMethod.sortOrder === "Desc") {
          state.reviewList = state.reviewList.sort((a, b) => {
            return b.rating[sortMethod.sortRatingType] - a.rating[sortMethod.sortRatingType];
          });
        } else if (sortMethod.sortOrder === "Asc") {
          state.reviewList = state.reviewList.sort((a, b) => {
            return a.rating[sortMethod.sortRatingType] - b.rating[sortMethod.sortRatingType];
          });
        }
      } else {
        switch (sortMethod.sortType) {
          case "year": {
            if (sortMethod.sortOrder === "Desc") {
              state.reviewList = state.reviewList.sort((a, b) => {
                return b.year - a.year;
              });
            } else if (sortMethod.sortOrder === "Asc") {
              state.reviewList = state.reviewList.sort((a, b) => {
                return a.year - b.year;
              });
            }
            break;
          }
          case "date": {
            if (sortMethod.sortOrder === "Desc") {
              state.reviewList = state.reviewList.sort((a, b) => {
                return moment(a.timestamp).isBefore(moment(b.timestamp)) ? 1 : -1;
              });
            } else if (sortMethod.sortOrder === "Asc") {
              state.reviewList = state.reviewList.sort((a, b) => {
                return moment(a.timestamp).isBefore(moment(b.timestamp)) ? -1 : 1;
              });
            }
            break;
          }
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
