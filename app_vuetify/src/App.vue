<template>
  <v-app style="position: relative">
    <template v-if="!isSSR">
      <v-overlay
        id="dialogOverlay"
        light
        color="rgba(255, 255, 255, 0.5) !important"
        :value="toast.dialog && toast.show"
        opacity="0.75"
        style="z-index: 20000"
      ></v-overlay>
      <v-toast style="z-index: 20001"></v-toast>
      <!--      <v-app-bar-->
      <!--        class="appBar"-->
      <!--        app-->
      <!--        color="rgba(255, 255, 255, 0.5)"-->
      <!--        light-->
      <!--        dense-->
      <!--        elevation="2"-->
      <!--      >-->
      <!--        <v-tabs v-model="activeTab" show-arrows>-->
      <!--          <v-tab to="/" v-bind:key="0">新建</v-tab>-->
      <!--          <v-tab to="/user" v-bind:key="1">用户</v-tab>-->
      <!--          <v-tab v-if="isViewing" :to="viewURL" v-bind:key="2"> 查看 </v-tab>-->
      <!--          <v-tab v-if="isEditing" :to="editURL" v-bind:key="3"> 编辑 </v-tab>-->
      <!--          <v-tab to="/about" v-bind:key="4">关于</v-tab>-->
      <!--        </v-tabs>-->
      <!--      </v-app-bar>-->
      <v-app-bar
        id="appBar"
        class="appBar"
        app
        light
        dense
        elevation="4"
        color="rgba(255, 255, 255, 0.5)"
      >
        <v-tabs class="navTab" v-model="activeTab" centered>
          <v-tab to="/" v-bind:key="0" class="TAB grow">
            <span class="tabText">
              <!--              <v-icon dense class="pb-1">mdi-file-outline</v-icon>-->
              新建
            </span>
          </v-tab>
          <v-tab to="/user" v-bind:key="1" class="TAB grow">
            <span class="tabText">
              <!--              <v-icon dense class="pb-1">mdi-account-circle-outline</v-icon>-->
              用户
            </span>
          </v-tab>
          <v-tab v-if="isViewing" :to="viewURL" v-bind:key="2" class="TAB grow">
            <span class="tabText">
              <!--              <v-icon dense class="pb-1">mdi-account-circle-outline</v-icon>-->
              查看
            </span>
          </v-tab>
          <v-tab v-if="isEditing" :to="editURL" v-bind:key="3" class="TAB grow">
            <span class="tabText">
              <!--              <v-icon dense class="pb-1">mdi-account-circle-outline</v-icon>-->
              编辑
            </span>
          </v-tab>
          <v-tab to="/about" v-bind:key="4" class="TAB grow">
            <span class="tabText">
              <!--              <v-icon dense class="pb-1">mdi-account-circle-outline</v-icon>-->
              关于
            </span>
          </v-tab>
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
    </template>
    <template v-else>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </template>
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
    activeTab: 0,
    blurTab: true,
    transitionDirection: "up",
    windowSize: undefined,
  }),
  computed: {
    ...mapState({
      editURL: (state) => state.editURL,
      viewURL: (state) => state.viewURL,
      isEditing: (state) => state.isEditing,
      isViewing: (state) => state.isViewing,
      isSSR: (state) => state.isSSR,
      toast: (state) => state.toast,
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
        this.$store.commit("setFitPhone", true);
      } else {
        this.$store.commit("setFitPhone", false);
      }
      document.querySelector("#appBar").style.width = `${this.windowSize.x}px`;
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
      if (to.path.startsWith("/poster")) {
        this.transitionDirection = "down";
      }
      if (from.path.startsWith("/poster")) {
        this.transitionDirection = "up";
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Source Han Sans CN", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei UI",
    "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Source Han Sans CN", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei UI",
    "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.appBar {
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
}
.navTab {
  z-index: 19999;
}
.TAB {
  min-width: 25px;
  max-width: 150px;
}
.tabText {
  white-space: nowrap;
  display: inline-block;
}
</style>
