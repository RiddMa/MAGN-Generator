const mongoose = require("mongoose");
const movieSchema = require("./movie").MovieSchema;

// 定义Schema
UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  movies: [movieSchema],
});

// 定义Model
const UserModel = mongoose.model("User", UserSchema);

// 暴露接口
module.exports = UserModel;
