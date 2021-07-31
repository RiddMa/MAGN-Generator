<template>
  <v-container v-if="fitPhone" id="reviewBase" fluid class="ma-0 pa-0">
    <v-row v-if="fitPhone" class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <p class="mb-4 text-center">
          <v-btn
            class="outlineBtn text-button"
            outlined
            block
            elevation="2"
            @click="onLeaveClicked"
            >退出
          </v-btn>
        </p>
        <ReviewPhone mode="view"></ReviewPhone>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else id="reviewBase" fluid>
    <v-row>
      <v-col class="reviewBase mx-auto">
        <p class="mx-4 mt-2 mb-8 pa-auto text-center">
          <v-btn
            class="outlineBtn secondary--text text-button"
            outlined
            block
            elevation="2"
            @click="onLeaveClicked"
            >退出
          </v-btn>
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
    if (store.state.userStore.reviewList.length === 0) {
      store.state.reloadWarning = true;
      next("/user");
    }
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch("backupMovie", "/view");
    next();
  },
};
</script>

<style src="../../styles/customButton.css" scoped></style>
<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
