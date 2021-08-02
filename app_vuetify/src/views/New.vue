<template>
  <v-container v-if="fitPhone" id="newBase" class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <SettingsPhone mode="new"></SettingsPhone>
        <ReviewPhone mode="new"></ReviewPhone>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else id="newBase" fluid>
    <v-row>
      <v-col class="reviewBase mx-auto">
        <Settings mode="new"></Settings>
        <Review mode="new"></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
import store from "@/store/store";
import { mapState } from "vuex";
import SettingsPhone from "@/components/SettingsPhone";
import ReviewPhone from "@/components/ReviewPhone";
export default {
  name: "New",
  components: { ReviewPhone, SettingsPhone, Settings, Review },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
    }),
  },
  // methods: {
  //   onResize() {
  //     document.querySelector("#newBase").style.width = `${window.innerWidth}px`;
  //   },
  // },
  // mounted() {
  //   this.onResize();
  // },
  beforeDestroy() {},
  async beforeRouteEnter(to, from, next) {
    const tag = "/";
    if (store.state.currentTag !== tag) {
      store.commit("setCurrentTag", tag);
      await store.dispatch("restoreMovie", tag);
    }
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch("backupMovie", "/");
    next();
  },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
