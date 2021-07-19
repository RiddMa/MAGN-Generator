const Fs = require("fs");
const { APIError } = require("../lib/error");
const mime = require("mime-types");
const Token = require("../lib/token");

module.exports = {
  "POST /api/getPoster": async (ctx, next) => {
    const UUID = (await Token.getPayload(ctx)).username;
    const filePath = `./resources/screenshot/${UUID}.png`;
    try {
      let file = Fs.readFileSync(filePath); //读取文件
      let mimeType = mime.lookup(filePath); //读取图片文件类型
      ctx.set("content-type", mimeType); //设置返回类型
      ctx.body = file; //返回图片
    } catch (error) {
      console.log(error);
    }
  },
};
