<template>
  <div>
    <a-row class="toImage" id="toImage" ref="toImage">
      <a-col flex="auto"></a-col>
      <a-col>
        <a-card class="reviewCard">
          <Title></Title>
          <a-card
            size="small"
            hoverable
            class="reviewContentCard"
            id="ratingCard"
          >
            <!--            剧情-->
            <div>
              <a-row class="ratingHeader">
                <a-col :span="24">
                  <n-divider>剧情</n-divider>
                </a-col>
              </a-row>
              <a-row class="ratingRow">
                <a-col flex="auto"></a-col>
                <a-col :span="14">
                  <a-rate
                    class="ratingsPhone"
                    v-model:value="movie.rating.screenplay"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </a-col>
                <a-col :span="4">
                  <span v-if="movie.rating.screenplay !== 0" class="uglyMargin">
                    {{ movie.rating.screenplay }}/10
                  </span>
                </a-col>
                <a-col flex="auto"></a-col>
              </a-row>
            </div>
            <!--            视效/摄影-->
            <div>
              <a-row class="ratingHeader">
                <a-col :span="24">
                  <n-divider>视效/摄影</n-divider>
                </a-col>
              </a-row>
              <a-row class="ratingRow">
                <a-col flex="auto"></a-col>
                <a-col :span="14">
                  <a-rate
                    class="ratingsPhone"
                    v-model:value="movie.rating.visual"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </a-col>
                <a-col :span="4">
                  <span v-if="movie.rating.visual !== 0" class="uglyMargin">
                    {{ movie.rating.visual }}/10
                  </span>
                </a-col>
                <a-col flex="auto"></a-col>
              </a-row>
            </div>
            <!--            演出/剪辑-->
            <div>
              <a-row class="ratingHeader">
                <a-col :span="24">
                  <n-divider>演出/剪辑</n-divider>
                </a-col>
              </a-row>
              <a-row class="ratingRow">
                <a-col flex="auto"></a-col>
                <a-col :span="14">
                  <a-rate
                    class="ratingsPhone"
                    v-model:value="movie.rating.editing"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </a-col>
                <a-col :span="4">
                  <span v-if="movie.rating.editing !== 0" class="uglyMargin">
                    {{ movie.rating.editing }}/10
                  </span>
                </a-col>
                <a-col flex="auto"></a-col>
              </a-row>
            </div>
            <!--            音乐/音效-->
            <div>
              <a-row class="ratingHeader">
                <a-col :span="24">
                  <n-divider>音乐/音效</n-divider>
                </a-col>
              </a-row>
              <a-row class="ratingRow">
                <a-col flex="auto"></a-col>
                <a-col :span="14">
                  <a-rate
                    class="ratingsPhone"
                    v-model:value="movie.rating.sound"
                    allow-clear
                    @change="handleRateChange"
                    :count="10"
                  />
                </a-col>
                <a-col :span="4">
                  <span v-if="movie.rating.sound !== 0" class="uglyMargin">
                    {{ movie.rating.sound }}/10
                  </span>
                </a-col>
                <a-col flex="auto"></a-col>
              </a-row>
            </div>
            <div>
              <a-row class="ratingHeader">
                <a-col :span="24">
                  <n-divider> 总分 </n-divider>
                </a-col>
                <a-col flex="auto"></a-col>
              </a-row>
              <a-row>
                <a-col flex="auto"></a-col>
                <a-col :span="4">
                  <span v-if="avgScore !== 0" class="uglyMargin">
                    {{ avgScore }}/10
                  </span>
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
          <a-row>
            <a-col flex="auto"></a-col>
            <a-col class="dateRow"> {{ movie.reviewDate }} </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col flex="auto"></a-col>
    </a-row>
  </div>
</template>

<script>
import Title from "@/components/Title";
import { mapState, mapGetters } from "vuex";
import html2canvas from "html2canvas";
import { NInput } from "naive-ui/lib/input";
import "naive-ui/lib/input/styles";
import { NDivider } from "naive-ui/lib/divider";
import "naive-ui/lib/divider/styles";

export default {
  name: "ReviewPhone",
  components: {
    Title,
    NInput,
    NDivider,
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
    }),
  },
  methods: {
    handleRateChange() {
      this.$store.commit("updateRadar");
    },
    scrollAndCapture() {
      this.toTop(window, () => this.capture());
    },
    toTop(element = window, callback) {
      element.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      if (!callback) return;
      if (element === window ? element.scrollY === 0 : element.scrollTop === 0)
        return callback();
      let running = function () {
        let top = this === window ? this.scrollY : this.scrollTop;
        if (top === 0) {
          this.removeEventListener("scroll", running);
          return callback();
        }
      };
      element.addEventListener("scroll", running, false);
    },
    async capture() {
      await this.$store.commit("setCommentInput", false);
      const targetDom = document.getElementById("toImage");
      html2canvas(targetDom, {
        width: targetDom.clientWidth,
        height: targetDom.clientHeight,
        scrollX: 0,
        scrollY: 0,
        allowTaint: true,
        useCORS: true,
      }).then(function (canvas) {
        document.body.appendChild(canvas);
      });
      await this.$store.commit("setCommentInput", true);
    },
  },
  mounted() {
    this.$store.commit("drawRadar", "radarChartPhone");
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
.ratingHeader {
  margin: 0;
  max-height: 30px;
  display: flex;
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
  alignment: center;
  align-content: center;
  align-self: center;
}
/*.ratingTotalHeader {*/
/*  margin: 0;*/
/*  max-height: 30px;*/
/*  display: flex;*/
/*  display: -webkit-flex; !* Safari *!*/
/*  align-items: center; !*指定垂直居中*!*/
/*  alignment: center;*/
/*  align-content: center;*/
/*  align-self: center;*/
/*}*/
.ratingRow {
  margin: 0 2vw;
  display: flex;
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
  alignment: center;
  align-content: center;
  align-self: center;
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
.radarChartPhone {
  padding: 1rem;
  /*display: flex;*/
  /*display: -webkit-flex; !* Safari *!*/
  align-items: center; /*指定垂直居中*/
  max-height: 255px;
}
</style>
