<template>
  <v-container>
    <v-row>
      <v-col class="reviewBase ma-auto">
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
