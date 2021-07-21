const Jwt = require("jsonwebtoken");
const Config = require("../../config");
const { LogHandler, ErrHandler } = require("./error");

module.exports = {
  async generateToken(userInfo) {
    let userToken = await Jwt.sign(userInfo, Config.tokenSecret);
    LogHandler("User Token: " + userToken);
    return userToken;
  },
  // async getPayload(ctx) {
  //   const token = ctx.header.authorization;
  //   if (token) {
  //     try {
  //       return await Jwt.verify(token.split(" ")[1], Config.tokenSecret);
  //     } catch (e) {
  //       ErrHandler("Token verification failed: " + e);
  //     }
  //   }
  // },
};
