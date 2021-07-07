module.exports = {
  productionSourceMap: false,
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
};
