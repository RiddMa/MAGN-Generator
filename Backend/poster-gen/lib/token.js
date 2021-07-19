const Jwt = require("jsonwebtoken");
const Config = require("../config");
module.exports = {
  async generateToken({ username: username }) {
    return await Jwt.sign({ username: username }, Config.tokenSecret);
  },
  async getPayload(ctx) {
    const token = ctx.header.authorization;
    if (token) {
      try {
        return await Jwt.verify(token.split(" ")[1], Config.tokenSecret);
      } catch (e) {
        console.log("Token verification failed: ", e);
      }
    }
  },
};
