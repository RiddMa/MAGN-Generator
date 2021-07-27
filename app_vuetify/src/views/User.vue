<template>
  <v-container fluid id="userBase">
    <v-row>
      <v-col class="reviewBase ma-auto">
        <template v-if="reviewList.length === 0">
          <v-row class="justify-center mt-4">
            <v-icon x-large>{{ svgPath }}</v-icon>
          </v-row>
          <v-row class="justify-center mt-4">
            <span class="text-h6 text--secondary">暂无影评</span>
          </v-row>
          <v-row class="justify-center mt-4">
            <span class="text-body-1 text--secondary mt-4">
              从顶部导航栏点击“新建”以创建新的影评。或点击“关于”查看使用帮助。
            </span>
          </v-row>
        </template>
        <template v-for="movie in reviewList">
          <ReviewCard
            class="mb-8"
            :movie.sync="movie"
            v-bind:key="movie.reviewId"
          ></ReviewCard>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ReviewCard from "@/components/ReviewCard";
import { mdiFileHidden } from "@mdi/js";

export default {
  name: "UserProfile",
  components: {
    ReviewCard,
  },
  data() {
    return {
      drawerVisible: false,
      drawerHeight: 256,
      editingMovie: null,
      scrollDistance: 0,
      drawerLoading: false,
      listLoading: false,
      svgPath: mdiFileHidden,
    };
  },
  computed: {
    ...mapState({
      reviewList: (state) => state.userStore.reviewList,
      fitPhone: (state) => state.fitPhone,
    }),
    ...mapGetters({
      getReviewById: "getReviewById",
    }),
  },
  methods: {
    showSnackbar() {
      this.$store.commit("showToast", {
        type: "success",
        message: "123",
        timer: -1,
      });
    },
    ratingCircleFormat(percent) {
      percent /= 10;
      return `${percent}/10`;
    },
    toggleDrawer(reviewId) {
      this.listLoading = true;
      this.drawerHeight = window.innerHeight;
      this.$store.commit("setMovie", this.getReviewById(reviewId));
      this.drawerVisible = true;
    },
    onVisibleChange() {
      if (this.drawerVisible === true) {
        this.listLoading = false;
      }
    },
    stopBodyScroll(isFixed) {
      this.scrollDistance = window.scrollY;
      if (isFixed) {
        document.body.style.position = "fixed";
        document.body.style.top = -this.scrollDistance + "px";
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, this.scrollDistance); // 回到原先的top
      }
    },
    async cancelUpdate() {
      this.drawerVisible = false;
    },
    async commitUpdate() {
      this.drawerLoading = true;
      await this.$store.dispatch("updateUserReview", this.$store.state.movie);
      await this.$store.dispatch("getAllUserReview");
      this.drawerLoading = false;
      this.drawerVisible = false;
    },
    async commitDelete(reviewId) {
      this.drawerLoading = true;
      await this.$store.dispatch("deleteUserReview", reviewId);
      await this.$store.dispatch("getAllUserReview");
      this.drawerLoading = false;
      this.drawerVisible = false;
    },
  },
  async mounted() {
    if ((await this.$store.dispatch("isUserLoggedIn", this)) === true) {
      this.$store.dispatch("getAllUserReview");
    } else {
      this.$store.commit("pushPendingQueue", "getAllUserReview");
    }
  },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
