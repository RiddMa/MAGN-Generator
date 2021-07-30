<template>
  <div class="mx-0 mt-auto mb-2">
    <v-checkbox
      v-if="awesome"
      :input-value="awesome"
      hide-details
      label="申遗!"
      class="shrink mr-2 mb-6 align-center"
      @change="handleAwesomeChange"
    ></v-checkbox>
    <v-text-field
      class="no-counter text-body-1 text--primary"
      v-model.number="inputRating"
      type="number"
      :label="desc"
      placeholder="请在此输入，或在下方星星处点击，为剧情评分……"
      prepend-inner-icon="mdi-minus"
      @click:prepend-inner="inputRating -= 1"
      append-icon="mdi-plus"
      @click:append="inputRating += 1"
      :color="'#40ba83'"
      :loading="loading"
      :disabled="loading"
      @keydown.enter="enterBlur"
      @change="onRatingChange"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "ratingInput",
  props: {
    awesome: {
      required: false,
      type: Boolean,
      default() {
        return false;
      },
    },
    rating: {
      required: true,
      type: Number,
      default() {
        return 0;
      },
    },
    desc: {
      required: true,
      type: String,
      default() {
        return "";
      },
    },
    loading: {
      required: false,
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  computed: {
    inputRating: {
      get() {
        return this.rating;
      },
      set(v) {
        if (0 <= v && v <= this.maxRating) {
          this.$emit("update:rating", v);
          this.$store.commit("setMovieRatingAvg");
          this.$store.dispatch("updateRadar");
        }
      },
    },
    maxRating: {
      get() {
        if (!this.awesome) {
          return 10;
        } else {
          return 15;
        }
      },
    },
  },
  methods: {
    handleAwesomeChange() {
      this.$emit("update:awesome", !this.awesome);
      this.$store.commit("setMovieRatingAvg");
      this.$store.dispatch("updateRadar");
    },
    onRatingChange() {
      this.$emit("update:rating", this.inputRating);
      this.$store.commit("setMovieRatingAvg");
      this.$store.dispatch("updateRadar");
    },
    enterBlur(event) {
      event.target.blur();
    },
  },
};
</script>

<style scoped></style>
