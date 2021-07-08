module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: true,
      },
      "ant-design-vue",
    ],
    // [
    //   "import",
    //   {
    //     libraryName: "naive-ui",
    //     customName: (name) => {
    //       console.log(name);
    //       let newName = name.slice(2);
    //       console.log(newName);
    //       return `${newName}`;
    //     },
    //     style: (name) => {
    //       // 注意这里的name为组件所在的路径，按需加载样式配置提取对应组件名称的css即可
    //       return `naive-ui/es/${name}/styles/`;
    //     },
    //
    //   },
    //   "naive-ui",
    // ],
    [
      "import",
      {
        libraryName: "@antv/g2",
        libraryDirectory: "lib",
        style: true,
      },
      "@antv/g2",
    ],
  ],
};
