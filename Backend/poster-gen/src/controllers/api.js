function prepareMovieAttr() {
  const moment = require("moment");
  require("moment/locale/zh-cn");
  moment.locale("zh-cn");
  let movie = {
    reviewDate: moment().format("L"),
    title: "The Godfather",
    titleCN: "教父",
    year: "1972",
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
      visual: 9,
      screenplay: 10,
      sound: 9,
      editing: 10,
      avg: 0,
    },
    comment: "测试",
  };
  return movie;
}

module.exports = {

};
