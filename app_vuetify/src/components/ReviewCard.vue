<template>
  <v-container fluid style="position: relative">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          :id="`RC${movie.reviewId}`"
          class="reviewCard mx-4 my-2 px-4 pt-0 pb-4 transition-swing"
          outlined
          v-blur
          :min-width="width"
          :min-height="height"
          :loading="loading"
          :elevation="hover ? 12 : 6"
          @click="onCardClicked"
        >
          <v-row
            class="justify-space-between mt-1 mb-0 pb-0"
            style="width: 100%"
          >
            <v-col>
              <v-row
                class="justify-space-between align-baseline ml-4 mt-4 pa-auto"
                style="width: 100%"
              >
                <span class="reviewTitle mb-2 text-h3">
                  {{ movie.title }}
                </span>
                <span
                  class="
                    text-right text-h4
                    ma-0
                    pa-0
                    yellow--text
                    text--darken-3
                  "
                >
                  {{ movie.rating.avg }}
                  <span class="text-body-1"> /10 </span>
                </span>
              </v-row>
              <v-row
                class="justify-space-between align-baseline ml-4 mt-4 pa-auto"
                style="width: 100%"
              >
                <span class="reviewSubTitle text-h4 mb-0 pb-0">
                  {{ movie.titleCN }}.{{ movie.year }}
                </span>
                <span class="text-right text--secondary mt-3">
                  {{ reviewDate }}
                </span>
              </v-row>
            </v-col>
            <v-col
              class="shrink justify-end align-center mr-0 pr-0 ma-auto pa-auto"
            >
              <v-btn text depressed right height="100" width="30" min-width="0">
                <v-icon> mdi-dots-vertical </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="my-4 mr-0 pa-0" style="width: 100%">
            <span
              class="reviewQuote ml-7 mr-1 mb-0 pl-2 pr-0 py-0 text--secondary"
            >
              {{ movie.comment }}
            </span>
          </v-row>

          <v-expand-transition>
            <div
              v-if="reveal"
              class="transition-fast-in-fast-out v-card--reveal"
            >
              <!--              <v-divider class="mx-3"></v-divider>-->
              <v-container class="mt-0 mb-2">
                <v-row>
                  <v-col cols="3">
                    <v-hover>
                      <template v-slot:default="{ hover }">
                        <v-btn
                          class="
                            outlineBtn
                            transition-swing
                            text-button
                            error--text
                          "
                          outlined
                          block
                          :elevation="hover ? 6 : 2"
                          :disabled="loading"
                          @click.stop="onDeleteClicked"
                        >
                          <v-icon dense>mdi-delete-outline</v-icon>
                          删除
                        </v-btn>
                      </template>
                    </v-hover>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="3">
                    <v-hover>
                      <template v-slot:default="{ hover }">
                        <v-btn
                          class="
                            outlineBtn
                            transition-swing
                            text-button
                            info--text
                          "
                          outlined
                          block
                          :elevation="hover ? 6 : 2"
                          :disabled="loading"
                          @click.stop="onEditClicked"
                        >
                          <v-icon dense>mdi-pencil-outline</v-icon>
                          编辑
                        </v-btn>
                      </template>
                    </v-hover>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="3">
                    <v-hover>
                      <template v-slot:default="{ hover }">
                        <v-btn
                          class="
                            outlineBtn
                            transition-swing
                            text-button
                            success--text
                          "
                          outlined
                          block
                          :elevation="hover ? 6 : 2"
                          :disabled="loading"
                          @click.stop="onViewClicked"
                        >
                          <v-icon dense>mdi-file-find</v-icon>
                          查看
                        </v-btn>
                      </template>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-expand-transition>
        </v-card>
      </template>
    </v-hover>
  </v-container>
</template>

<script>
import moment from "moment";
import goTo from "vuetify/lib/services/goto";
import store from "@/store/store";
moment.locale("zh-cn");
export default {
  name: "ReviewCard",
  props: {
    movie: {
      required: true,
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      loading: false,
      reveal: false,
      height: 0,
      width: 0,
      dialog: false,
      showDeleteCheck: false,
    };
  },
  computed: {
    reviewDate: {
      get() {
        return moment(this.movie.timestamp).format("L");
      },
      set(newDate) {
        let newAttr = this.movie;
        newAttr.timestamp = newDate;
        this.$emit("update:movie", newAttr);
      },
    },
  },
  methods: {
    onCardClicked() {
      if (this.showDeleteCheck) {
        this.showDeleteCheck = false;
      } else {
        this.reveal = !this.reveal;
      }
    },
    scroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      let scrollBottom =
        document.body.scrollHeight -
        scrollTop -
        document.documentElement.clientHeight;
      let offset =
        document
          .querySelector(`#RC${this.movie.reviewId}`)
          .getBoundingClientRect().height - scrollBottom;
      if (offset > 0) {
        let scrollTo = scrollTop - offset;
        goTo(scrollTo);
      }
    },
    async onViewClicked() {
      store.commit("setCurrentTag", "/view");
      this.$store.commit("setIsViewing", true);
      this.$store.commit("setViewURL", this.movie.reviewId);
      await this.$store.dispatch("backupMovie");
      this.$store.commit("setMovie", this.movie);
      this.$store.commit("setCurrentTag", "/view");
      await this.$router.push(this.$store.state.viewURL);
    },
    async onEditClicked() {
      store.commit("setCurrentTag", "/edit");
      this.$store.commit("setIsEditing", true);
      this.$store.commit("setEditURL", this.movie.reviewId);
      await this.$store.dispatch("backupMovie");
      this.$store.commit("setMovie", this.movie);
      this.$store.commit("setCurrentTag", "/edit");
      await this.$router.push(this.$store.state.editURL);
    },
    async onDeleteClicked() {
      //show modal
      this.loading = true;
      this.scroll();
      await this.$store.dispatch("deleteUserReview", this.movie.reviewId);
      this.showDeleteCheck = false;
      this.loading = false;
    },
  },
  mounted() {},
};
</script>

<style src="../styles/customButton.css" scoped></style>
<style src="../styles/reviewCard.css" scoped></style>
<style scoped>
.v-card--reveal {
  left: 0;
  top: 0;
  opacity: 1 !important;
  /*position: absolute;*/
  width: 100%;
}
.editButton {
  border-width: 1.5px;
}

.reviewQuote {
  border: 0 solid lightgrey;
  border-radius: 0;
  border-left-width: 2px;
  word-break: normal; /* maybe !important  */
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  max-lines: 3;
  -webkit-box-orient: vertical;
}
</style>
