module.exports = {
  movieCache: [],
  saveMovie2Cache(movieAttr) {
    this.movieCache.push(movieAttr);
    console.log(movieAttr);
  },
  removeMovieCache(UUID) {
    let index = this.movieCache.findIndex((item) => {
      return item.UUID === UUID;
    });
    if (index !== -1) {
      this.movieCache.splice(index, 1);
    }
  },
  getMovieByUser(UUID) {
    return this.movieCache.find((item) => {
      return item.UUID === UUID;
    });
  },
};
