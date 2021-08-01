const Mongoose = require("mongoose");
const { ErrHandler, LogHandler } = require("../lib/error");

// 定义Schema
UserSchema = new Mongoose.Schema({
  _id: Mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  uuid: { type: String, required: true },
  key: { type: String, required: true },
});

// 定义Model
const UserModel = Mongoose.model("user", UserSchema);

// 暴露接口
module.exports = {
  async saveUserInfo(userInfo) {
    try {
      await UserModel.create({
        _id: new Mongoose.Types.ObjectId(),
        username: userInfo.username,
        uuid: userInfo.uuid,
        key: userInfo.key,
      });
    } catch (e) {
      ErrHandler(e);
    }
  },
  async findUserByName(username) {
    try {
      return await UserModel.findOne({
        username: username,
      });
    } catch (e) {
      ErrHandler(e);
    }
  },
  async findUserByUUID(uuid) {
    try {
      return (
        await UserModel.findOne({
          uuid: uuid,
        })
      ).username;
    } catch (e) {
      ErrHandler(e);
    }
  },
  async changeUsername(oldName, newName) {
    // try {
    //   let result = await UserModel.findOne({
    //     username: oldName,
    //   });
    //   return result !== null;
    // } catch (e) {
    //   ErrHandler(e);
    // }
  },
  async deleteUserInfo(username) {
    try {
      // await UserModel.create({
      //   _id: new Mongoose.Types.ObjectId(),
      //   username: userInfo.username,
      //   uuid: userInfo.uuid,
      //   key: userInfo.keyStr,
      // });
    } catch (e) {
      ErrHandler(e);
    }
  },
};
