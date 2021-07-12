let movies = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
  },
  {
    name: "The Godfather",
    year: 1972,
  },
];

module.exports = {
  "GET /api/movies": async (ctx, next) => {
    // ctx.response.body = {
    //   movies: movies,
    // };
    await ctx.rest(ctx, next, {
      movies: movies,
    });
  },
  "POST /api/movies": async (ctx, next) => {
    let p = {
      title: ctx.request.body.title,
      year: ctx.request.body.year,
    };
    movies.push(p);
    await ctx.rest(ctx, next, p);
  },
};
