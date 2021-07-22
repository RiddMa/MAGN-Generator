<template>
  <Edit :reviewItem="reviewList[3]"></Edit>
</template>

<script>
import Edit from "@/views/Edit";
import { mapState } from "vuex";
export default {
  name: "test",
  components: { Edit },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      reviewList: (state) => state.userStore.reviewList,
      fitPhone: (state) => state.fitPhone,
    }),
  },
};
</script>

<style scoped></style>
