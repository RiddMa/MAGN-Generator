<template>
  <div>
    <a-row class="reviewRow">
      <a-col flex="auto"></a-col>
      <a-col :xxl="12" :xl="16" :lg="18" :md="20" :sm="22" :xs="24">
        <a-card class="reviewCard">
          <a-row align="middle" justify="start" type="flex">
            <a-col>
              <NGradientText
                v-if="showTitleInput === false"
                size="24"
                type="success"
                @click="showTitleInput = true"
                >{{ title + " - " + year }}
              </NGradientText>
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
            <a-col> {{ reviewDate }} </a-col>
          </a-row>
          <a-card hoverable class="reviewContentCard">
            <!--            剧情-->
            <a-row class="ratingRow">
              <a-col>
                <span class="uglyMargin"> 剧情 </span>
              </a-col>
              <a-col flex="auto"></a-col>
              <a-col>
                <a-rate
                  v-model:value="rating.screenplay"
                  allow-clear
                  @change="handleRateChange"
                  :count="10"
                  style="width: 280px; padding-bottom: 1px"
                />
              </a-col>
              <a-col :span="2">
                <span v-if="rating.screenplay !== 0" class="uglyMargin">
                  {{ rating.screenplay }}/10
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
                  v-model:value="rating.visual"
                  allow-clear
                  @change="handleRateChange"
                  :count="10"
                  style="width: 280px; padding-bottom: 1px"
                />
              </a-col>
              <a-col :span="2">
                <span v-if="rating.visual !== 0" class="uglyMargin">
                  {{ rating.visual }}/10
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
                  v-model:value="rating.editing"
                  allow-clear
                  @change="handleRateChange"
                  :count="10"
                  style="width: 280px; padding-bottom: 1px"
                />
              </a-col>
              <a-col :span="2">
                <span v-if="rating.editing !== 0" class="uglyMargin">
                  {{ rating.editing }}/10
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
                  v-model:value="rating.sound"
                  allow-clear
                  @change="handleRateChange"
                  :count="10"
                  style="width: 280px; padding-bottom: 1px"
                />
              </a-col>
              <a-col :span="2">
                <span v-if="rating.sound !== 0" class="uglyMargin">
                  {{ rating.sound }}/10
                </span>
              </a-col>
            </a-row>
            <!--            <a-divider orientation="left"></a-divider>-->
            <a-row class="avgRow" align="middle" justify="center">
              <a-col flex="auto"></a-col>
              <a-col>
                <div class="radarChart" id="radarChart" ref="radarChart"></div>
              </a-col>
              <a-col flex="auto"></a-col>
            </a-row>
            <a-row class="ratingRow">
              <a-col>
                <span class="uglyMargin"> 总分 </span>&nbsp;&nbsp;&nbsp;&nbsp;
              </a-col>
              <a-col flex="auto"></a-col>
              <a-col :span="2">
                <span v-if="avg !== 0" class="uglyMargin"> {{ avg }}/10 </span>
              </a-col>
            </a-row>
          </a-card>
          <NInput
            class="reviewContentCard"
            v-model:value="comment"
            type="textarea"
            placeholder="输入影评…"
            round
            :autosize="{
              minRows: 3,
            }"
            style="text-align: start"
          />
          <!--          <a-card hoverable class="reviewContentCard">-->
          <!--            -->
          <!--          </a-card>-->
        </a-card>
      </a-col>
      <a-col flex="auto"></a-col>
    </a-row>
    <a-button @click="capture">get chart</a-button>
  </div>
</template>

<script>
import { NGradientText, NInput } from "naive-ui";
import { ref } from "vue";
import { mapState } from "vuex";
import { Radar, G2 } from "@antv/g2plot";
import moment from "moment";

const html2canvas = require("html2canvas");

const { downloadImage } = require("@/Util");

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
  computed: {
    reviewDate() {
      moment.locale("zh-cn");
      return moment().format("L");
    },
    ...mapState({
      rating: (state) => state.movie.rating,
      title: (state) => state.movie.title,
      year: (state) => state.movie.year,
      comment: (state) => state.movie.comment,
      avg: (state) => {
        return (
          Object.values(state.movie.rating).reduce(function (sum, cur) {
            return sum + cur;
          }) / Object.keys(state.movie.rating).length
        );
      },
    }),
  },

  methods: {
    handleRateChange() {
      this.updateRadar();
    },
    getPic() {
      downloadImage(this.radarPlot);
    },
    drawRadar() {
      const data = [
        { name: "剧情", rating: this.rating.screenplay },
        { name: "视效\n/摄影", rating: this.rating.visual },
        { name: "演出\n/剪辑", rating: this.rating.editing },
        { name: "音乐\n/音效", rating: this.rating.sound },
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
        // xAxis: {
        //   line: null,
        //   tickLine: null,
        //   grid: {
        //     line: {
        //       style: {
        //         lineDash: null,
        //       },
        //     },
        //   },
        // },
        // yAxis: {
        //   line: null,
        //   tickLine: null,
        //   grid: {
        //     line: {
        //       type: 'line',
        //       style: {
        //         lineDash: null,
        //       },
        //     },
        //   },
        // },
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
        { name: "剧情", rating: this.rating.screenplay },
        { name: "视效/摄影", rating: this.rating.visual },
        { name: "演出/剪辑", rating: this.rating.editing },
        { name: "音乐/音效", rating: this.rating.sound },
      ];
      this.radarPlot.changeData(data);
    },

    capture() {
      const rect = document
        .querySelector("#radarChart")
        .getBoundingClientRect();
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动轴滚动的长度
      console.log(
        document.querySelector("#radarChart").getBoundingClientRect()
      ); //eslint-disable-line
      html2canvas(document.querySelector("#radarChart"), {
        width: rect.width,
        height: rect.height,
        scrollY: -scrollTop, // 页面存在滚动时，需要设置此属性，解决绘图偏移问题
      }).then(function (canvas) {
        console.log(canvas.toDataURL()); // eslint-disable-line
        document.body.appendChild(canvas);
      });
    },
  },
  mounted() {
    this.drawRadar();
  },
};
</script>

<style scoped>
.reviewCard {
  margin: 4vh 4vw;
}
.reviewContentCard {
  margin: 2vh 0;
}
.ratingRow {
  margin: 0 2vw;
  display: flex;
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
}
.avgRow {
  margin: 1vh 2vw 0 2vw;
  /*display: flex;*/
  /*display: -webkit-flex; !* Safari *!*/
  align-items: center; /*指定垂直居中*/
}
.radarChart {
  /*display: flex;*/
  /*display: -webkit-flex; !* Safari *!*/
  align-items: center; /*指定垂直居中*/
  max-width: 50vw;
  max-height: 50vh;
}
</style>
