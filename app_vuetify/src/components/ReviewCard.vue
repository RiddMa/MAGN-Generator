<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        :loading="listLoading"
        :ripple="true"
        :elevation="hover ? 12 : 6"
        @click="toggleDrawer(movie.reviewId)"
      >
        <v-card-title class="text-h3">{{ movie.title }}</v-card-title>
        <v-card-subtitle class="text-h4">
          {{ movie.titleCN }}.{{ movie.year }}
        </v-card-subtitle>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "ReviewCard",
};
</script>

<style scoped></style>
