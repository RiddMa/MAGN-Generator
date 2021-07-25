<template>
  <v-container>
    <v-row>
      <v-col class="reviewBase ma-auto">
        <Review></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
export default {
  name: "Edit",
  components: { Review },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
