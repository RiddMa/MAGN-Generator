const Mongoose = require("mongoose");
const { ErrHandler, LogHandler } = require("../lib/error");

// 定义Schema
const MovieReviewSchema = new Mongoose.Schema({
  reviewId: { type: String },
  timestamp: { type: Date },
  title: { type: String },
  titleCN: String,
  year: { type: Number, min: 1888, max: 9999 },
  genre: {
    action: Boolean,
    adventure: Boolean,
    animation: Boolean,
    comedy: Boolean,
    drama: Boolean,
    fantasy: Boolean,
    historical: Boolean,
    horror: Boolean,
    sci_fi: Boolean,
    thriller: Boolean,
  },
  rating: {
    visual: { type: Number, min: 0, max: 10 },
    screenplay: { type: Number, min: 0, max: 10 },
    sound: { type: Number, min: 0, max: 10 },
    editing: { type: Number, min: 0, max: 10 },
    avg: { type: Number, min: 0, max: 10 },
  },
  comment: String,
});

const UserReviewSchema = new Mongoose.Schema({
  uuid: { type: String, required: true },
  reviews: [MovieReviewSchema],
});

const UserReviewModel = new Mongoose.model("user_reviews", UserReviewSchema);

// 暴露接口
module.exports = {
  /**
   * 保存review并返回更改后review列表
   * @param uuid
   * @param newReview
   * @returns {Promise<*>}
   */
  async createUserReview(uuid, newReview) {
    try {
      console.log(uuid, newReview.reviewId);
      let query = await UserReviewModel.findOne({ uuid: uuid });
      if (query === null) {
        await UserReviewModel.create({
          uuid: uuid,
          reviews: [newReview],
        });
      } else {
        let query1 = await UserReviewModel.findOne({
          reviews: { $elemMatch: { reviewId: newReview.reviewId } },
        });
        if (query1 === null) {
          await UserReviewModel.updateOne(
            { uuid: uuid },
            { $push: { reviews: newReview } }
          );
        } else {
          await this.updateUserReview(uuid, newReview);
        }
      }
      LogHandler(`Saved review "${newReview.title}" for user ${uuid}`);
      return (await UserReviewModel.findOne({ uuid: uuid })).reviews;
    } catch (e) {
      ErrHandler(e);
    }
  },
  /**
   * 返回用户的review列表
   * @param uuid
   * @returns {Promise<[MovieReviewSchema]>}
   */
  async getAllUserReview(uuid) {
    try {
      LogHandler(`Retrieved reviews for ${uuid}`);
      return (await UserReviewModel.findOne({ uuid: uuid })).reviews;
    } catch (e) {
      ErrHandler(e);
    }
  },
  /**
   * 返回用户的某个review
   * @param uuid
   * @param reviewId
   * @returns {Promise<[MovieReviewSchema]>}
   */
  async getUserReview(uuid, reviewId) {
    try {
      LogHandler(`Retrieved reviews ${reviewId} for ${uuid}`);
      return await UserReviewModel.findOne(
        { uuid: uuid },
        { reviews: { $elemMatch: { reviewId: reviewId } } },
        { lean: true }
      );
    } catch (e) {
      ErrHandler(e);
    }
  },
  async updateUserReview(uuid, newReview) {
    try {
      await UserReviewModel.updateOne(
        {
          uuid: uuid,
          reviews: { $elemMatch: { reviewId: newReview.reviewId } },
        },
        { $set: { "reviews.$": newReview } }
      );
      LogHandler(`Updated review ${newReview.reviewId} for ${uuid}`);
      return (await UserReviewModel.findOne({ uuid: uuid })).reviews;
    } catch (e) {
      ErrHandler(e);
    }
  },
  /**
   * 删除review并返回更改后review列表
   * @param uuid
   * @param reviewId
   * @returns {Promise<*>}
   */
  async deleteUserReview(uuid, reviewId) {
    try {
      let userReview = await UserReviewModel.findOne({ uuid: uuid });
      await userReview.reviews.pull(reviewId);
      await userReview.save();
      LogHandler(`Deleted review ${reviewId} for ${uuid}`);
      return (await UserReviewModel.findOne({ uuid: uuid })).reviews;
    } catch (e) {
      ErrHandler(e);
    }
  },
};
