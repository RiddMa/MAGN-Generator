class Store {
  constructor() {
    this.movieCache = [];
  }
  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }
  saveMovie2Cache(movieAttr) {
    this.movieCache.push(movieAttr);
  }
  removeMovieCache(_id) {
    let index = this.movieCache.findIndex((item) => {
      return item._id === _id;
    });
    if (index !== -1) {
      this.movieCache.splice(index, 1);
    }
  }

  getMovieByUser(reviewId) {
    return this.movieCache.find((o, i) => {
      if (o.reviewId === reviewId) {
        return true;
      }
    });
  }
}

module.exports = Store.getInstance();
