module.exports = {
  "POST /api/heartbeat": async (ctx, next) => {
    await ctx.rest(ctx, next, 200, { status: "OK", message: "yeah!" });
  },
  "GET /test": async (ctx,next)=>{
    await ctx.rest(ctx, next, 200, { status: "OK", message: "yeah!" });
  },
};
