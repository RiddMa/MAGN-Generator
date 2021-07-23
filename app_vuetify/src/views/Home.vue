<template>
  <New></New>
  <!--  <hello-world />-->
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import New from "@/views/New";

export default {
  name: "Home",

  components: {
    New,
    HelloWorld,
  },
};
</script>
