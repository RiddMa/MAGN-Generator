<template>
  <div id="nav">
    <!--    <a-back-top visibilityHeight="20" />-->
    <router-link to="/">Home</router-link>
    |
    <router-link to="/user">User</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
  <router-view></router-view>
</template>
<script>
import { NDivider } from "naive-ui/lib/divider";
import "naive-ui/lib/divider/styles";
export default {
  components: {},
  data() {
    return {
      transitionName: "",
    };
  },
  mounted() {
    try {
      this.$store.dispatch("initStore");
      if (document.body.clientWidth < 720) {
        this.$store.commit("setFitPhone", true);
      } else {
        this.$store.commit("setFitPhone", false);
      }
      this.$store.commit("setReviewDate");
      this.$store.commit("setMovieRatingAvg");
    } catch (err) {
      console.log(err);
    }
  },
  watch: {
    $route(to, from) {
      if (from.path === "/") {
        this.transitionName = "slide-right";
      }
      if (to.path === "/about") {
        this.transitionName = "slide-left";
      }
    },
  },
};
</script>

<style>
html,
body {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}

#app {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #00c198;
}

.ant-back-top {
  bottom: 100px;
}
.navBarDivider {
  background-color: #404040;
}
</style>
