<template>
  <div>
    <a-row class="toImage" id="toImage" ref="toImage">
      <a-col flex="auto"></a-col>
      <a-col :xxl="14" :xl="18" :lg="20" :md="22" :sm="24" :xs="24">
        <a-card class="reviewCard">
          <!--          标题-->
          <a-row align="middle" justify="start" type="flex">
            <a-col>
              <a-typography-title
                class="awesomeTitle"
                id="awesomeTitle"
                ref="awesomeTitle"
                v-if="showTitleInput === false"
                @click="showTitleInput = true"
                >{{ movie.title + " - " + movie.year }}
              </a-typography-title>
              <a-input-search
                v-if="searchText === '' || showTitleInput === true"
                v-model:value="searchText"
                placeholder="输入电影名称…"
                enter-button="确认"
                size="large"
                allowclear
                @search="showTitleInput = false"
              />
            </a-col>
            <a-col flex="auto"></a-col>
            <a-col> {{ movie.reviewDate }} </a-col>
          </a-row>
          <a-card
            size="small"
            hoverable
            class="reviewContentCard"
            id="ratingCard"
          >
            <div v-if="!fitPhone">
              <!--            剧情-->
              <a-row class="ratingRow">
                <a-col>
                  <span class="uglyMargin"> 剧情 </span>
                </a-col>
                <a-col flex="auto"></a-col>
                <a-col>
                  <a-rate
                    class="ratings"
                    v-model:value="movie.rating.screenplay"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </a-col>
                <a-col :span="2">
                  <span v-if="movie.rating.screenplay !== 0" class="uglyMargin">
                    {{ movie.rating.screenplay }}/10
                  </span>
                </a-col>
              </a-row>
              <!--            视效/摄影-->
              <a-row class="ratingRow">
                <a-col>
                  <span class="uglyMargin"> 视效/摄影 </span>
                </a-col>
                <a-col flex="auto"></a-col>
                <a-col>
                  <a-rate
                    class="ratings"
                    v-model:value="movie.rating.visual"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </a-col>
                <a-col :span="2">
                  <span v-if="movie.rating.visual !== 0" class="uglyMargin">
                    {{ movie.rating.visual }}/10
                  </span>
                </a-col>
              </a-row>
              <!--            演出/剪辑-->
              <a-row class="ratingRow">
                <a-col>
                  <span class="uglyMargin"> 演出/剪辑 </span>
                </a-col>
                <a-col flex="auto"></a-col>
                <a-col>
                  <a-rate
                    class="ratings"
                    v-model:value="movie.rating.editing"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </a-col>
                <a-col :span="2">
                  <span v-if="movie.rating.editing !== 0" class="uglyMargin">
                    {{ movie.rating.editing }}/10
                  </span>
                </a-col>
              </a-row>
              <!--            音乐/音效-->
              <a-row class="ratingRow">
                <a-col>
                  <span class="uglyMargin"> 音乐/音效 </span>
                </a-col>
                <a-col flex="auto"></a-col>
                <a-col>
                  <a-rate
                    class="ratings"
                    v-model:value="movie.rating.sound"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </a-col>
                <a-col :span="2">
                  <span v-if="movie.rating.sound !== 0" class="uglyMargin">
                    {{ movie.rating.sound }}/10
                  </span>
                </a-col>
              </a-row>
              <!--            <a-divider orientation="left"></a-divider>-->
              <a-row class="avgRow" align="middle" justify="center">
                <a-col flex="auto"></a-col>
                <a-col>
                  <div
                    class="radarChart"
                    id="radarChart"
                    ref="radarChart"
                  ></div>
                </a-col>
                <a-col flex="auto"></a-col>
              </a-row>
              <a-row class="ratingRow">
                <a-col>
                  <span class="uglyMargin"> 总分 </span>&nbsp;&nbsp;&nbsp;&nbsp;
                </a-col>
                <a-col flex="auto"></a-col>
                <a-col :span="2">
                  <span v-if="movie.rating.avg !== 0" class="uglyMargin">
                    {{ movie.rating.avg }}/10
                  </span>
                </a-col>
              </a-row>
            </div>
          </a-card>
          <NInput
            class="reviewContentCard"
            v-if="showCommentInput"
            v-model:value="tmpComment"
            type="textarea"
            placeholder="输入影评…"
            :autosize="{
              minRows: 3,
            }"
            style="text-align: start"
          />
          <!--            v-if="showCommentInput === false"-->
          <a-card v-if="!showCommentInput" hoverable class="reviewContentCard">
            <a-typography-paragraph style="white-space: pre-wrap">
              {{ movie.comment }}
            </a-typography-paragraph>
          </a-card>
        </a-card>
      </a-col>
      <a-col flex="auto"></a-col>
    </a-row>
    <a-button @click="capture('radarChart')">get chart</a-button>
    <a-button @click="capture('toImage')">get image</a-button>
  </div>
