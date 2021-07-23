<template>
  <v-app>
    <v-app-bar
      class="appBar"
      app
      color="rgba(255, 255, 255, 0.5)"
      light
      dense
      elevation="0"
    >
      <v-tabs centered>
        <v-tab to="/" :ripple="false">新建</v-tab>
        <v-tab to="/user" :ripple="false">用户</v-tab>
        <v-tab to="/about" :ripple="false">关于</v-tab>
      </v-tabs>
    </v-app-bar>
    <canvas style="position: fixed; width: 120%; height: 48px"></canvas>
    <v-main>
      <router-view />
    </v-main>
    <div style="height: 1000px"></div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    blurTab: true,
  }),
  methods: {},
  mounted() {
    try {
      this.$store.dispatch("initStore");
      if (document.body.clientWidth < 720) {
        this.$store.commit("setFitPhone", true);
      } else {
        this.$store.commit("setFitPhone", false);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei UI", "WenQuanYi Micro Hei",
    sans-serif;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei UI", "WenQuanYi Micro Hei",
    sans-serif;
}
.appBar {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
</style>
