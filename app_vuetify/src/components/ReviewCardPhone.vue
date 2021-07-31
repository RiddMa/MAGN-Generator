<template>
  <v-container fluid style="position: relative">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          :id="`RC${movie.reviewId}`"
          class="reviewCard mx-0 mt-4 px-0 pt-0 pb-1 transition-swing"
          outlined
          v-blur
          :loading="loading"
          :elevation="hover ? 12 : 6"
          @click="onCardClicked"
        >
          <v-row class="reviewTitle text-h4 mt-4 ml-4 mb-0 pa-auto">
            {{ movie.title }}
          </v-row>
          <v-row class="reviewSubTitle text-h5 ml-4 my-0 pa-auto">
            {{ movie.titleCN }}.{{ movie.year }}
          </v-row>
          <v-row
            class="ratingRow ma-0 pa-0 justify-space-between"
            style="width: 100%"
          >
            <div class="yellow--text text--darken-3">
              <span class="ml-4 text-h6">
                {{ movie.rating.avg }}
              </span>
              <span class="text-body-2"> /10 </span>
            </div>
            <span class="text-right text-body-2 text--secondary mt-3">
              {{ reviewDate }}
            </span>
            <v-btn
              text
              v-blur
              right
              depressed
              small
              class="mr-4 pa-0"
              style="width: 25px"
              min-height="0px"
              min-width="0px"
            >
              <v-icon> mdi-dots-horizontal </v-icon>
            </v-btn>
          </v-row>

          <v-row style="width: 100%">
            <span
              class="reviewQuote ml-7 mr-2 mb-8 pl-2 pr-1 py-0 text--secondary"
              style="width: 100%; font-size: 0.9rem"
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
              <v-container fluid class="mb-3">
                <v-row class="justify-space-between">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-btn
                        class="editButton transition-swing ml-4"
                        outlined
                        :elevation="hover ? 6 : 2"
                        color="red"
                        :disabled="loading"
                        @click.stop="onDeleteClicked"
                      >
                        <v-icon dense>mdi-delete-outline</v-icon>
                        删除
                      </v-btn>
                    </template>
                  </v-hover>
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-btn
                        class="editButton transition-swing ma-0"
                        outlined
                        :elevation="hover ? 6 : 2"
                        color="blue lighten-1"
                        :disabled="loading"
                        @click.stop="onEditClicked"
                      >
                        <v-icon dense>mdi-pencil-outline</v-icon>
                        编辑
                      </v-btn>
                    </template>
                  </v-hover>
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-btn
                        class="editButton transition-swing mr-4"
                        outlined
                        :elevation="hover ? 6 : 2"
                        color="green lighten-1"
                        :disabled="loading"
                        @click.stop="onViewClicked"
                      >
                        <v-icon dense>mdi-file-find</v-icon>
                        查看
                      </v-btn>
                    </template>
                  </v-hover>
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
  name: "ReviewCardPhone",
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
        let scrollTo = scrollTop - offset + 10;
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
.reviewCard {
}

.ratingRow {
  align-self: baseline;
  align-items: baseline;
  align-content: baseline;
}
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
  border-right-width: 2px;
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