</template>

<script>
import { NGradientText, NInput } from "naive-ui";
import { ref } from "vue";
import { mapState } from "vuex";
import { Radar } from "@antv/g2plot";
import moment from "moment";
import html2canvas from "html2canvas";

export default {
  name: "Review",
  components: {
    NGradientText,
    NInput,
  },
  data() {
    return {
      showTitleInput: false,
      radarPlot: undefined,
      searchText: "The Shawshank Redemption",
      review: {
        screenplay: "",
        visual: "",
        sound: "",
        editing: "",
      },
    };
  },
  setup() {
    const tmpComment = ref("");
    return { tmpComment }; // notice here count is returned so the template can access it.
  },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
      showCommentInput: (state) => state.showCommentInput,
      movie: (state) => state.movie,
    }),
  },

  methods: {
    handleRateChange() {
      this.$store.commit("setMovieRatingAvg");
      this.updateRadar();
    },
    async updateComment() {
      await this.$store.commit("setMovieComment", this.tmpComment);
    },
    drawRadar() {
      const data = [
        { name: "剧情", rating: this.movie.rating.screenplay },
        { name: "演出\n/剪辑", rating: this.movie.rating.editing },
        { name: "视效\n/摄影", rating: this.movie.rating.visual },
        { name: "音乐\n/音效", rating: this.movie.rating.sound },
      ];
      this.radarPlot = new Radar("radarChart", {
        data: data,
        xField: "name",
        yField: "rating",
        padding: "auto",
        meta: {
          rating: {
            alias: "评分",
            min: 0,
            nice: true,
          },
        },
        autoFit: true,
        tooltip: {
          showCrosshairs: false,
        },
        color: "#42C090",
        point: {
          size: 2,
        },
        area: {
          style: {
            fill: "#61DDAA",
          },
        },
      });
      this.radarPlot.render();
    },
    updateRadar() {
      const data = [
        { name: "剧情", rating: this.movie.rating.screenplay },
        { name: "演出\n/剪辑", rating: this.movie.rating.editing },
        { name: "视效\n/摄影", rating: this.movie.rating.visual },
        { name: "音乐\n/音效", rating: this.movie.rating.sound },
      ];
      this.radarPlot.changeData(data);
    },
    async capture() {
      await this.updateComment();
      await this.$store.commit("setCommentInput", false);
      const rect = document.querySelector("#toImage").getBoundingClientRect();
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动轴滚动的长度
      document.querySelector("#toImage").getBoundingClientRect(); //eslint-disable-line
      html2canvas(document.querySelector("#toImage"), {
        width: rect.width,
        height: rect.height,
        scrollY: -scrollTop, // 页面存在滚动时，需要设置此属性，解决绘图偏移问题
      }).then(function (canvas) {
        document.body.appendChild(canvas);
      });
      await this.$store.commit("setCommentInput", true);
    },
  },
  mounted() {
    this.tmpComment = this.movie.comment;
    this.drawRadar();
  },
};
</script>

<style scoped>
.awesomeTitle {
  text-align: start;
  vertical-align: center;
  color: #40ba83;
}
.reviewCard {
  margin: 2vh 4vw;
}
.reviewContentCard {
  text-align: start;
  margin: 0 0 2vh 0;
  padding: 0;
}
.ratingRow {
  margin: 0 2vw;
  display: flex;
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
  alignment: center;
  align-content: center;
  align-self: center;
}
.ratings {
  padding-bottom: 1px;
}
.ratingsPhone {
  padding-bottom: 1px;
  width: 150px;
}
.uglyMargin {
  float: right;
}
.avgRow {
  margin: 1vh 2vw 0 2vw;
  /*display: flex;*/
  /*display: -webkit-flex; !* Safari *!*/
  align-items: center; /*指定垂直居中*/
}
.radarChart {
  display: flex;
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
  max-width: 50vw;
  max-height: 33vh;
}
.radarChartPhone {
  display: flex;
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
  max-height: 265px;
}
</style>
