const Scrypt = require("scrypt-kdf");
const { v1: UUIDv1 } = require("uuid");
const UserDAO = require("../models/UserModel");
const Token = require("../lib/token");
const { ErrHandler, LogHandler } = require("../lib/error");

module.exports = {
  "POST /api/login": async (ctx, next) => {
    let request = {
      username: ctx.request.body.username.normalize("NFKC"),
      password: ctx.request.body.password.normalize("NFKC"),
    };
    const userInfo = await UserDAO.findUserByName(request.username);
    if (userInfo === null) {
      return await ctx.rest(ctx, next, 403, ctx.APIError.User.noUser());
    } else {
      const passphrase = Buffer.from(userInfo.key, "base64");
      const ok = await Scrypt.verify(passphrase, request.password);
      if (ok) {
        const userToken = await Token.generateToken({ uuid: userInfo.uuid });
        await ctx.rest(ctx, next, 200, { token: userToken });
      } else {
        await ctx.rest(ctx, next, 403, ctx.APIError.User.wrongPassword());
      }
    }
  },
  "POST /api/register": async (ctx, next) => {
    let request = {
      username: ctx.request.body.username.normalize("NFKC"),
      password: ctx.request.body.password.normalize("NFKC"),
    };
    // check if username exists
    if ((await UserDAO.findUserByName(request.username)) !== null) {
      return await ctx.rest(ctx, next, 403, ctx.APIError.User.userExist());
    } else {
      let userInfo = {
        username: request.username,
        uuid: UUIDv1().toString(),
        key: (await Scrypt.kdf(request.password, { logN: 15 })).toString(
          "base64"
        ),
      };
      try {
        await UserDAO.saveUserInfo(userInfo);
        const userToken = await Token.generateToken({ uuid: userInfo.uuid });
        await ctx.rest(ctx, next, 200, { token: userToken });
      } catch (e) {
        await ctx.rest(ctx, next, 502, ctx.APIError.Database.general());
      }
    }
  },
};
