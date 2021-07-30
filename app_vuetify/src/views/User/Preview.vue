<template>
  <v-container fluid>
    <v-row>
      <v-col class="reviewBase ma-auto">
        <p class="mb-6 text--secondary text-center">
          尚未完工，凑合看看?
          <v-btn @click="onLeaveClicked">退出</v-btn>
        </p>
        <Review mode="view"></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
import store from "@/store/store";
export default {
  name: "Preview",
  components: { Review },
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
</style>
