const Koa = require("koa");
const Router = require("koa-router");
const Cors = require("koa2-cors");
const BodyParser = require("koa-bodyparser");
const Fs = require("fs");
const Controller = require("./controller");
const Rest = require("./middlewares/rest");
const APIError = require("./middlewares/error").APIError;
const app = new Koa();
const port = 8081;

//logger
app.use(async (ctx, next) => {
  console.log(`Processing ${ctx.request.method} ${ctx.request.url}`);
  await next();
});
app.use(Cors());
app.use(BodyParser());
app.use(Controller()); //add router
app.context.APIError = APIError;
app.context.rest = Rest;

app.listen(port);
console.log(`App started at port ${port}`);
