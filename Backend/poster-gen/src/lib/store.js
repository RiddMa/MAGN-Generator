class Store {
  constructor() {
    this.movieCache = [];
    this.idList = [];
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
  cacheReviewId(reviewId) {
    this.idList.push(reviewId);
  }
  removeReviewId(reviewId) {
    let index = this.idList.findIndex((item) => {
      return item === reviewId;
    });
    if (index !== -1) {
      this.idList.splice(index, 1);
    }
  }
  getId(reviewId) {
    return this.idList.find((item, i) => {
      if (item === reviewId) {
        return true;
      }
    });
  }
}

module.exports = Store.getInstance();
