const puppeteer = require("puppeteer");
const { v1: UUIDv1 } = require("uuid");
const path = require("path");
const fse = require("fs-extra");
const Token = require("../lib/token");
const store = require("../lib/store");
const UserReviewDAO = require("../models/UserReviewModel");
const { rootDir } = require("../../config");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const browser = await puppeteer.launch({
  // headless: false,
  defaultViewport: {
    width: 1280,
    height: 720,
    deviceScaleFactor: 3,
  },
  args: ["--disable-web-security", "--no-sandbox"],
});

async function getScreenshot(url, uuid, reviewId, width = 1440, height = 900) {
  const page = await browser.newPage();
  console.log("Going to " + url);
  await page.goto(url);
  await page.waitForResponse("https://www.ridd.xyz/api/internal/getUsername");

  await fse.ensureDir(`${rootDir}/screenshot`);
  let filename = `${uuid}_${reviewId}`;

  let body = await page.$("#toPoster");
  await body.screenshot({
    path: path.resolve(`${rootDir}/screenshot/${filename}.png`),
    type: "png",
    fullPage: false,
  });

  await page.close();
  return `${filename}.png`;
}

module.exports = {
  /*
  body: movieReview
   */
  "POST /api/saveUserReview": async (ctx, next) => {
    const movieReview = ctx.request.body;
    const uuid = ctx.state.jwtData.uuid;
    const reviewList = await UserReviewDAO.createUserReview(uuid, movieReview);
    await ctx.rest(ctx, next, 200, reviewList);
  },
  /*
  body: conditions
   */
  "POST /api/getAllUserReview": async (ctx, next) => {
    const conditions = ctx.request.body;
    const uuid = ctx.state.jwtData.uuid;
    const reviewList = await UserReviewDAO.getAllUserReview(uuid);
    await ctx.rest(ctx, next, 200, reviewList);
  },
  /*
  body: idList
   */
  "POST /api/deleteUserReview": async (ctx, next) => {
    const reviewId = ctx.request.body.reviewId;
    const uuid = ctx.state.jwtData.uuid;
    await UserReviewDAO.deleteUserReview(uuid, reviewId);
    const reviewList = await UserReviewDAO.getAllUserReview(uuid);
    await ctx.rest(ctx, next, 200, reviewList);
  },
  /*
  body: movieReview
   */
  "POST /api/updateUserReview": async (ctx, next) => {
    const movieReview = ctx.request.body;
    const uuid = ctx.state.jwtData.uuid;
    const reviewList = await UserReviewDAO.updateUserReview(uuid, movieReview);
    await ctx.rest(ctx, next, 200, reviewList);
  },
  "POST /api/generatePoster": async (ctx, next) => {
    const uuid = ctx.state.jwtData.uuid;
    const reviewId = ctx.request.body.reviewId;

    const url = `https://www.ridd.xyz/render/${uuid}/${reviewId}`;
    // const url = `http://localhost:8080/render/${uuid}/${reviewId}`;
    const res = await getScreenshot(url, uuid, reviewId);
    await ctx.rest(ctx, next, 200, { filename: res });
  },
  "POST /api/internal/getMovieAttr/:uuid/:reviewId": async (ctx, next) => {
    console.log("Puppeteer请求 ", ctx.params.uuid, ctx.params.reviewId);
    const result = await UserReviewDAO.getUserReview(
      ctx.params.uuid,
      ctx.params.reviewId
    );
    await ctx.rest(ctx, next, 200, result);
  },
};
