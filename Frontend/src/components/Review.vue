<template>
  <div class="toImage" id="toImage" ref="toImage">
    <Row>
      <Col flex="auto"></Col>
      <Col
        :xxl="14"
        :xl="16"
        :lg="18"
        :md="20"
        :sm="22"
        :xs="24"
        id="toImageCol"
      >
        <a-card class="reviewCard">
          <!--          标题-->
          <Title></Title>
          <a-card
            size="small"
            hoverable
            class="reviewContentCard"
            id="ratingCard"
          >
            <div v-if="!fitPhone">
              <!--            剧情-->
              <Row class="ratingRow">
                <Col flex="auto">
                  <n-divider>
                    <span class="dividerCenter">剧情</span>
                  </n-divider>
                </Col>
                <Col>
                  <a-rate
                    class="ratings"
                    v-model:value="movie.rating.screenplay"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </Col>
                <Col :span="2">
                  <span v-if="movie.rating.screenplay !== 0" class="uglyMargin">
                    {{ movie.rating.screenplay }}/10
                  </span>
                </Col>
                <Col flex="auto">
                  <n-divider></n-divider>
                </Col>
              </Row>
              <!--              视效/摄影-->
              <Row class="ratingRow">
                <Col flex="auto">
                  <n-divider>
                    <span class="dividerCenter">视效/摄影</span>
                  </n-divider>
                </Col>
                <Col>
                  <a-rate
                    class="ratings"
                    v-model:value="movie.rating.visual"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </Col>
                <Col :span="2">
                  <span v-if="movie.rating.visual !== 0" class="uglyMargin">
                    {{ movie.rating.visual }}/10
                  </span>
                </Col>
                <Col flex="auto">
                  <n-divider></n-divider>
                </Col>
              </Row>
              <!--            演出/剪辑-->
              <Row class="ratingRow">
                <Col flex="auto">
                  <n-divider>
                    <span class="dividerCenter">演出/剪辑</span>
                  </n-divider>
                </Col>
                <Col>
                  <a-rate
                    class="ratings"
                    v-model:value="movie.rating.editing"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </Col>
                <Col :span="2">
                  <span v-if="movie.rating.editing !== 0" class="uglyMargin">
                    {{ movie.rating.editing }}/10
                  </span>
                </Col>
                <Col flex="auto">
                  <n-divider></n-divider>
                </Col>
              </Row>
              <!--            音乐/音效-->
              <Row class="ratingRow">
                <Col flex="auto">
                  <n-divider>
                    <span class="dividerCenter">音乐/音效</span>
                  </n-divider>
                </Col>
                <Col>
                  <a-rate
                    class="ratings"
                    v-model:value="movie.rating.sound"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </Col>
                <Col :span="2">
                  <span v-if="movie.rating.sound !== 0" class="uglyMargin">
                    {{ movie.rating.sound }}/10
                  </span>
                </Col>
                <Col flex="auto">
                  <n-divider></n-divider>
                </Col>
              </Row>
              <!--              统计-->
              <div class="dividerRow">
                <n-divider>
                  总分
                  <span v-if="avgScore !== 0" class="uglyMargin">
                    &nbsp;-&nbsp;{{ avgScore }}/10
                  </span>
                </n-divider>
              </div>
              <Row class="avgRow" align="middle" justify="center">
                <Col flex="auto"></Col>
                <Col>
                  <div
                    class="radarChart"
                    id="radarChart"
                    ref="radarChart"
                  ></div>
                </Col>
                <Col flex="auto"></Col>
              </Row>
            </div>
          </a-card>
          <n-input
            class="reviewInputCard"
            v-if="showCommentInput"
            v-model:value="comment"
            type="textarea"
            placeholder="输入影评…"
            :autosize="{
              minRows: 3,
            }"
          />
          <a-card v-if="!showCommentInput" hoverable class="reviewCommentCard">
            <a-typography-paragraph style="white-space: pre-wrap">
              {{ movie.comment }}
            </a-typography-paragraph>
          </a-card>
          <Row>
            <Col flex="auto"></Col>
            <Col class="dateRow"> {{ reviewDate }}</Col>
          </Row>
        </a-card>
      </Col>
      <Col flex="auto"></Col>
    </Row>
  </div>
