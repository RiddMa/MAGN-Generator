const puppeteer = require("puppeteer");
const path = require("path");
const { rootDir } = require("../config");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
async function getScreenshot(url, filename, width = 1440, height = 900) {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 3,
    },
    args: ["--disable-web-security"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  console.log("Going to " + url);
  // await sleep(3000);
  let body = await page.$("#toPoster");
  await body.screenshot({
    path: path.resolve(`${rootDir}/resources/screenshot/${filename}.png`),
    type: "png",
    fullPage: false,
  });
  // await page.screenshot({
  //   path: path.resolve(`${rootDir}/resources/screenshot/${filename}.png`),
  //   type: "png",
  //   fullPage: true,
  // });

  await page.close();
  await browser.close();
  return `${filename}.png`;
}

getScreenshot(
  "http://localhost:8080/render/7e886580-efd6-11eb-a2f7-9fb4642f3bf5/5d766760-efd7-11eb-8dbe-f581ab8589f2",
  "test"
);
