<template>
  <v-container>
    <v-row>
      <v-col class="reviewBase ma-auto">
        <Settings></Settings>
        <Review></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
export default {
  name: "New",
  components: { Settings, Review },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
