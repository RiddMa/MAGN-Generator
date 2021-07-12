const webpack = require("webpack");
module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "MAG(N)影评生成";
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#40BA83",
            "link-color": "#40BA83",
            "border-radius-base": "5px",
            "font-size-base": "14px",
            "font-size-sm": "13px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    open: false,
    overlay: {
      warnings: false, //不显示警告
      errors: false, //不显示错误
    },
    proxy: {
      "/api": {
        target: "http://localhost:8081/api/", // 你请求的第三方接口
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/api": "", // 替换target中的请求地址，也就是说/api=/target，请求target这个地址的时候直接写成/api即可。
        },
      },
    },
  },
  lintOnSave: false, //关闭eslint检查
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  },
};
