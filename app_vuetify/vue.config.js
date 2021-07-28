const webpack = require("webpack");
module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    open: false,
    overlay: {
      warnings: false, //不显示警告
      errors: false, //不显示错误
    },
    // proxy: {
    //   "/api": {
    //     target: "http://101.32.75.165:6666/api/", // 你请求的第三方接口
    //     changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     pathRewrite: {
    //       "^/api": "", // 替换target中的请求地址，也就是说/api=/target，请求target这个地址的时候直接写成/api即可。
    //     },
    //   },
    // },
  },
  lintOnSave: false, //关闭eslint检查
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  },
};
