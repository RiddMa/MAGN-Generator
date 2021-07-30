<template>
  <v-container fluid>
    <v-row>
      <v-col class="reviewBase ma-auto">
        <Settings mode="edit"></Settings>
        <Review mode="edit"></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
import store from "@/store/store";
export default {
  name: "Edit",
  components: { Settings, Review },
  async beforeRouteEnter(to, from, next) {
    const tag = "/edit";
    if (store.state.currentTag !== tag) {
      store.commit("setCurrentTag", tag);
      await store.dispatch("restoreMovie", tag);
    }
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch("backupMovie", "/edit");
    next();
  },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
