const puppeteer = require("puppeteer");
const path = require("path");

async function getScreenshot(url, filename, width = 1280, height = 720) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: width,
      height: height,
    },
    args: ["--disable-web-security"],
  });
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  let body = await page.$(
    "#toImage > div.ant-col.ant-col-xs-24.ant-col-sm-22.ant-col-md-20.ant-col-lg-18.ant-col-xl-16.ant-col-xxl-14 > div"
  );
  // let body = page;
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
  "POST /api/poster": async (ctx, next) => {
    const { url, tid, width, height } = ctx.request.body;
    console.log(url);
    const res = await getScreenshot(url, tid, width, height);
    console.log(res, Date.now());
    await ctx.rest(ctx, next, { filename: res });
  },
};
