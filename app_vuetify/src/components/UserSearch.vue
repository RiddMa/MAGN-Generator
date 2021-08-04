<template>
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
            <v-container fluid class="searchRow justify-end">
              <!--              <v-row class="grow align-center mb-2 mt-4">-->
              <!--                <hr class="yearDivider grow mr-2" />-->
              <!--                <span class="text-h5">排序</span>-->
              <!--                <hr class="yearDivider grow ml-2" />-->
              <!--              </v-row>-->
              <v-row class="justify-center align-center grow">
                <v-select
                  v-model="sortType"
                  :items="sortTypeList"
                  class="mr-8"
                  label="排序类型"
                  outlined
                  dense
                ></v-select>
                <v-radio-group
                  v-model="sortOrder"
                  class="my-auto pa-auto"
                  column
                >
                  <v-radio label="降序" value="Desc"></v-radio>
                  <v-radio label="升序" value="Asc"></v-radio>
                </v-radio-group>
              </v-row>
              <!--              <v-row class="grow align-center mb-2 mt-4">-->
              <!--                <hr class="yearDivider grow mr-2" />-->
              <!--                <span class="text-h5">过滤</span>-->
              <!--                <hr class="yearDivider grow ml-2" />-->
              <!--              </v-row>-->
              <v-row class="justify-center grow">
                <v-select
                  v-model="filterType"
                  :items="filterTypeList"
                  label="过滤类型"
                  multiple
                  outlined
                  dense
                ></v-select>
              </v-row>
              <!--              上映年份-->
              <template v-if="filterType.includes('year')">
                <v-row class="grow align-center mb-2 mt-4">
                  <!--                  <hr class="yearDivider grow mr-2" />-->
                  <strong>上映年份过滤</strong>
                  <!--                  <hr class="yearDivider grow ml-2" />-->
                </v-row>
                <v-row class="grow">
                  <span class="text--secondary mt-1 mr-4"
                    >最早: {{ onScreenYearMin }}</span
                  >
                  <v-slider
                    v-model="onScreenYearMin"
                    thumb-label
                    hint="电影上映年份最小值"
                    :min="defaultYearRange[0]"
                    :max="onScreenYearMax"
                    track-color="green lighten-3"
                    prepend-icon="mdi-minus"
                    @click:prepend="onScreenYearMin -= 1"
                    append-icon="mdi-plus"
                    @click:append="onScreenYearMin += 1"
                  ></v-slider>
                </v-row>
                <v-row class="grow">
                  <span class="text--secondary mt-1 mr-4"
                    >最晚: {{ onScreenYearMax }}</span
                  >
                  <v-slider
                    v-model="onScreenYearMax"
                    thumb-label
                    hint="电影上映年份最大值"
                    :min="onScreenYearMin"
                    :max="defaultYearRange[1]"
                    track-color="green lighten-3"
                    prepend-icon="mdi-minus"
                    @click:prepend="onScreenYearMax -= 1"
                    append-icon="mdi-plus"
                    @click:append="onScreenYearMax += 1"
                  ></v-slider>
                </v-row>
              </template>
              <!--              观影日期-->
              <template v-if="filterType.includes('date')" class="grow">
                <v-row class="grow align-center mb-2 mt-4">
                  <!--                  <hr class="yearDivider grow mr-2" />-->
                  <strong>观影日期过滤</strong>
                  <!--                  <hr class="yearDivider grow ml-2" />-->
                </v-row>
                <v-row class="grow align-center mb-2 mt-4">
                  <v-menu
                    class="grow"
                    key="date"
                    ref="reviewDatePickerMenu"
                    v-model="reviewDatePickerMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="reviewDateRangeText"
                        label="观影日期范围"
                        prepend-icon="mdi-calendar"
                        outlined
                        dense
                        readonly
                        append-icon="mdi-close"
                        v-on:click:append="reviewDateRange = []"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="reviewDateRange"
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
                        class="
                          outlineBtn
                          primary--text
                          text-button
                          ma-2
                          mt-0
                          pa-auto
                        "
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
                        @click="
                          $refs.reviewDatePickerMenu.save(reviewDateRange)
                        "
                      >
                        好
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-row>
              </template>
              <v-row class="justify-center my-4 pa-auto">
                <v-btn
                  class="primary text-button ma-2 mt-0 pa-auto"
                  elevation="2"
                  @click="sortMovie"
                >
                  GO GO GO!!! BAKA ZOMBIE!
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
import { gsapFadeIn, gsapFadeOut, sleep } from "@/utils/animate";
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
      sortType: "none",
      sortTypeList: [
        { text: "无", value: "none" },
        { text: "我的评分", value: "rating" },
        { text: "上映年份", value: "year" },
        { text: "观影日期", value: "date" },
      ],
      sortOrder: "Desc",
      filterType: ["year", "date"],
      filterTypeList: [
        { text: "无", value: "none" },
        { text: "影片类型", value: "genre" },
        { text: "我的评分", value: "rating" },
        { text: "上映年份", value: "year" },
        { text: "观影日期", value: "date" },
      ],
      reviewDatePickerMenu: false,
      reviewDateRange: [],
      onScreenYearPickerMenu: false,
      defaultYearRange: [1888, parseInt(moment().year().toFixed()) + 1],
      // onScreenYearRange: [1888, 2000],
      onScreenYearMin: 1888,
      onScreenYearMax: 2020,
    };
  },
  computed: {
    reviewDateRangeText() {
      return this.reviewDateRange.join(" ~ ");
    },
    ...mapState({
      username: (state) => state.userStore.username,
    }),
  },
  methods: {
    onMinYearMinusClicked() {
      console.log(this.onScreenYearMin);
      this.onScreenYearMin -= 1;
      console.log(this.onScreenYearMin);
    },
    sortMovie() {
      this.$store.commit("sortMovie", "ratingDesc");
    },
    /*
    animation
     */
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
    // this.showSettings = undefined;
  },
};
</script>

<style src="../styles/customButton.css" scoped></style>
<style src="../styles/flipAnimation.css"></style>
<style scoped>
.userBase {
  max-width: 1024px;
}
.searchRow {
  max-width: 800px;
}
.yearDivider {
  border: 0;
  border-top: 2px solid lightgrey;
}
</style>
