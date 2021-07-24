<template>
  <div>
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          id="reviewCard"
          class="reviewCard ma-4 px-4 py-2 transition-swing"
          outlined
          v-blur
          :min-width="width"
          :min-height="height"
          :loading="loading"
          :elevation="hover ? 12 : 6"
          @click="toggleDrawer(movie.reviewId)"
        >
          <v-row>
            <v-col cols="9">
              <v-card-title class="mb-2 text-h3">{{
                movie.title
              }}</v-card-title>
              <v-card-subtitle class="text-h4">
                {{ movie.titleCN }}.{{ movie.year }}
              </v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="align-end align-content-center align-self-center">
              <v-row class="ratingRow justify-end">
                <span class="text-right text-h4">{{ movie.rating.avg }}</span>
                <span class="text-right text-body-2">/10</span>
              </v-row>
              <v-row class="ratingRow justify-end">
                <span class="text-right">{{ reviewDate }}</span>
              </v-row>
            </v-col>
            <v-col
              class="
                align-end align-content-center align-self-center
                ml-2
                mr-n2
              "
            >
              <v-btn
                text
                depressed
                right
                height="100"
                width="15"
                min-width="0"
                @click="reveal = !reveal"
              >
                <v-icon dense>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-expand-transition>
            <div
              v-if="reveal"
              class="transition-fast-in-fast-out v-card--reveal"
            >
              <v-container class="mb-2">
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
                        >
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
                        >
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
                          @click="toggleFullScreen"
                        >
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
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
    </v-dialog>
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
    // toggleFullScreen() {
    //   this.width = window.innerWidth;
    //   this.height = window.innerHeight;
    // },
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
  /*padding-top: 0.1rem;*/
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
</style>
