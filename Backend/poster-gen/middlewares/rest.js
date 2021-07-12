module.exports = async (ctx, next, data) => {
  ctx.response.type = "application/json";
  ctx.response.body = data;
  try {
    await next();
  } catch (e) {
    // 返回错误:
    ctx.response.status = 400;
    ctx.response.type = "application/json";
    ctx.response.body = {
      code: e.code || "internal:unknown_error",
      message: e.message || "",
    };
  }
};
