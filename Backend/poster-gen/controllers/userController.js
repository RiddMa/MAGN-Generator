const Scrypt = require("scrypt-kdf");
const UserModel = require("../models/UserModel");
const Token = require("../middlewares/token");

module.exports = {
  "POST /api/login": async (ctx, next) => {
    let userInfo = {
      username: ctx.request.body.username.normalize("NFKC"),
      password: ctx.request.body.password.normalize("NFKC"),
    };
    const user = await UserModel.findOne({
      username: userInfo.username,
    });
    if (user === null) {
      return await ctx.rest(ctx, next, 403, ctx.APIError.User.noUser());
    }
    const keyBuf = Buffer.from(user.key, "base64");
    const ok = await Scrypt.verify(keyBuf, userInfo.password);
    if (ok) {
      const userToken = await Token.generateToken({
        username: userInfo.username,
      });
      await ctx.rest(ctx, next, 200, { token: userToken });
    } else {
      await ctx.rest(ctx, next, 403, ctx.APIError.User.wrongPassword());
    }
  },
  "POST /api/register": async (ctx, next) => {
    let userInfo = {
      username: ctx.request.body.username.normalize("NFKC"),
      password: ctx.request.body.password.normalize("NFKC"),
    };
    if (
      (await UserModel.findOne({
        username: userInfo.username,
      })) !== null
    ) {
      return await ctx.rest(ctx, next, 403, ctx.APIError.User.userExist());
    }
    const keyBuf = await Scrypt.kdf(userInfo.password, { logN: 15 });
    const keyStr = keyBuf.toString("base64");
    console.log(keyStr);
    try {
      const newUser = new UserModel({
        username: userInfo.username,
        key: keyStr,
      });
      await newUser.save();
      const userToken = await Token.generateToken({
        username: userInfo.username,
      });
      await ctx.rest(ctx, next, 200, { token: userToken });
    } catch (e) {
      await ctx.rest(ctx, next, 502, ctx.APIError.Database.general());
    }
  },
  "POST /api/logout": async (ctx, next) => {
    await ctx.rest(ctx, next);
  },
};
