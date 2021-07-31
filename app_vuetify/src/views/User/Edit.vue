<template>
  <v-container v-if="fitPhone" id="editBase" fluid class="ma-0 pa-0">
    <v-row v-if="fitPhone" class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <SettingsPhone mode="edit"></SettingsPhone>
        <ReviewPhone mode="edit"></ReviewPhone>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else id="editBase" fluid>
    <v-row>
      <v-col class="reviewBase mx-auto">
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
import SettingsPhone from "@/components/SettingsPhone";
import ReviewPhone from "@/components/ReviewPhone";
import { mapState } from "vuex";
export default {
  name: "Edit",
  components: { ReviewPhone, SettingsPhone, Settings, Review },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
    }),
  },
  async beforeRouteEnter(to, from, next) {
    console.log(to);
    const tag = "/edit";
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
