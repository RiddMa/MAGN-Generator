<template>
  <div class="home">
    <Settings></Settings>
    <Review v-if="!fitPhone"></Review>
    <ReviewPhone v-if="fitPhone"></ReviewPhone>
    <a-button @click="scrollAndCapture">Draw Canvas</a-button>
    <a-button @click="getPosterFromServer">Server Side Render</a-button>
    <div class="customFooter">Designed by Ridd.</div>
    <img id="poster" />
  </div>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
import { mapState } from "vuex";
import { ref } from "vue";
import ReviewPhone from "@/components/ReviewPhone";
import axios from "axios";

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
      posterURL: (state) => state.netStore.posterURL,
    }),
  },
  mounted() {
    setTimeout(() => {
      if (document.body.clientWidth < 720) {
        this.$store.commit("setFitPhone", true);
      } else {
        this.$store.commit("setFitPhone", false);
      }
      this.$store.commit("setReviewDate");
      this.$store.commit("setMovieRatingAvg");
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
    // async getPosterFromServer() {
    //   let response = await axios.post(
    //     "http://localhost:8081/api/download",
    //     {
    //       tid: "admin",
    //     },
    //     {
    //       responseType: "blob",
    //     }
    //   );
    //   let urlCreator = window.URL || window.webkitURL;
    //   document.querySelector("#poster").src = urlCreator.createObjectURL(
    //     response.data
    //   );
    // },
    async getPosterFromServer() {
      await this.$store.dispatch("getPoster", "admin");
      console.log(this.posterURL);
      document.querySelector("#poster").src = this.posterURL;
    },
  },
};
</script>

<style scoped>
.customFooter {
  padding: 25px 0 50px 0;
}
</style>
