<template>
  <div>
    <a-row class="toImage" id="toImage" ref="toImage">
      <a-col flex="auto"></a-col>
      <a-col :xxl="14" :xl="18" :lg="20" :md="22" :sm="24" :xs="24">
        <a-card class="reviewCard">
          <a-row align="middle" justify="start" type="flex">
            <a-col>
              <a-typography-title
                class="awesomeTitle"
                id="awesomeTitle"
                ref="awesomeTitle"
                v-if="showTitleInput === false"
                @click="showTitleInput = true"
                type="success"
                >{{ title + " - " + year }}
              </a-typography-title>
              <!--              <NGradientText-->
              <!--                class="awesomeTitle"-->
              <!--                id="awesomeTitle"-->
              <!--                ref="awesomeTitle"-->
              <!--                v-if="showTitleInput === false"-->
              <!--                size="24"-->
              <!--                type="success"-->
              <!--                @click="showTitleInput = true"-->
              <!--                >{{ title + " - " + year }}-->
              <!--              </NGradientText>-->
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
                    v-model:value="rating.screenplay"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
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
                    class="ratings"
                    v-model:value="rating.visual"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
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
                    class="ratings"
                    v-model:value="rating.editing"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
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
                    class="ratings"
                    v-model:value="rating.sound"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
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
                  <span v-if="avg !== 0" class="uglyMargin">
                    {{ avg }}/10
                  </span>
                </a-col>
              </a-row>
            </div>
            <div v-if="fitPhone">
              <!--            剧情-->
              <div>
                <a-row class="ratingRow">
                  <a-col :span="24">
                    <a-divider>剧情</a-divider>
                  </a-col>
                </a-row>
                <a-row class="ratingRow">
                  <a-col flex="auto"></a-col>
                  <a-col :span="14">
                    <a-rate
                      class="ratingsPhone"
                      v-model:value="rating.screenplay"
                      allow-clear
                      @change="handleRateChange"
                      :count="10"
                    />
                  </a-col>
                  <a-col :span="4">
                    <span v-if="rating.screenplay !== 0" class="uglyMargin">
                      {{ rating.screenplay }}/10
                    </span>
                  </a-col>
                  <a-col flex="auto"></a-col>
                </a-row>
              </div>
              <!--            视效/摄影-->
              <div>
                <a-row class="ratingRow">
                  <a-col :span="24">
                    <a-divider>视效/摄影</a-divider>
                  </a-col>
                </a-row>
                <a-row class="ratingRow">
                  <a-col flex="auto"></a-col>
                  <a-col :span="14">
                    <a-rate
                      class="ratingsPhone"
                      v-model:value="rating.visual"
                      allow-clear
                      @change="handleRateChange"
                      :count="10"
                    />
                  </a-col>
                  <a-col :span="4">
                    <span v-if="rating.visual !== 0" class="uglyMargin">
                      {{ rating.visual }}/10
                    </span>
                  </a-col>
                  <a-col flex="auto"></a-col>
                </a-row>
              </div>
              <!--            演出/剪辑-->
              <div>
                <a-row class="ratingRow">
                  <a-col :span="24">
                    <a-divider>演出/剪辑</a-divider>
                  </a-col>
                </a-row>
                <a-row class="ratingRow">
                  <a-col flex="auto"></a-col>
                  <a-col :span="14">
                    <a-rate
                      class="ratingsPhone"
                      v-model:value="rating.editing"
                      allow-clear
                      @change="handleRateChange"
                      :count="10"
                    />
                  </a-col>
                  <a-col :span="4">
                    <span v-if="rating.editing !== 0" class="uglyMargin">
                      {{ rating.editing }}/10
                    </span>
                  </a-col>
                  <a-col flex="auto"></a-col>
                </a-row>
              </div>
              <!--            音乐/音效-->
              <div>
                <a-row class="ratingRow">
                  <a-col :span="24">
                    <a-divider>音乐/音效</a-divider>
                  </a-col>
                </a-row>
                <a-row class="ratingRow">
                  <a-col flex="auto"></a-col>
                  <a-col :span="14">
                    <a-rate
                      class="ratingsPhone"
                      v-model:value="rating.sound"
                      allow-clear
                      @change="handleRateChange"
                      :count="10"
                    />
                  </a-col>
                  <a-col :span="4">
                    <span v-if="rating.sound !== 0" class="uglyMargin">
                      {{ rating.sound }}/10
                    </span>
                  </a-col>
                  <a-col flex="auto"></a-col>
                </a-row>
              </div>
              <div>
                <a-row class="ratingRow">
                  <a-col :span="24">
                    <a-divider> 总分 </a-divider>
                  </a-col>
                  <a-col flex="auto"></a-col>
                </a-row>
                <a-row class="avgRow" align="middle" justify="center">
                  <a-col flex="auto"></a-col>
                  <a-col>
                    <div
                      class="radarChartPhone"
                      id="radarChartPhone"
                      ref="radarChartPhone"
                    ></div>
                  </a-col>
                  <a-col flex="auto"></a-col>
                </a-row>
                <a-row>
                  <a-col flex="auto"></a-col>
                  <a-col :span="4">
                    <span v-if="avg !== 0" class="uglyMargin">
                      {{ avg }}/10
                    </span>
                  </a-col>
                  <a-col flex="auto"></a-col>
                </a-row>
              </div>
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
              {{ comment }}
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
import { Radar, G2 } from "@antv/g2plot";
import moment from "moment";
import domtoimage from "dom-to-image";

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
      fitPhone: false,
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
    reviewDate() {
      moment.locale("zh-cn");
      return moment().format("L");
    },
    ...mapState({
      showCommentInput: (state) => state.showCommentInput,
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
      if (this.avg === 0) {
        this.radarPlot.destroy();
        this.drawRadar("radarChartPhone");
      }
      this.updateRadar();
    },
    async updateComment() {
      await this.$store.commit("setMovieComment", this.tmpComment);
    },
    getPic() {
      downloadImage(this.radarPlot);
    },
    drawRadar(divClass) {
      const data = [
        { name: "剧情", rating: this.rating.screenplay },
        { name: "视效\n/摄影", rating: this.rating.visual },
        { name: "演出\n/剪辑", rating: this.rating.editing },
        { name: "音乐\n/音效", rating: this.rating.sound },
      ];
      this.radarPlot = new Radar(divClass, {
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
    async capture() {
      await this.updateComment();
      await this.$store.commit("setCommentInput", false);
      const rect = document.querySelector("#toImage").getBoundingClientRect();
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动轴滚动的长度
      console.log(document.querySelector("#toImage").getBoundingClientRect()); //eslint-disable-line
      html2canvas(document.querySelector("#toImage"), {
        width: rect.width,
        height: rect.height,
        scrollY: -scrollTop, // 页面存在滚动时，需要设置此属性，解决绘图偏移问题
      }).then(function (canvas) {
        document.body.appendChild(canvas);
      });
      await this.$store.commit("setCommentInput", true);
    },
    convertSVG(domName) {
      var node = document.getElementById(domName);
      domtoimage
        .toPng(node)
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          document.body.appendChild(img);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    },
  },
  mounted() {
    this.tmpComment = this.comment;
    if (document.getElementById("ratingCard").offsetWidth < 440) {
      this.fitPhone = true;
      this.$forceUpdate();
    } else {
      this.fitPhone = false;
      this.$forceUpdate();
    }
  },
  updated() {
    if (this.fitPhone) {
      this.drawRadar("radarChartPhone");
    } else {
      this.drawRadar("radarChart");
    }
  },
};
</script>

<style scoped>
.awesomeTitle {
  text-align: start;
  vertical-align: center;
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
