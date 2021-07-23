<template>
  <v-row class="ratingRow text--primary text-body-1">
    <v-spacer></v-spacer>
    <span class="text-center" style="width: 80px">{{ desc }}</span>

    <v-spacer></v-spacer>
    <v-rating
      class="ratingStar"
      dense
      color="yellow accent-4"
      background-color="yellow accent-4"
      length="10"
      :value="rating"
      @input="handleChangeRating"
    ></v-rating>
    <v-spacer></v-spacer>
    <span class="text-right" style="width: 32px">{{ rating }}</span>
    <v-spacer></v-spacer>
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
  },
  methods: {
    handleChangeRating(newRating) {
      this.$emit("update:rating", newRating);
    },
  },
};
</script>
<style scoped>
.ratingRow {
  justify-self: center;
  justify-items: center;
  justify-content: center;
  align-self: baseline;
  align-items: baseline;
  align-content: baseline;
}

.ratingStar {
}
</style>
