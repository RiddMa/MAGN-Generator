const Fs = require("fs");
const { APIError } = require("../middlewares/error");
const mime = require("mime-types");

module.exports = {
  "POST /api/getPoster": async (ctx, next) => {
    const { tid } = ctx.request.body;
    const filePath = `./resources/screenshot/${tid}.png`;
    try {
      let file = Fs.readFileSync(filePath); //读取文件
      let mimeType = mime.lookup(filePath); //读取图片文件类型
      ctx.set("content-type", mimeType); //设置返回类型
      ctx.body = file; //返回图片
    } catch (error) {
      throw new APIError(
        "Internal: No such file",
        `Cannot find poster ${filePath}`
      );
    }
  },
};
