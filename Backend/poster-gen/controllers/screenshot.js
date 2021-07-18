const puppeteer = require("puppeteer");
const path = require("path");

async function getScreenshot(url, filename, width = 1920, height = 1080) {
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
    const movie = ctx.request.body;
    const url = "https://www.ridd.xyz";
    const tid = "admin";
    const width = 1920,
      height = 1080;
    const res = await getScreenshot(url, tid, width, height);
    console.log(res, Date.now());
    await ctx.rest(ctx, next, { filename: res });
  },
  /**
   * body:{movie:movie}
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   * @constructor
   */
  "POST /api/generatePoster/:tid": async (ctx, next) => {
    const movie = ctx.request.body, //Get movie attrs from client
      // url = "https://www.ridd.xyz/user/" + ctx.params.tid,
      url = "http://localhost:8080/user/" + ctx.params.tid,
      tid = ctx.params.tid,
      width = 1440,
      height = 900;
    console.log("Going to " + url);
    const res = await getScreenshot(url, tid, width, height);
    console.log(res, Date.now());
    await ctx.rest(ctx, next, 200, { filename: res });
  },
};
