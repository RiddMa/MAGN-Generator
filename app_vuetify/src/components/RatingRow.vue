<template>
  <v-row class="ratingRow body--text text-body-1">
    <v-col cols="9">
      <v-row class="ratingRow text-body-1">
        <v-divider class="ratingDivider"></v-divider>
        <span class="text-center text-h6" style="width: 95px">
          {{ desc }}
        </span>
        <v-divider class="ratingDivider"></v-divider>
        <v-rating
          class="ratingStar"
          :readonly="readonly"
          dense
          hover
          clearable
          :half-increments="allowHalf"
          color="warning"
          background-color="warning"
          length="10"
          size="26"
          :value="rating"
          @input="handleChangeRating"
        ></v-rating>
      </v-row>
    </v-col>
    <v-col>
      <v-row class="ratingRow body--text text-body-1">
        <v-divider class="ratingDivider"></v-divider>
        <v-col>
          <template v-if="displaySlash">
            <v-row class="ratingRowRight" style="width: 64px">
              <span style="width: 44px; font-size: 1.2rem">
                {{ rating }}
              </span>
              <span class="text-right" style="width: 20px; font-size: 0.7rem"> /10 </span>
            </v-row>
          </template>
        </v-col>
        <v-divider class="ratingDivider"></v-divider>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RatingRow",
  props: {
    desc: {
      required: true,
      type: String,
      default() {
        return "";
      },
    },
    rating: {
      required: true,
      type: Number,
      default() {
        return 0;
      },
    },
    readonly: {
      required: false,
      type: Boolean,
      default() {
        return false;
      },
    },
    allowHalf: {
      required: false,
      type: Boolean,
      default() {
        return false;
      },
    },
    displaySlash: {
      required: false,
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  methods: {
    handleChangeRating(newRating) {
      this.$emit("update:rating", newRating);
      this.$store.commit("setMovieRatingAvg");
      this.$store.dispatch("updateRadar");
    },
  },
};
</script>

<style scoped>
.ratingRow {
  justify-self: center;
  justify-items: center;
  justify-content: center;
  align-self: center;
  align-items: center;
  align-content: center;
}
.ratingRowRight {
  padding-top: 0.1rem;
  justify-self: center;
  justify-items: center;
  justify-content: center;
  align-self: baseline;
  align-items: baseline;
  align-content: baseline;
}

.ratingStar {
  /*margin-bottom: 5px;*/
  /*padding-bottom: 10px;*/
}

.ratingDivider {
  margin-left: 1vw;
  margin-right: 1vw;
  /*padding-bottom: 5px;*/
}
</style>
