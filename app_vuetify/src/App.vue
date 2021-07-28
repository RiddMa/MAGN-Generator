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
        <v-tab v-if="editURL !== '/'" :to="editURL">编辑</v-tab>
        <v-tab to="/about">关于</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <transition :name="transitionName">
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
export default {
  name: "App",
  components: { VToast },
  data: () => ({
    blurTab: true,
    transitionName: "fold-left",
  }),
  computed: {
    ...mapState({
      editURL: (state) => state.editURL,
      viewURL: (state) => state.viewURL,
    }),
  },
  methods: {},
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
  // vue监听路由对象$route的方法
  watch: {
    // watch $route 决定使用哪种过渡
    $route(to, from) {
      //to、from是最基本的路由对象，分别表示从(from)某个页面跳转到(to)另一个页面,to.path（表示要跳转到的路由地址），from.path同理。
      const routerPosition = ["/", "/user", "/user/?", "/about"];
      //找到to.path和from.path在routerDeep数组中的下标
      let toPos;
      if (to.path.startsWith("/user/edit")) {
        toPos = 2;
      } else {
        toPos = routerPosition.indexOf(to.path);
      }
      let fromPos;
      if (from.path.startsWith("/user/edit")) {
        fromPos = 2;
      } else {
        fromPos = routerPosition.indexOf(from.path);
      }
      console.log(fromPos, toPos);
      this.transitionName = toPos > fromPos ? "fold-left" : "fold-right";
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

.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.4, 1.1, 0, 1);
}
.fold-left-leave-active {
  position: absolute;
  animation-name: fold-left-out;
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.4, 1.1, 0, 1);
}
@keyframes fold-left-in {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    opacity: 0%;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 100%;
  }
}
@keyframes fold-left-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 100%;
  }
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    opacity: 0%;
  }
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.4, 1.1, 0, 1);
}
.fold-right-leave-active {
  position: absolute;
  animation-name: fold-right-out;
  animation-duration: 0.8s;
  animation-timing-function: cubic-bezier(0.4, 1.1, 0, 1);
}

@keyframes fold-right-in {
  0% {
    width: 100%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    opacity: 0%;
  }
  100% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 100%;
  }
}
@keyframes fold-right-out {
  0% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 100%;
  }
  100% {
    width: 100%;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    opacity: 0%;
  }
}
</style>
