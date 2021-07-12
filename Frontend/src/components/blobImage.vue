<template>
  <img ref="image" :src="blobUrl" @load="loaded" />
</template>

<script>
import axios from "axios";

/**
 * Load an image url as a blob
 */
async function load(src) {
  const config = { url: src, method: "get", responseType: "blob" };
  const response = await axios.request(config);
  return response.data; // the blob
}

/**
 * Loads the image as a blob and createObjectURL().
 * Set the img tag's src to the object url.
 * Once the image is loaded, revoke the object url (avoid memory leak).
 * Notice that the page can still show the image, but the src blob is no longer valid.
 */
export default {
  name: "blobImage",
  data() {
    return {
      blobUrl: null,
    };
  },
  props: {
    src: {
      type: String,
    },
  },
  methods: {
    loaded() {
      if (this.blobUrl) URL.revokeObjectURL(this.blobUrl);
    },
  },
  watch: {
    src: {
      immediate: true,
      handler(src) {
        if (!src) return;
        load(src).then((blob) => {
          this.blobUrl = URL.createObjectURL(blob);
        });
      },
    },
  },
};
</script>

<style scoped></style>
