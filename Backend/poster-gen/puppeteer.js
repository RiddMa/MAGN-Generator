const puppeteer = require("puppeteer");
const path = require("path");
async function setMovieAttr(url, width = 1920, height = 1080) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: width,
      height: height,
    },
    args: ["--disable-web-security"],
  });
  const page = await browser.newPage();
  await page.goto(url);

  // let body = await page.$("#toImage")
  setTimeout(async () => {
    await page.screenshot({
      path: path.resolve(`./resources/screenshot/admin.png`),
      type: "png",
      fullPage: true,
    });
  }, 3000);
}

setMovieAttr("http://localhost:8080/user/admin");
