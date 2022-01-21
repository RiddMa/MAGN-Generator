const fse = require("fs-extra");
const { rootDir } = require("../../config");
const path = require("path");
const puppeteer = require("puppeteer");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const browser = puppeteer.launch({
  // headless: false,
  defaultViewport: {
    width: 1280,
    height: 720,
    deviceScaleFactor: 2,
  },
  args: ["--disable-web-security", "--no-sandbox"],
});

async function getPDF(url) {
  const page = await (await browser).newPage();
  console.log("Going to " + url);
  await page.goto(url);

  await fse.ensureDir(`${rootDir}/pdf`);
  let filename = `testPDF`;
  await sleep(750);
  // let body = await page.$("#cv");
  // await body.screenshot({
  //   path: path.resolve(`${rootDir}/pdf/${filename}.png`),
  //   type: "png",
  //   fullPage: false,
  // });

  // await page.screenshot({
  //   path: path.resolve(`${rootDir}/pdf/${filename}.png`),
  //   type: "png",
  //   fullPage: true,
  // }

  const pdf = await page.pdf({
    path: path.resolve(`${rootDir}/pdf/${filename}.pdf`),
    format: "a4",
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
    scale: 0.83,
  });

  await page.close();
  await (await browser).close();
  return `${filename}.png`;
}

getPDF("http://192.168.1.252:8080");
