<template>
  <div>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          :id="`RC${movie.reviewId}`"
          class="reviewCard ma-4 px-4 pt-0 pb-4 transition-swing"
          outlined
          v-blur
          :min-width="width"
          :min-height="height"
          :loading="loading"
          :elevation="hover ? 12 : 6"
          @click="onCardClicked"
        >
          <v-row class="mt-1">
            <v-col cols="9">
              <v-card-title class="reviewTitle mb-2 text-h4">
                {{ movie.title }}
              </v-card-title>
              <v-card-subtitle class="reviewSubTitle text-h5">
                {{ movie.titleCN }}.{{ movie.year }}
              </v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
              class="align-content-center align-self-center align-baseline"
            >
              <v-row class="ratingRow justify-end">
                <span class="text-right text-h4 yellow--text text--darken-3">
                  {{ movie.rating.avg }}
                </span>
                <span
                  class="text-right text-body-2 yellow--text text--darken-3"
                >
                  /10
                </span>
              </v-row>
              <v-row class="ratingRow justify-end">
                <span class="text-right text--secondary mt-3">
                  {{ reviewDate }}
                </span>
              </v-row>
            </v-col>
            <v-col
              class="
                align-end align-content-center align-self-center
                ml-2
                mr-n6
              "
            >
              <v-btn text depressed right height="100" width="15" min-width="0">
                <v-icon> mdi-dots-vertical </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <span class="reviewQuote mx-7 mb-8 pl-2 pr-0 py-0 text--secondary">
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
                          class="editButton transition-swing"
                          outlined
                          block
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
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="3">
                    <v-hover>
                      <template v-slot:default="{ hover }">
                        <v-btn
                          class="editButton transition-swing"
                          outlined
                          block
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
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="3">
                    <v-hover>
                      <template v-slot:default="{ hover }">
                        <v-btn
                          class="editButton transition-swing"
                          outlined
                          block
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
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-expand-transition>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
import moment from "moment";
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
    toggleFullScreen() {
      // document.getElementById(`RC${this.movie.reviewId}`).style.height =
      //   "500px";
    },
    onCardClicked() {
      if (this.showDeleteCheck) {
        this.showDeleteCheck = false;
      } else {
        this.reveal = !this.reveal;
      }
    },
    async onViewClicked() {
      await this.$router.push(`/user/${this.movie.reviewId}/view`);
    },
    async onEditClicked() {
      await this.$router.push(`/user/${this.movie.reviewId}/edit`);
    },
    async onDeleteClicked() {
      //show modal
      this.loading = true;
      await this.$store.dispatch("deleteUserReview", this.movie.reviewId);
      this.showDeleteCheck = false;
      this.loading = false;
    },
  },
  mounted() {
    // let elem = document.getElementById("reviewCard");
    // this.height = elem.offsetHeight;
    // this.width = elem.offsetWidth;
  },
};
</script>

<style src="../styles/reviewCard.css" scoped></style>
<style scoped>
.reviewCard {
}

.ratingRow {
  justify-self: end;
  justify-items: end;
  justify-content: end;
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
.reviewTitle {
  color: #36b079;
}
.reviewSubTitle {
  color: rgba(54, 176, 121, 0.9);
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
