<template>
  <div class="home">
    <!--    <div v-if="fitPhone">-->
    <!--      <router-view></router-view>-->
    <!--    </div>-->
    <!--    <div v-else>-->
    <!--      <router-view></router-view>-->
    <!--    </div>-->
    <router-view></router-view>
    <Settings></Settings>

    <Review v-if="!fitPhone"></Review>
    <ReviewPhone v-if="fitPhone"></ReviewPhone>
    <a-button @click="scrollAndCapture">Draw Canvas</a-button>
    <div class="customFooter">Designed by Ridd.</div>
  </div>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
import { mapState } from "vuex";
import { ref } from "vue";
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
  setup() {
    let imgURL = ref("");

    return {
      imgURL,
    };
  },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
      showCommentInput: (state) => state.showCommentInput,
    }),
  },
  mounted() {
    console.log(document.body.clientWidth);
    setTimeout(() => {
      if (document.body.clientWidth < 720) {
        this.$store.commit("setFitPhone", true);
      } else {
        this.$store.commit("setFitPhone", false);
      }
      this.$store.commit("setReviewDate");
      this.$store.commit("setMovieRatingAvg");
      console.log(document.body.clientWidth);
    }, 0);
  },
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
  },
};
</script>

<style scoped>
.customFooter {
  padding: 25px 0 50px 0;
}
</style>
