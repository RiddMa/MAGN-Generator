import { createStore } from "vuex";

export default createStore({
  state: {
    movie: {
      title: "The Shawshank Redemption",
      year: 1995,
      rating: {
        visual: 8,
        screenplay: 10,
        sound: 9,
        editing: 10,
      },
      comment:
        "瑞德（Red）说，希望是危险的东西，是精神苦闷的根源。重重挤压之下的牢狱里呆了三十年的他的确有资格这么说。因为从进来的那一天起，狱长就说过，「把灵魂交给上帝，把身体交给我。」除了他能弄来的香烟和印着裸女的扑克牌，任何其他异动在这个黑暗的高墙之内似乎都无法生长。\n然而安迪（Andy）告诉他，「记住，希望是好事——甚至也许是人间至善。而美好的事永不消失。」",
    },
  },
  mutations: {
    setMovieRating(state, rating) {
      state.movie.rating = rating;
    },
  },
  getters: {
    titleWithYear: (state) => {
      return state.movie.title + "-" + state.movie.year.toString();
    },
    avgScore: (state) => {
      return (
        Object.values(state.movie.rating).reduce(function (sum, cur) {
          return sum + cur;
        }) / Object.keys(state.movie.rating).length
      );
    },
  },
  actions: {},
  modules: {},
});
