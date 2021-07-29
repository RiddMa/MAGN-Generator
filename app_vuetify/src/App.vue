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
        <v-tab to="/">新建</v-tab>
        <v-tab to="/user">用户</v-tab>
        <v-tab v-if="isEditing" :to="editURL">编辑</v-tab>
        <v-tab to="/about">关于</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <transition v-on:enter="tabEnter" v-on:leave="tabLeave">
          <router-view />
        </transition>
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
import { mapState } from "vuex";
import { enter, leave } from "@/utils/animate";
export default {
  name: "App",
  components: { VToast },
  data: () => ({
    blurTab: true,
    transitionDirection: "fold-left",
  }),
  computed: {
    ...mapState({
      editURL: (state) => state.editURL,
      viewURL: (state) => state.viewURL,
      isEditing: (state) => state.isEditing,
    }),
  },
  methods: {
    tabEnter(el, done) {
      console.log("enter", this.transitionDirection);
      enter(this.transitionDirection, el, done);
    },
    tabLeave(el, done) {
      console.log("leave", this.transitionDirection);
      leave(this.transitionDirection, el, done);
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("initStore");
      if (document.body.clientWidth < 720) {
        this.$store.commit("setFitPhone", true);
      } else {
        this.$store.commit("setFitPhone", false);
      }
      let { status, data } = await this.$store.dispatch("heartbeat");
      if (status !== 200 || data.status !== "OK") {
        this.$store.commit("showToast", {
          type: "error",
          message: "无法连接至服务器",
          timer: -1,
        });
      }
    } catch (err) {
      console.log(err);
    }
    this.$store.commit("setUsername", localStorage.getItem("username"));
  },
  watch: {
    $route(to, from) {
      const routerPosition = ["/", "/user", "/?(edit)", "/about"];
      //找到to.path和from.path在routerDeep数组中的下标
      let toPos = routerPosition.indexOf(to.path);
      let fromPos = routerPosition.indexOf(from.path);
      //临时导航下标确定
      if (from.path.startsWith("/edit")) {
        fromPos = 2;
      }
      if (to.path.startsWith("/edit")) {
        toPos = 2;
      }
      this.transitionDirection = toPos > fromPos ? "right" : "left"; //正常导航方向选择
      //类弹窗导航方向选择
      if (to.path === "/login") {
        this.transitionDirection = "down";
      }
      if (from.path === "/login") {
        this.transitionDirection = "up";
      }
    },
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
