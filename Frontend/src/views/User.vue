<template></template>

<script>
export default {
  name: "UserProfile",
  mounted() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped></style>
