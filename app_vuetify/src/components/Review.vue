<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="reviewCard ma-4 pa-4 transition-swing"
        outlined
        :elevation="hover ? 12 : 6"
      >
        <v-card-title class="text-h3">{{ movie.title }}</v-card-title>
        <v-card-subtitle class="text-h4">
          {{ movie.titleCN }}.{{ movie.year }}
        </v-card-subtitle>
        <v-card-text>
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="reviewCard mt-2 mb-8 mx-2 pa-4 transition-swing"
                outlined
                :elevation="hover ? 6 : 0"
              >
                <v-card-text class="text-center text--primary">
                  <RatingRow
                    :desc="'剧情'"
                    :rating.sync="movie.rating.screenplay"
                  />
                  <RatingRow
                    :desc="'视效/摄影'"
                    :rating.sync="movie.rating.visual"
                  />
                  <RatingRow
                    :desc="'演出/剪辑'"
                    :rating.sync="movie.rating.editing"
                  />
                  <RatingRow
                    :desc="'配乐/音效'"
                    :rating.sync="movie.rating.sound"
                  />
                  <v-row class="ratingRow">
                    {{ movie.rating.avg }}
                  </v-row>
                  <v-row class="ratingRow">
                    <div id="radarPlot" />
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
                    placeholder="请输入影评……"
                    :value="movie.comment"
                    counter
                  ></v-textarea>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
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
};
</script>

<style scoped>
.reviewCard {
  border-color: #40ba83;
}
.ratingRow {
  justify-self: center;
  justify-items: center;
  justify-content: center;
  align-self: baseline;
  align-items: baseline;
  align-content: baseline;
}
</style>
