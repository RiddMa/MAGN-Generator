const Token = require("../lib/token");
const fn_hello = async (ctx, next) => {
  const name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
  "GET /hello/:name": fn_hello,
  "POST /api/token": async (ctx, next) => {
    console.log(await Token.getPayload(ctx));
  },
};
