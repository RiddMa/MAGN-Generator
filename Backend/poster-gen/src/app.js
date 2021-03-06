const Koa = require("koa");
const Cors = require("koa2-cors");
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const jwt = require("koa-jwt");
const Controller = require("./controller");
const Rest = require("./middlewares/rest");
const Db = require("./lib/db");
const Config = require("../config");
const APIError = require("./lib/error").APIError;
const app = new Koa();

Db.connect2Db();

app.use(Logger());
app.use(
  Cors({
    origin: "*",
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
  })
);
app.use(BodyParser());
app.use(
  jwt({ secret: Config.tokenSecret, key: "jwtData" }).unless({
    path: [
      /^\/api\/login/,
      /^\/api\/register/,
      /^\/api\/internal/,
      /^\/api\/heartbeat/,
    ],
  })
);
app.use(Controller()); //scan router
app.context.APIError = APIError;
app.context.rest = Rest;

app.listen(Config.port);
console.log(`App started at port ${Config.port}`);
