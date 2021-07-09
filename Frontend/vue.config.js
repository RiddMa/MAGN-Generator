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
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    overlay: {
      warnings: false, //不显示警告
      errors: false, //不显示错误
    },
  },
  lintOnSave: false, //关闭eslint检查
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  },
};