</template>

<script>
import Title from "@/components/Title";
import { mapState, mapGetters } from "vuex";
import { Row, Col } from "ant-design-vue";
import { NInput } from "naive-ui/lib/input";
import "naive-ui/lib/input/styles";
import { NDivider } from "naive-ui/lib/divider";
import "naive-ui/lib/divider/styles";

const html2canvas = require("html2canvas");

export default {
  name: "Review",
  components: {
    Title,
    NInput,
    NDivider,
    Row,
    Col,
  },
  data() {
    return {
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
    comment: {
      get: function () {
        return this.$store.state.movie.comment;
      },
      set: function (newComment) {
        this.$store.commit("setMovieComment", newComment);
      },
    },
    movie: {
      get: function () {
        return this.$store.state.movie;
      },
      set: function (newMovieProp) {
        this.$store.commit("setMovie", newMovieProp);
      },
    },
    ...mapState({
      fitPhone: (state) => state.fitPhone,
      showCommentInput: (state) => state.showCommentInput,
      radarPlot: (state) => state.radarPlot,
    }),
    ...mapGetters({
      avgScore: "avgScore",
      reviewDate: "reviewDate",
    }),
  },

  methods: {
    handleRateChange() {
      this.$store.commit("setMovieRatingAvg");
      this.$store.commit("updateRadar");
    },
    // async scrollAndCapture() {
    //   await this.toTop(window, () => this.capture());
    // },
    // toTop(element = window, callback) {
    //   element.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    //   if (!callback) return;
    //   if (element === window ? element.scrollY === 0 : element.scrollTop === 0)
    //     return callback();
    //   let running = function () {
    //     let top = this === window ? this.scrollY : this.scrollTop;
    //     if (top === 0) {
    //       this.removeEventListener("scroll", running);
    //       return callback();
    //     }
    //   };
    //   element.addEventListener("scroll", running, false);
    // },
    // async capture() {
    //   await this.$store.commit("setCommentInput", false);
    //   const targetDom = document.getElementById("toImage");
    //   html2canvas(targetDom, {
    //     width: targetDom.clientWidth,
    //     height: targetDom.clientHeight,
    //     scrollX: 0,
    //     scrollY: 0,
    //     allowTaint: true,
    //     useCORS: true,
    //   }).then(function (canvas) {
    //     document.body.appendChild(canvas);
    //   });
    //   await this.$store.commit("setCommentInput", true);
    // },
  },
  mounted() {
    if (this.$route.fullPath === "/") {
      this.$store.commit("drawRadar", "radarChart");
    } else {
      this.$store.commit("drawRadarNoAnimation", "radarChart");
    }
  },
};
</script>

<style scoped>
.reviewCard,
.reviewContentCard,
.reviewCommentCard {
  border-color: rgba(66, 185, 131, 0.5);
}

.reviewCard {
  margin: 2em 4vw;
}

.reviewContentCard {
  text-align: start;
  margin: 1em 0 2em 0;
  padding: 0;
}

.reviewInputCard {
  text-align: start;
}

.reviewCommentCard {
  text-align: start;
  margin: 2em 0 1em 0;
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
  margin: 0 1vw;
}

.uglyMargin {
  float: right;
  margin-right: 1vw;
}

.avgRow {
  margin: 0 2vw;
  display: flex;
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
}

.radarChart {
  margin-bottom: 1em;
  /*display: flex;*/
  /*display: -webkit-flex; !* Safari *!*/
  align-items: center; /*指定垂直居中*/
  max-height: 300px;
}

.dividerRow {
  margin-left: 2vw;
  margin-right: 2vw;
}

.dividerCenter {
  width: 75px;
  text-align: center;
}

.n-divider:not(.n-divider--vertical) {
  margin-top: 1vw; /*这里没错！是vw*/
  margin-bottom: 1vw;
}

.dateRow {
  margin: 1em 0 0 0;
}
</style>
