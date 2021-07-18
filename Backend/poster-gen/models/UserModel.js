const mongoose = require("mongoose");
const movieSchema = require("./movie").MovieSchema;

// 定义Schema
UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  key: { type: String, required: true },
});

// 定义Model
const UserModel = mongoose.model("User", UserSchema);
// var userDAO = function(){};
// userDAO.prototype.saveUserInfo = async function(){
//   try{
//
//   }
// }
// 暴露接口
module.exports = UserModel;
