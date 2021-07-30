<template>
  <v-row class="ratingRow text--primary text-body-1">
    <v-divider class="ml-0 mr-2 px-0 pb-2"></v-divider>
    <span class="text-center text--primary text-h6">
      {{ desc }} -
      <span class="text--primary text-h6">
        {{ rating }}
      </span>
      <span class="text-right text--secondary" style="font-size: 0.7rem">
        /10
      </span>
    </span>
    <v-divider class="mr-0 ml-2 px-0 pb-2"></v-divider>
    <v-rating
      class="ratingStar"
      :readonly="readonly"
      dense
      hover
      clearable
      :half-increments="allowHalf"
      color="yellow accent-4"
      background-color="yellow accent-4"
      length="10"
      size="26"
      :value="rating"
      @input="handleChangeRating"
    ></v-rating>
  </v-row>
</template>

<script>
export default {
  name: "RatingRowPhone",
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
</style>
