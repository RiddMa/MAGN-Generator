<template>
  <v-container v-if="fitPhone" id="reviewBase" fluid class="ma-0 pa-0">
    <v-row v-if="fitPhone" class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <p class="mb-4 text-center">
          <v-btn
            class="quitBtn"
            color="success"
            outlined
            block
            @click="onLeaveClicked"
            >退出</v-btn
          >
        </p>
        <ReviewPhone mode="view"></ReviewPhone>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else id="reviewBase" fluid>
    <v-row>
      <v-col class="reviewBase mx-auto">
        <p class="mb-6 text-center">
          <v-btn
            class="quitBtn"
            color="success"
            outlined
            block
            @click="onLeaveClicked"
            >退出</v-btn
          >
        </p>
        <Review mode="view"></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
import store from "@/store/store";
import { mapState } from "vuex";
import ReviewPhone from "@/components/ReviewPhone";
export default {
  name: "Preview",
  components: { ReviewPhone, Review },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
    }),
  },
  methods: {
    onLeaveClicked() {
      this.$store.commit("setIsViewing", false);
      this.$router.replace("/user");
    },
  },
  async beforeRouteEnter(to, from, next) {
    const tag = "/view";
    if (store.state.currentTag !== tag) {
      store.commit("setCurrentTag", tag);
      await store.dispatch("restoreMovie", tag);
    }
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch("backupMovie", "/view");
    next();
  },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
.quitBtn {
  border-width: 1.5px;
}
</style>
