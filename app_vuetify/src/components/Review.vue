<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="reviewCard ma-4 pa-4 transition-swing"
        outlined
        :elevation="hover ? 12 : 6"
      >
        <v-card-title class="text-h3 pa-auto mx-2 mb-auto mt-2">
          <div class="reviewTitle">
            {{ movie.title }}
          </div>
        </v-card-title>
        <v-card-subtitle class="text-h4 pa-auto mx-2 my-auto">
          <span v-if="movie.year !== 0" class="reviewSubTitle">
            {{ movie.titleCN }}.{{ movie.year }}
          </span>
          <span v-else class="reviewSubTitle">
            {{ movie.titleCN }}
          </span>
          <v-container fluid class="px-0">
            <v-chip
              v-for="genre in genreCheckedCN"
              :key="genre"
              class="mr-2 ml-0 pa-auto"
              :ripple="false"
              color="#40ba83"
              text-color="secondary"
              outlined
              light
              label
            >
              {{ genre }}
            </v-chip>
          </v-container>
        </v-card-subtitle>
        <v-card-text>
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="reviewCard mt-2 mb-8 mx-2 px-4 pt-4 transition-swing"
                outlined
                :elevation="hover ? 6 : 0"
              >
                <v-card-text class="text-center text--primary">
                  <RatingRow
                    class="ratingRow"
                    :desc="'剧情'"
                    :readonly="readOnly"
                    :rating.sync="movie.rating.screenplay"
                  />
                  <RatingRow
                    class="ratingRow"
                    :desc="'视效/摄影'"
                    :readonly="readOnly"
                    :rating.sync="movie.rating.visual"
                  />
                  <RatingRow
                    class="ratingRow"
                    :desc="'演出/剪辑'"
                    :readonly="readOnly"
                    :rating.sync="movie.rating.editing"
                  />
                  <RatingRow
                    class="ratingRow"
                    :desc="'配乐/音效'"
                    :readonly="readOnly"
                    :rating.sync="movie.rating.sound"
                  />
                  <RatingRow
                    class="ratingRow"
                    :readonly="true"
                    :allow-half="true"
                    :desc="'最终得分'"
                    :rating.sync="movie.rating.avg"
                  />
                  <v-row class="ratingRow">
                    <div :id="chartId" />
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>

          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="reviewCard my-8 mx-2 px-4 transition-swing"
                outlined
                :elevation="hover ? 6 : 0"
              >
                <v-card-text class="text-center text--primary">
                  <v-textarea
                    v-model="comment"
                    auto-grow
                    no-resize
                    :readonly="readOnly"
                    placeholder="请输入影评……"
                    counter
                  ></v-textarea>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
          <v-container fluid class="mx-auto my-auto px-0">
            <v-row class="mx-2 px-0">
              <span class="text-left">{{ username }}</span>
              <v-spacer></v-spacer>
              <span class="text-right">{{ reviewDate }}</span>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import RatingRow from "@/components/RatingRow";

export default {
  name: "Review",
  components: { RatingRow },
  props: {
    mode: {
      required: true,
      type: String,
      default() {
        return "new";
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    readOnly: {
      get() {
        return this.mode === "view";
      },
    },
    chartId: {
      get() {
        switch (this.mode) {
          case "new":
            return "newRadar";
          case "edit":
            return "editRadar";
          case "view":
            return "viewRadar";
          default:
            return "newRadar";
        }
      },
    },
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
      username: (state) => state.userStore.username,
      fitPhone: (state) => state.fitPhone,
      showCommentInput: (state) => state.showCommentInput,
      radarPlot: (state) => state.radarPlot,
    }),
    ...mapGetters({
      avgScore: "avgScore",
      reviewDate: "reviewDate",
      genreCheckedCN: "checkedGenreCN",
    }),
  },
  methods: {},
  async mounted() {
    // this.$store.dispatch("heartbeat");
    this.$store.commit("setReviewDate");
    this.$store.commit("setMovieRatingAvg");
    if (!this.$route.fullPath.startsWith("/render")) {
      if (this.$store.state.radarPlot !== undefined) {
        this.$store.state.radarPlot.destroy();
        this.$store.state.radarPlot = undefined;
      }
      await this.$store.dispatch("drawRadar", this.chartId);
    } else {
      await this.$store.dispatch("drawRadarNoAnimation", this.chartId);
    }
  },
};
</script>

<style src="../styles/reviewCard.css" scoped></style>
<style scoped>
.ratingRow {
  margin: 0 0 1rem 0;
  justify-self: center;
  justify-items: center;
  justify-content: center;
  align-self: baseline;
  align-items: baseline;
  align-content: baseline;
}
</style>
