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
        <v-tab to="/" v-bind:key="'New'">新建</v-tab>
        <v-tab to="/user" v-bind:key="'User'">用户</v-tab>
        <v-tab v-if="isViewing" :to="viewURL" v-bind:key="'ViewMovie'">
          查看
        </v-tab>
        <v-tab v-if="isEditing" :to="editURL" v-bind:key="'EditMovie'">
          编辑
        </v-tab>
        <v-tab to="/about" v-bind:key="'About'">关于</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main v-resize="onResize" style="position: relative">
      <v-container fluid>
        <transition
          v-on:appear="routeAppearCaller"
          v-on:enter="routeEnterCaller"
          v-on:leave="routeLeaveCaller"
          v-bind:css="false"
        >
          <router-view />
        </transition>
      </v-container>
    </v-main>
    <v-footer padless style="position: relative">
      <v-col class="text-center">
        {{ new Date().getFullYear() }} — <strong>Ridd</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import VToast from "@/components/vToast";
import { mapState } from "vuex";
import { routeEnter, routeLeave } from "@/utils/animate";
export default {
  name: "App",
  head: {
    title: "MAG(N)",
    meta: [{ name: "MAG(N)", content: "MAG(N)" }],
  },
  components: { VToast },
  data: () => ({
    blurTab: true,
    transitionDirection: "up",
  }),
  computed: {
    ...mapState({
      editURL: (state) => state.editURL,
      viewURL: (state) => state.viewURL,
      isEditing: (state) => state.isEditing,
      isViewing: (state) => state.isViewing,
    }),
  },
  methods: {
    routeAppearCaller(el, done) {
      routeEnter("up", el, done);
    },
    routeEnterCaller(el, done) {
      routeEnter(this.transitionDirection, el, done);
    },
    routeLeaveCaller(el, done) {
      routeLeave(this.transitionDirection, el, done);
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      if (this.windowSize.x < 800) {
        //临时
        this.$store.commit("showToast", {
          type: "error",
          message: "手机端暂未适配……当前页面宽度过窄，可能导致页面显示不正常",
          timer: 5000,
        });
        this.$store.commit("setFitPhone", true);
      } else {
        this.$store.commit("setFitPhone", false);
      }
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("initStore");
      this.onResize();
      let { status, data } = await this.$store.dispatch("heartbeat");
      if (status !== 200 || data.status !== "OK") {
        this.$store.commit("showToast", {
          type: "error",
          message: "无法连接至服务器,请联系管理员",
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
      const routerPosition = ["/", "/user", "/?(view)", "/?(edit)", "/about"];
      //找到to.path和from.path在routerDeep数组中的下标
      let toPos = routerPosition.indexOf(to.path);
      let fromPos = routerPosition.indexOf(from.path);
      //临时导航下标确定
      if (from.path.startsWith("/edit")) {
        fromPos = 3;
      } else if (from.path.startsWith("/view")) {
        fromPos = 2;
      }
      if (to.path.startsWith("/edit")) {
        toPos = 3;
      } else if (to.path.startsWith("/view")) {
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
