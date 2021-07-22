const puppeteer = require("puppeteer");
const { v1: UUIDv1 } = require("uuid");
const path = require("path");
const Token = require("../lib/token");
const store = require("../lib/store");
const UserReviewDAO = require("../models/UserReviewModel");
const {rootDir} = require("../../config");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function getScreenshot(url, filename, width = 1449, height = 900) {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: {
      width: width,
      height: height,
      deviceScaleFactor: 3,
    },
    args: ["--disable-web-security"],
  });
  const page = await browser.newPage();

  // await sleep(10000);

  await page.goto(url);
  console.log("Going to " + url);
  let body = await page.$("#toImageCol");

  await body.screenshot({
    path: path.resolve(`${rootDir}/resources/screenshot/${filename}.png`),
    type: "png",
    fullPage: false,
  });

  await page.close();
  await browser.close();
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
  body: reviewId
   */
  "POST /api/deleteUserReview": async (ctx, next) => {
    const reviewId = ctx.request.body.reviewId;
    const uuid = ctx.state.jwtData.uuid;
    const reviewList = await UserReviewDAO.deleteUserReview(uuid, reviewId);
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
    const movieReview = (await UserReviewDAO.getUserReview(uuid, reviewId))
      .reviews[0];
    const url = `http://localhost:8080/render/${reviewId}`;

    store.saveMovie2Cache(movieReview);
    const res = await getScreenshot(url, reviewId);
    store.removeMovieCache(reviewId);
    await ctx.rest(ctx, next, 200, { filename: res });
  },
  "POST /api/internal/getMovieAttr/:reviewId": async (ctx, next) => {
    console.log("Puppeteer请求 " + ctx.params.reviewId);
    let result = store.getMovieByUser(ctx.params.reviewId);
    await ctx.rest(ctx, next, 200, result);
  },
};
