const puppeteer = require("puppeteer");
const path = require("path");
const Token = require("../middlewares/token");
const Store = require("../controllers/store");

async function getScreenshot(url, filename, width = 1449, height = 900) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: width,
      height: height,
      deviceScaleFactor: 3,
    },
    args: ["--disable-web-security"],
  });
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  console.log("Going to " + url);
  let body = await page.$("#toImageCol");

  await body.screenshot({
    path: path.resolve(`./resources/screenshot/${filename}.png`),
    type: "png",
    fullPage: false,
  });

  await page.close();
  await browser.close();
  return `${filename}.png`;
}

module.exports = {
  "POST /api/generatePoster": async (ctx, next) => {
    const UUID = (await Token.getPayload(ctx)).username;
    let movieAttr = ctx.request.body.movie;
    movieAttr.UUID = UUID;
    const url = "http://localhost:8080/user/" + UUID;
    // url = "https://www.ridd.xyz/user/" + ctx.params.tid,

    Store.saveMovie2Cache(movieAttr);
    const res = await getScreenshot(url, UUID);
    Store.removeMovieCache(UUID);
    await ctx.rest(ctx, next, 200, { filename: res });
  },
  "POST /api/internal/getMovieAttr/:UUID": async (ctx, next) => {
    console.log("Puppeteer请求" + ctx.params.UUID);
    await ctx.rest(ctx, next, 200, Store.getMovieByUser(ctx.params.UUID));
  },
};
