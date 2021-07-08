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

    <div class="customFooter">Designed by Ridd.</div>
  </div>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
import { mapState } from "vuex";
import { ref } from "vue";
import ReviewPhone from "@/components/ReviewPhone";

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
  methods: {},
};
</script>

<style scoped>
.customFooter {
  padding: 25px 0 50px 0;
}
</style>
