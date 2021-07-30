<template>
  <v-container
    v-if="fitPhone"
    fluid
    id="userBase"
    style="position: relative"
    class="ma-0 pa-0"
  >
    <v-row style="position: relative" class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" style="position: relative">
        <p class="mb-2 text--secondary text-center">你好，{{ username }}!</p>
        <transition-group
          name="flip-list"
          v-on:enter="tabItemEnterCaller"
          v-on:leave="tabItemLeaveCaller"
        >
          <ReviewCardPhone
            v-for="(movie, index) in reviewList"
            v-bind:key="movie.reviewId"
            v-bind:data-index="index"
            class="mx-0 my-6 pa-0"
            :movie.sync="movie"
          ></ReviewCardPhone>
          <v-container
            fluid
            v-if="reviewList.length === 0"
            v-bind:key="'EmptyReminder'"
          >
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
          </v-container>
        </transition-group>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else fluid id="userBase" style="position: relative">
    <v-row style="position: relative">
      <v-col class="reviewBase ma-auto" style="position: relative">
        <p class="mb-6 text--secondary text-center">你好，{{ username }}!</p>
        <transition-group
          name="flip-list"
          v-on:enter="tabItemEnterCaller"
          v-on:leave="tabItemLeaveCaller"
        >
          <ReviewCard
            v-for="(movie, index) in reviewList"
            v-bind:key="movie.reviewId"
            v-bind:data-index="index"
            class="ma-auto"
            :movie.sync="movie"
          ></ReviewCard>
          <v-container
            fluid
            v-if="reviewList.length === 0"
            v-bind:key="'EmptyReminder'"
          >
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
          </v-container>
        </transition-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ReviewCard from "@/components/ReviewCard";
import ReviewCardPhone from "@/components/ReviewCardPhone";
import { mdiFileHidden } from "@mdi/js";
import { tabItemEnter, tabItemLeave } from "@/utils/animate";

export default {
  name: "UserProfile",
  components: {
    ReviewCardPhone,
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
      testList: [],
    };
  },
  computed: {
    ...mapState({
      reviewList: (state) => state.userStore.reviewList,
      fitPhone: (state) => state.fitPhone,
      username: (state) => state.userStore.username,
    }),
    ...mapGetters({
      getReviewById: "getReviewById",
    }),
  },
  methods: {
    /*
    animation
     */
    tabItemEnterCaller(el, done) {
      tabItemEnter(el, done, el.dataset.index * 100);
    },
    tabItemLeaveCaller(el, done) {
      tabItemLeave(el, done);
    },
    /*
    animation
     */
  },
  async mounted() {
    await this.$store.dispatch("heartbeat");
    await this.$store.dispatch("getAllUserReview");
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.75s;
  transition-timing-function: cubic-bezier(0.4, 1.1, 0, 1);
}
</style>
<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
