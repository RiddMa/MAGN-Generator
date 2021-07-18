<template>
  <div>
    <Review></Review>
  </div>
</template>

<script>
import Review from "@/components/Review";

export default {
  name: "User",
  components: {
    Review,
  },
  async mounted() {
    await this.$store.dispatch("getMovieAttrTid", this.$route.params.id);
    await this.$store.commit("setCommentInput", false);
  },
};
</script>

<style scoped></style>
