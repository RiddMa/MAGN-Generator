<template>
  <v-container id="ssrBase" fluid>
    <v-row>
      <v-col class="ssrBase mx-auto">
        <Review id="toPoster" mode="view"></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";

export default {
  name: "User",
  components: {
    Review,
  },
  async mounted() {
    await this.$store.dispatch("getMovieAttrTid", {
      uuid: this.$route.params.uuid,
      reviewId: this.$route.params.reviewId,
    });
    await this.$store.dispatch("getUsername", this.$route.params.uuid);
    await this.$store.commit("setCommentInput", false);
  },
};
</script>

<style scoped>
.ssrBase {
  max-width: 1024px;
}
</style>
