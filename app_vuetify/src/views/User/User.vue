<template>
  <v-container v-if="fitPhone" fluid id="userBase" style="position: relative" class="ma-0 pa-0">
    <UserSearchPhone :list-loading="listLoading"></UserSearchPhone>
    <v-row style="position: relative" class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" style="position: relative">
        <!--        <transition-group name="flip-list" v-on:enter="fadeInCaller" v-on:leave="fadeOutCaller">-->
        <!--          <p-->
        <!--            v-if="listLoading"-->
        <!--            class="mb-2 text&#45;&#45;secondary text-center"-->
        <!--            key="0"-->
        <!--            style="width: 100%; position: relative"-->
        <!--          >-->
        <!--            加载中……-->
        <!--          </p>-->
        <!--          <p v-else class="mb-2 text&#45;&#45;secondary text-center" key="1" style="width: 100%; position: relative">-->
        <!--            你好，{{ username }}!-->
        <!--          </p>-->
        <!--        </transition-group>-->
        <transition-group name="flip-list" v-on:enter="tabItemEnterCaller" v-on:leave="tabItemLeaveCaller">
          <ReviewCardPhone
            v-for="(movie, index) in reviewList"
            v-bind:key="movie.reviewId"
            v-bind:data-index="index"
            class="mx-0 my-6 pa-0"
            :movie.sync="movie"
          ></ReviewCardPhone>
          <v-container fluid v-if="reviewList.length === 0" v-bind:key="'EmptyReminder'">
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
  <v-container v-else fluid id="userBase">
    <UserSearch :list-loading="listLoading"></UserSearch>
    <v-row style="position: relative">
      <v-col class="userBase ma-auto my-0 py-0" style="position: relative">
        <transition-group name="flip-list" v-on:enter="tabItemEnterCaller" v-on:leave="tabItemLeaveCaller">
          <ReviewCard
            v-for="(movie, index) in reviewList"
            v-bind:key="movie.reviewId"
            v-bind:data-index="index"
            class="ma-auto pa-auto"
            :movie.sync="movie"
          ></ReviewCard>
          <v-container fluid v-if="reviewList.length === 0" v-bind:key="'EmptyReminder'">
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
import { gsapFadeIn, gsapFadeOut, gsapListItemEnter, gsapListItemLeave, sleep } from "@/utils/animate";
import store from "@/store/store";
import { setCSSBlur } from "@/utils/util";
import UserSearch from "@/components/UserSearch";
import UserSearchPhone from "@/components/UserSearchPhone";

export default {
  name: "UserProfile",
  components: {
    UserSearchPhone,
    UserSearch,
    ReviewCardPhone,
    ReviewCard,
  },
  data() {
    return {
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
      // tabItemEnter(el, done, el.dataset.index * 100);
      gsapListItemEnter(el, done, el.dataset.index * 0.2);
    },
    tabItemLeaveCaller(el, done) {
      // tabItemLeave(el, done);
      gsapListItemLeave(el, done);
    },
    fadeInCaller(el, done) {
      // fadeIn(el, done);
      gsapFadeIn(el, done);
    },
    fadeOutCaller(el, done) {
      // fadeOut(el, done);
      gsapFadeOut(el, done);
    },
    /*
    animation
     */
  },
  async mounted() {
    this.listLoading = true;
    if (this.$store.state.reloadWarning) {
      store.commit("showToast", {
        type: "error",
        message: "错误：请勿刷新或直接访问“查看”及“编辑”页面。刷新中……",
        timer: 3000,
      });
      setCSSBlur(".v-overlay__scrim");
      setCSSBlur("#dialogOverlay");
      setTimeout(() => location.reload(), 3000);
    }
    await sleep(750);
    await this.$store.dispatch("heartbeat");
    await this.$store.dispatch("getAllUserReview");
    // await sleep(750);
    // this.$store.commit("sortMovie", {
    //   sortType: "date",
    //   sortOrder: "Desc",
    // });
    this.listLoading = false;
  },
};
</script>

<style src="../../styles/flipAnimation.css"></style>
<style scoped>
.userBase {
  max-width: 1024px;
}
</style>
