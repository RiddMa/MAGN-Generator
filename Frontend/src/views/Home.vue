<template>
  <div class="home">
    <Settings></Settings>
    <Review v-if="!fitPhone"></Review>
    <ReviewPhone v-if="fitPhone"></ReviewPhone>
    <a-space>
      <a-button @click="scrollAndCapture">Draw Canvas</a-button>
      <a-button @click="sendMovieDetail">Send Movie Detail</a-button>
      <a-button @click="getPosterFromServer">Server Side Render</a-button>
      <a-button @click="getMovieAttr">getMovieAttr</a-button>
    </a-space>

    <div class="customFooter">Designed by Ridd.</div>
    <img class="poster" id="poster" alt="Movie Poster" src="" />
  </div>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
import { mapState } from "vuex";
import ReviewPhone from "@/components/ReviewPhone";

const html2canvas = require("html2canvas");

export default {
  name: "Home",
  components: {
    ReviewPhone,
    Review,
    Settings,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
      showCommentInput: (state) => state.showCommentInput,
      posterURL: (state) => state.netStore.posterURL,
    }),
  },
  mounted() {},
  methods: {
    async scrollAndCapture() {
      await this.toTop(window, () => this.capture());
    },
    toTop(element = window, callback) {
      element.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      if (!callback) return;
      if (element === window ? element.scrollY === 0 : element.scrollTop === 0)
        return callback();
      let running = function () {
        let top = this === window ? this.scrollY : this.scrollTop;
        if (top === 0) {
          this.removeEventListener("scroll", running);
          return callback();
        }
      };
      element.addEventListener("scroll", running, false);
    },
    async capture() {
      await this.$store.commit("setCommentInput", false);
      const targetDom = document.getElementById("toImage");
      html2canvas(targetDom, {
        width: targetDom.clientWidth,
        height: targetDom.clientHeight,
        scrollX: 0,
        scrollY: 0,
        allowTaint: true,
        useCORS: true,
      }).then(function (canvas) {
        document.body.appendChild(canvas);
      });
      await this.$store.commit("setCommentInput", true);
    },
    async getPosterFromServer() {
      await this.$store.dispatch("sendMovieAttr", "admin");
      await this.$store.dispatch("getPoster", "admin");
      document.querySelector("#poster").src = this.posterURL;
    },
    async sendMovieDetail() {
      await this.$store.dispatch("sendMovieAttr");
    },
    async getMovieAttr() {
      await this.$store.dispatch("getMovieAttr", "admin");
    },
  },
};
</script>

<style scoped>
.customFooter {
  padding: 25px 0 50px 0;
}
.poster {
  width: 100%;
}
</style>
