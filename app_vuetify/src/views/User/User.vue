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
        <transition-group
          name="flip-list"
          v-on:enter="fadeInCaller"
          v-on:leave="fadeOutCaller"
        >
          <p
            v-if="listLoading"
            class="mb-2 text--secondary text-center"
            key="0"
            style="width: 100%; position: relative"
          >
            加载中……
          </p>
          <p
            v-else
            class="mb-2 text--secondary text-center"
            key="1"
            style="width: 100%; position: relative"
          >
            你好，{{ username }}!
          </p>
        </transition-group>

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
  <v-container v-else fluid id="userBase">
    <v-row class="justify-center">
      <v-col class="userBase px-6">
        <v-expansion-panels popout hover v-model="showSettings">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row
                class="
                  justify-center
                  align-baseline
                  ma-auto
                  pa-auto
                  text--secondary
                "
              >
                <transition-group
                  name="flip-list"
                  v-on:enter="fadeInCaller"
                  v-on:leave="fadeOutCaller"
                >
                  <span
                    v-if="listLoading"
                    class="ma-auto pa-auto text--secondary"
                    key="0"
                    >加载中……</span
                  >
                  <span v-else class="ma-auto pa-auto text--secondary" key="1">
                    你好，{{ username }}!
                  </span>
                </transition-group>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="justify-center ma-auto pa-auto">
                <v-radio-group v-model="sortType" row>
                  <v-radio label="无" value="none"></v-radio>
                  <v-radio label="年份" value="year"></v-radio>
                  <v-radio label="评分" value="rating"></v-radio>
                  <v-radio label="观影日期" value="date"></v-radio>
                </v-radio-group>
              </v-row>
              <v-row class="justify-center ma-auto pa-auto">
                <v-radio-group v-model="sortOrder" row>
                  <v-radio label="降序" value="Desc"></v-radio>
                  <v-radio label="升序" value="Asc"></v-radio>
                </v-radio-group>
              </v-row>
              <v-row class="justify-center ma-auto pa-auto">
                <v-radio-group v-model="filterType" row>
                  <v-radio label="无" value="none"></v-radio>
                  <v-radio label="年份" value="year"></v-radio>
                  <v-radio label="评分" value="rating"></v-radio>
                  <v-radio label="观影日期" value="date"></v-radio>
                </v-radio-group>
              </v-row>
              <v-row class="justify-center ma-auto pa-auto">
                <v-radio-group v-model="sortOrder" row>
                  <v-radio label="降序" value="Desc"></v-radio>
                  <v-radio label="升序" value="Asc"></v-radio>
                </v-radio-group>
              </v-row>
              <v-row class="justify-center ma-auto pa-auto">
                <v-date-picker v-model="picker"></v-date-picker>
              </v-row>
              <v-row class="justify-center my-4 pa-auto">
                <v-btn @click="sortMovie">Go</v-btn>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row style="position: relative">
      <v-col class="userBase ma-auto" style="position: relative">
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
import {
  gsapFadeIn,
  gsapFadeOut,
  gsapListItemEnter,
  gsapListItemLeave,
  sleep,
} from "@/utils/animate";
import store from "@/store/store";
import { setCSSBlur } from "@/utils/util";

export default {
  name: "UserProfile",
  components: {
    ReviewCardPhone,
    ReviewCard,
  },
  data() {
    return {
      showSettings: 0,
      drawerVisible: false,
      drawerHeight: 256,
      editingMovie: null,
      scrollDistance: 0,
      drawerLoading: false,
      listLoading: false,
      svgPath: mdiFileHidden,
      testList: [],
      sortType: "none",
      sortOrder: "Desc",
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
    sortMovie() {
      this.$store.commit("sortMovie", "ratingDesc");
    },
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
    await sleep(750);
    this.showSettings = undefined;
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
    this.listLoading = false;
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.75s;
  transition-timing-function: cubic-bezier(0.35, 1.15, 0.1, 1);
}
</style>
<style scoped>
.userBase {
  max-width: 1024px;
}
::v-deep .v-expansion-panels {
  /*margin-right: 40px;*/
  /*max-width: 800px;*/
  /*margin-left: 40px;*/
}
</style>
