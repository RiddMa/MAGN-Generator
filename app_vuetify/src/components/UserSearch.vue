<template>
  <v-row class="justify-center ma-0 pa-0">
    <v-col class="userBase ma-0 px-6">
      <v-expansion-panels popout hover v-model="showSettings">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row class="justify-center align-baseline ma-auto pa-auto text--secondary">
              <transition-group name="flip-list" v-on:enter="fadeInCaller" v-on:leave="fadeOutCaller">
                <span v-if="listLoading" class="ma-auto pa-auto text--secondary" key="0">加载中……</span>
                <span v-else class="ma-auto pa-auto text--secondary" key="1"> 你好，{{ username }}! </span>
              </transition-group>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container fluid class="searchContainer justify-end">
              <v-row class="grow align-center mb-4 mt-0 primary--text">
                <hr class="yearDivider grow mr-2" />
                <span class="text-h6">排序</span>
                <hr class="yearDivider grow ml-2" />
              </v-row>
              <v-row class="justify-center align-center grow">
                <v-select
                  v-model="sortType"
                  :items="sortTypeList"
                  class="mr-6"
                  label="排序类型"
                  color="primary"
                  outlined
                  dense
                  :menu-props="{ bottom: true, offsetY: true }"
                ></v-select>
                <v-select
                  v-if="sortType === 'rating'"
                  v-model="sortRatingType"
                  :items="sortRatingTypeList"
                  class="mr-6"
                  label="排序键值"
                  color="primary"
                  outlined
                  dense
                  :menu-props="{ bottom: true, offsetY: true }"
                ></v-select>
                <v-radio-group v-model="sortOrder" class="my-auto pa-auto" column>
                  <v-radio label="降序" value="Desc"></v-radio>
                  <v-radio label="升序" value="Asc"></v-radio>
                </v-radio-group>
              </v-row>
              <v-row class="grow align-center mb-6 mt-4 primary--text">
                <hr class="yearDivider grow mr-2" />
                <span class="text-h6">过滤</span>
                <hr class="yearDivider grow ml-2" />
              </v-row>
              <v-row class="justify-center grow" style="height: 80px">
                <v-select
                  v-model="filterType"
                  :items="filterTypeList"
                  label="过滤类型"
                  color="primary"
                  multiple
                  clearable
                  outlined
                  dense
                  :menu-props="{ bottom: true, offsetY: true }"
                ></v-select>
              </v-row>

              <transition-group name="flip-list" v-on:enter="expandInCaller" v-on:leave="expandOutCaller">
                <!--              电影类型-->
                <div v-if="filterType.includes('genre')" class="searchRow" key="genre">
                  <v-row class="grow align-center my-auto pa-auto">
                    <!--                  <hr class="yearDivider grow mr-2" />-->
                    <strong class="primary--text">电影类型</strong>
                    <!--                  <hr class="yearDivider grow ml-2" />-->
                  </v-row>
                  <v-row class="grow align-center my-auto pa-auto">
                    <v-select
                      v-model="genreFilter"
                      :items="genreFilterList"
                      item-text="genreCN"
                      item-value="genre"
                      label="电影类型"
                      color="primary"
                      class="align-center"
                      multiple
                      dense
                      clearable
                      outlined
                      :menu-props="{ bottom: true, offsetY: true }"
                    ></v-select>
                  </v-row>
                </div>
                <!--              我的评分-->
                <div v-if="filterType.includes('rating')" class="searchRow" key="rating">
                  <v-row class="grow align-center my-auto pa-auto">
                    <!--                  <hr class="yearDivider grow mr-2" />-->
                    <strong class="primary--text">我的评分</strong>
                    <!--                  <hr class="yearDivider grow ml-2" />-->
                  </v-row>
                  <v-row class="grow">
                    <span class="text--secondary mr-4">
                      <v-btn icon @click="ratingFilterRangeMin -= 1">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <span class="mt-1">最低: {{ ratingFilterRange[0] }} </span>
                      <v-btn icon @click="ratingFilterRangeMin += 1">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </span>
                    <v-range-slider
                      v-model="ratingFilterRange"
                      thumb-label="always"
                      step="1"
                      hint="评分范围"
                      :min="defaultRatingFilterRange[0]"
                      :max="defaultRatingFilterRange[1]"
                      color="primary"
                      track-color="green lighten-3"
                    ></v-range-slider>
                    <span class="text--secondary ml-4">
                      <v-btn icon @click="ratingFilterRangeMax -= 1">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <span class="mt-1">最高: {{ ratingFilterRange[1] }} </span>
                      <v-btn icon @click="ratingFilterRangeMax += 1">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </span>
                  </v-row>
                </div>
                <!--              上映年份-->
                <div v-if="filterType.includes('year')" class="searchRow" key="year">
                  <v-row class="grow align-center my-auto pa-auto">
                    <!--                  <hr class="yearDivider grow mr-2" />-->
                    <strong class="primary--text">上映年份</strong>
                    <!--                  <hr class="yearDivider grow ml-2" />-->
                  </v-row>
                  <v-row class="grow">
                    <span class="text--secondary mr-4">
                      <v-btn icon @click="onScreenYearMin -= 1" key="yearMin-">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <span class="mt-1">最早: {{ onScreenYearRange[0] }} </span>
                      <v-btn icon @click="onScreenYearMin += 1" key="yearMin+">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </span>
                    <v-range-slider
                      key="yearSlider"
                      v-model="onScreenYearRange"
                      thumb-label="always"
                      step="1"
                      hint="电影上映年份范围"
                      :min="defaultOnScreenYearRange[0]"
                      :max="defaultOnScreenYearRange[1]"
                      color="primary"
                      track-color="green lighten-3"
                    ></v-range-slider>
                    <span class="text--secondary ml-4">
                      <v-btn icon @click="onScreenYearMax -= 1" key="yearMax-">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <span class="mt-1">最晚: {{ onScreenYearRange[1] }} </span>
                      <v-btn icon @click="onScreenYearMax += 1" key="yearMax+">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </span>
                  </v-row>
                </div>
                <!--              观影日期-->
                <div v-if="filterType.includes('date')" class="searchRow" key="date">
                  <v-row class="grow align-center my-auto pa-auto">
                    <!--                  <hr class="yearDivider grow mr-2" />-->
                    <strong class="primary--text">观影日期</strong>
                    <!--                  <hr class="yearDivider grow ml-2" />-->
                  </v-row>
                  <v-row class="grow align-center my-auto pa-auto">
                    <v-menu
                      class="grow"
                      key="date"
                      ref="reviewDatePickerMenu"
                      v-model="reviewDatePickerMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      color="primary"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="reviewDateRangeText"
                          label="观影日期范围"
                          prepend-icon="mdi-calendar"
                          color="primary"
                          outlined
                          dense
                          readonly
                          append-icon="mdi-close"
                          v-on:click:append="reviewDateRange = []"
                          v-bind="attrs"
                          v-on="on"
                          :menu-props="{ bottom: true, offsetY: true }"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="reviewDateRange"
                        color="primary"
                        light
                        scrollable
                        range
                        no-title
                        show-current
                        show-adjacent-months
                        locale="zh-cn"
                        elevation="12"
                      >
                        <v-btn
                          class="outlineBtn primary--text text-button ma-2 mt-0 pa-auto"
                          outlined
                          elevation="2"
                          @click="reviewDatePickerMenu = false"
                        >
                          取消
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          class="primary text-button ma-2 mt-0 pa-auto"
                          elevation="2"
                          @click="$refs.reviewDatePickerMenu.save(reviewDateRange)"
                        >
                          好
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-row>
                </div>
              </transition-group>

              <v-row class="justify-center" style="height: 60px">
                <v-btn
                  class="outlineBtn primary--text text-button ma-2 mt-0 pa-auto"
                  elevation="2"
                  outlined
                  @click="refreshMovie"
                >
                  清空
                </v-btn>
                <v-btn class="primary text-button ma-2 mt-0 pa-auto" elevation="2" @click="onSortFilterClicked">
                  排序 || 过滤
                </v-btn>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import { gsapExpandIn, gsapExpandOut, gsapFadeIn, gsapFadeOut, sleep } from "@/utils/animate";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "UserSearch",
  props: {
    listLoading: {
      required: true,
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      showSettings: 0,
      sortType: "date",
      sortTypeList: [
        { text: "观影日期（默认）", value: "date" },
        { text: "我的评分", value: "rating" },
        { text: "上映年份", value: "year" },
      ],
      sortRatingType: "avg",
      sortRatingTypeList: [
        { text: "最终得分", value: "avg" },
        { text: "剧情", value: "screenplay" },
        { text: "视效/摄影", value: "visual" },
        { text: "演出/剪辑", value: "editing" },
        { text: "音乐/音效", value: "sound" },
      ],
      sortOrder: "Desc",
      filterType: [],
      filterTypeList: [
        { text: "影片类型", value: "genre" },
        { text: "我的评分", value: "rating" },
        { text: "上映年份", value: "year" },
        { text: "观影日期", value: "date" },
      ],
      genreFilter: [],
      genreFilterList: this.$store.getters.genreTags,
      ratingFilterType: "avg",
      ratingFilterList: this.sortRatingTypeList,
      defaultRatingFilterRange: [0, 10],
      ratingFilterRangeMin: 0,
      ratingFilterRangeMax: 10,
      reviewDatePickerMenu: false,
      reviewDateRange: [],
      onScreenYearPickerMenu: false,
      defaultOnScreenYearRange: [1888, parseInt(moment().year().toFixed()) + 1],
      onScreenYearMin: 1888,
      onScreenYearMax: parseInt(moment().year().toFixed()) + 1,
    };
  },
  computed: {
    ratingFilterRange: {
      get() {
        return [this.ratingFilterRangeMin, this.ratingFilterRangeMax];
      },
      set(val) {
        this.ratingFilterRangeMin = val[0];
        this.ratingFilterRangeMax = val[1];
      },
    },
    onScreenYearRange: {
      get() {
        return [this.onScreenYearMin, this.onScreenYearMax];
      },
      set(val) {
        this.onScreenYearMin = val[0];
        this.onScreenYearMax = val[1];
      },
    },
    reviewDateRangeText() {
      return this.reviewDateRange.join(" ~ ");
    },
    ...mapState({
      username: (state) => state.userStore.username,
    }),
  },
  methods: {
    onSortFilterClicked() {
      this.$store.commit("restoreMovieList");
      this.filterMovie();
      this.sortMovie();
    },
    sortMovie() {
      this.$store.commit("sortMovie", {
        sortType: this.sortType,
        sortRatingType: this.sortRatingType,
        sortOrder: this.sortOrder,
      });
    },
    filterMovie() {
      let payload = {};
      if (this.filterType.includes("genre") && this.genreFilter.length !== 0) {
        payload.genre = this.genreFilter;
      }
      if (this.filterType.includes("rating")) {
        payload.rating = {
          type: this.ratingFilterType,
          range: this.ratingFilterRange,
        };
      }
      if (this.filterType.includes("year")) {
        payload.year = this.onScreenYearRange;
      }
      if (this.filterType.includes("date") && this.reviewDateRange.length !== 0) {
        payload.date = this.reviewDateRange;
      }
      this.$store.commit("filterMovie", payload);
    },
    refreshMovie() {
      this.sortType = "none";
      this.sortRatingType = "avg";
      this.sortOrder = "Desc";
      this.filterType = [];
      this.genreFilter = [];
      this.ratingFilterType = "avg";
      this.ratingFilterRangeMin = 0;
      this.ratingFilterRangeMax = 10;
      this.reviewDateRange = [];
      this.onScreenYearMin = 1888;
      this.onScreenYearMax = parseInt(moment().year().toFixed()) + 1;
      this.$store.dispatch("getAllUserReview");
    },
    /*
    animation
     */
    fadeInCaller(el, done) {
      gsapFadeIn(el, done);
    },
    fadeOutCaller(el, done) {
      gsapFadeOut(el, done);
    },
    expandInCaller(el, done) {
      gsapExpandIn(el, done);
    },
    expandOutCaller(el, done) {
      gsapExpandOut(el, done);
    },
    /*
    animation
     */
  },
  async mounted() {
    await sleep(750);
    this.showSettings = undefined;
  },
};
</script>

<style src="../styles/customButton.css" scoped></style>
<style src="../styles/flipAnimation.css"></style>
<style scoped>
.userBase {
  max-width: 1024px;
}
.searchContainer {
  max-width: 800px;
}
.searchRow {
  height: 95px;
}
.yearDivider {
  border: 0;
  border-top: 2px solid var(--v-primary-base);
}
</style>
