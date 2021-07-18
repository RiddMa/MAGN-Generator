const mongoose = require("mongoose");

// 定义Schema
const MovieSchema = new mongoose.Schema({
  reviewDate: { type: Date, required: true },
  title: { type: String, required: true },
  titleCN: String,
  year: { type: Number, min: 1888, max: 9999 },
  genre: {
    action: Boolean,
    adventure: Boolean,
    animation: Boolean,
    comedy: Boolean,
    drama: Boolean,
    fantasy: Boolean,
    historical: Boolean,
    horror: Boolean,
    sci_fi: Boolean,
    thriller: Boolean,
  },
  rating: {
    visual: { type: Number, min: 0, max: 10, required: true },
    screenplay: { type: Number, min: 0, max: 10, required: true },
    sound: { type: Number, min: 0, max: 10, required: true },
    editing: { type: Number, min: 0, max: 10, required: true },
    avg: { type: Number, min: 0, max: 10, required: true },
  },
  comment: String,
});

const MovieModel = mongoose.model("Movie", MovieSchema);

// 暴露接口
module.exports = { MovieModel, MovieSchema };
