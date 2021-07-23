<template>
  <v-app>
    <v-app-bar
      class="appBar"
      app
      color="rgba(255, 255, 255, 0.5)"
      light
      dense
      flat
      elevation="0"
    >
      <v-tabs centered>
        <v-tab to="/" :ripple="false">新建</v-tab>
        <v-tab to="/user" :ripple="false">用户</v-tab>
        <v-tab to="/about" :ripple="false">关于</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}
.appBar {
  color: rgba(255, 255, 255, 0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
