<template>
  <v-app>
    <v-toast></v-toast>
    <v-app-bar
      class="appBar"
      app
      color="rgba(255, 255, 255, 0.5)"
      light
      dense
      elevation="0"
    >
      <v-tabs centered :optional="true">
        <v-tab to="/" :ripple="false">新建</v-tab>
        <v-tab to="/user" :ripple="false">用户</v-tab>
        <v-tab to="/about" :ripple="false">关于</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
        <div style="height: 500px"></div>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col class="text-center">
        {{ new Date().getFullYear() }} — <strong>Ridd</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import VToast from "@/components/vToast";
export default {
  name: "App",
  components: { VToast },
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
    this.$store.commit("setUsername", localStorage.getItem("username"));
  },
};
</script>

<style scoped>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei UI", "WenQuanYi Micro Hei",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei UI", "WenQuanYi Micro Hei",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.appBar {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
</style>
