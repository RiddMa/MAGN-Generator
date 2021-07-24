<template>
  <v-container>
    <v-row>
      <v-col class="reviewBase ma-auto">
        <ReviewCard
          v-for="movie in reviewList"
          v-bind:key="movie.reviewId"
        ></ReviewCard>
      </v-col>
    </v-row>
  </v-container>

  <!--  <div>-->
  <!--    <v-row>-->
  <!--      <v-divider></v-divider>-->
  <!--      <v-col>-->
  <!--        <v-list item-layout="horizontal" :datv-source="reviewList">-->
  <!--          <template #renderItem="{ item }">-->
  <!--            <v-card-->
  <!--              class="reviewCard"-->
  <!--              hoverable-->
  <!--              v-on:click="toggleDrawer(item.reviewId)"-->
  <!--            >-->
  <!--              <v-spin :spinning="listLoading">-->
  <!--                <v-row>-->
  <!--                  <v-col>-->
  <!--                    <v-typography-title class="awesomeTitle" :level="2">-->
  <!--                      {{ item.title }}-->
  <!--                    </v-typography-title>-->
  <!--                    <v-typography-title class="awesomeTitle" :level="4">-->
  <!--                      {{ item.titleCN + "." + item.year }}-->
  <!--                    </v-typography-title>-->
  <!--                  </v-col>-->
  <!--                  <v-col flex="auto"></v-col>-->
  <!--                  <v-col class="ratings">-->
  <!--                    <span class="ratingText">{{ item.rating.avg }}/10</span>-->
  <!--                  </v-col>-->
  <!--                </v-row>-->

  <!--                &lt;!&ndash;              <v-progress&ndash;&gt;-->
  <!--                &lt;!&ndash;                type="dashboard"&ndash;&gt;-->
  <!--                &lt;!&ndash;                :gapDegree="1"&ndash;&gt;-->
  <!--                &lt;!&ndash;                :strokeColor="#F5DD3C"&ndash;&gt;-->
  <!--                &lt;!&ndash;                :format="ratingCircleFormat"&ndash;&gt;-->
  <!--                &lt;!&ndash;                :percent="item.rating.avg * 10"&ndash;&gt;-->
  <!--                &lt;!&ndash;              />&ndash;&gt;-->
  <!--                <v-typography-paragraph>-->
  <!--                  <blockquote class="commentPreview">-->
  <!--                    {{ item.comment }}-->
  <!--                  </blockquote>-->
  <!--                </v-typography-paragraph>-->
  <!--              </v-spin>-->
  <!--            </v-card>-->
  <!--          </template>-->
  <!--        </v-list>-->
  <!--        <v-drawer-->
  <!--          class="drawer"-->
  <!--          placement="bottom"-->
  <!--          :height="drawerHeight"-->
  <!--          :destroyOnClose="false"-->
  <!--          :closable="false"-->
  <!--          :keyboard="true"-->
  <!--          v-model:visible="drawerVisible"-->
  <!--          :afterVisibleChange="onVisibleChange"-->
  <!--        >-->
  <!--          <v-row class="drawerTitle">-->
  <!--            <v-col flex="auto"></v-col>-->
  <!--            <v-col :xxl="14" :xl="16" :lg="18" :md="20" :sm="22" :xs="24">-->
  <!--              <v-row v-if="!fitPhone" class="drawerTitleRow">-->
  <!--                <v-col>-->
  <!--                  <v-typography-title class="awesomeTitle" :level="4">-->
  <!--                    影评编辑-->
  <!--                  </v-typography-title>-->
  <!--                </v-col>-->
  <!--                <v-col flex="auto"></v-col>-->
  <!--                <v-col style="text-align: end">-->
  <!--                  <v-space>-->
  <!--                    <v-popconfirm-->
  <!--                      title="是否要删除此影评？"-->
  <!--                      ok-text="是"-->
  <!--                      cancel-text="否"-->
  <!--                      placement="bottom"-->
  <!--                      arrowPointAtCenter-->
  <!--                      @confirm="commitDelete(this.editingMovie.reviewId)"-->
  <!--                    >-->
  <!--                      <template #icon>-->
  <!--                        <QuestionCircleOutlined style="color: #404040" />-->
  <!--                      </template>-->
  <!--                      <v-button danger :loading="drawerLoading">删除</v-button>-->
  <!--                    </v-popconfirm>-->
  <!--                    <v-popconfirm-->
  <!--                      title="是否要取消？更改将不会被保存。"-->
  <!--                      ok-text="是"-->
  <!--                      cancel-text="否"-->
  <!--                      placement="bottom"-->
  <!--                      arrowPointAtCenter-->
  <!--                      @confirm="cancelUpdate"-->
  <!--                    >-->
  <!--                      <template #icon>-->
  <!--                        <QuestionCircleOutlined style="color: #404040" />-->
  <!--                      </template>-->
  <!--                      <v-button>取消</v-button>-->
  <!--                    </v-popconfirm>-->
  <!--                    <v-button-->
  <!--                      type="primary"-->
  <!--                      :loading="drawerLoading"-->
  <!--                      @click="commitUpdate"-->
  <!--                    >-->
  <!--                      完成-->
  <!--                    </v-button>-->
  <!--                  </v-space>-->
  <!--                </v-col>-->
  <!--              </v-row>-->
  <!--              <v-row v-if="fitPhone" class="drawerTitleRowPhone">-->
  <!--                <v-col>-->
  <!--                  <v-popconfirm-->
  <!--                    title="是否要删除此影评？"-->
  <!--                    ok-text="是"-->
  <!--                    cancel-text="否"-->
  <!--                    placement="bottom"-->
  <!--                    arrowPointAtCenter-->
  <!--                    @confirm="commitDelete"-->
  <!--                  >-->
  <!--                    <template #icon>-->
  <!--                      <QuestionCircleOutlined style="color: #404040" />-->
  <!--                    </template>-->
  <!--                    <v-button danger>删除</v-button>-->
  <!--                  </v-popconfirm>-->
  <!--                </v-col>-->
  <!--                <v-col flex="auto"></v-col>-->
  <!--                <v-col>-->
  <!--                  <v-popconfirm-->
  <!--                    title="是否要取消？更改将不会被保存。"-->
  <!--                    ok-text="是"-->
  <!--                    cancel-text="否"-->
  <!--                    placement="bottom"-->
  <!--                    arrowPointAtCenter-->
  <!--                    @confirm="cancelUpdate"-->
  <!--                  >-->
  <!--                    <template #icon>-->
  <!--                      <QuestionCircleOutlined style="color: #404040" />-->
  <!--                    </template>-->
  <!--                    <v-button>取消</v-button>-->
  <!--                  </v-popconfirm>-->
  <!--                </v-col>-->
  <!--                <v-col flex="auto"></v-col>-->
  <!--                <v-col style="text-align: end">-->
  <!--                  <v-button type="primary" @click="commitUpdate">-->
  <!--                    完成-->
  <!--                  </v-button>-->
  <!--                </v-col>-->
  <!--              </v-row>-->
  <!--            </v-col>-->
  <!--            <v-col flex="auto"></v-col>-->
  <!--          </v-row>-->
  <!--          <div style="height: 30px"></div>-->
  <!--          &lt;!&ndash;          <Review v-if="!fitPhone"></Review>&ndash;&gt;-->
  <!--          &lt;!&ndash;          <ReviewPhone v-if="fitPhone"></ReviewPhone>&ndash;&gt;-->
  <!--          <v-spin :spinning="drawerLoading">-->
  <!--            <Settings></Settings>-->
  <!--            <Edit :reviewItem="editingMovie"></Edit>-->
  <!--          </v-spin>-->
  <!--        </v-drawer>-->
  <!--      </v-col>-->
  <!--      <v-divider></v-divider>-->
  <!--    </v-row>-->
  <!--  </div>-->
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Settings from "@/components/Settings";
import ReviewCard from "@/components/ReviewCard";

export default {
  name: "UserProfile",
  components: {
    ReviewCard,
    Settings,
  },
  data() {
    return {
      drawerVisible: false,
      drawerHeight: 256,
      editingMovie: null,
      scrollDistance: 0,
      drawerLoading: false,
      listLoading: false,
    };
  },
  computed: {
    ...mapState({
      reviewList: (state) => state.userStore.reviewList,
      fitPhone: (state) => state.fitPhone,
    }),
    ...mapGetters({
      getReviewById: "getReviewById",
    }),
  },
  methods: {
    showSnackbar() {
      this.$store.commit("showToast", {
        type: "success",
        message: "123",
        timer: -1,
      });
    },
    ratingCircleFormat(percent) {
      percent /= 10;
      return `${percent}/10`;
    },
    toggleDrawer(reviewId) {
      this.listLoading = true;
      this.drawerHeight = window.innerHeight;
      this.$store.commit("setMovie", this.getReviewById(reviewId));
      this.drawerVisible = true;
    },
    onVisibleChange() {
      if (this.drawerVisible === true) {
        this.listLoading = false;
      }
    },
    stopBodyScroll(isFixed) {
      this.scrollDistance = window.scrollY;
      if (isFixed) {
        document.body.style.position = "fixed";
        document.body.style.top = -this.scrollDistance + "px";
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, this.scrollDistance); // 回到原先的top
      }
    },
    async cancelUpdate() {
      this.drawerVisible = false;
    },
    async commitUpdate() {
      this.drawerLoading = true;
      await this.$store.dispatch("updateUserReview", this.$store.state.movie);
      await this.$store.dispatch("getAllUserReview");
      this.drawerLoading = false;
      this.drawerVisible = false;
    },
    async commitDelete(reviewId) {
      this.drawerLoading = true;
      await this.$store.dispatch("deleteUserReview", reviewId);
      await this.$store.dispatch("getAllUserReview");
      this.drawerLoading = false;
      this.drawerVisible = false;
    },
  },
  async mounted() {
    if ((await this.$store.dispatch("isUserLoggedIn", this)) === true) {
      this.$store.dispatch("getAllUserReview");
    } else {
      this.$store.commit("pushPendingQueue", "getAllUserReview");
    }
  },
};
</script>

<style scoped>
.reviewCard {
  border-color: rgba(66, 185, 131, 0.5);
  margin: 2rem;
}

.awesomeTitle {
  text-align: start;
  vertical-align: center;
  color: #40ba83;
}
.titleSearch {
  margin: 1vh 0;
  width: 100%;
}
.ant-typography + h2.ant-typography,
.ant-typography + h3.ant-typography,
.ant-typography + h4.ant-typography,
.ant-typography + h5.ant-typography {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}
h1.ant-typography,
.ant-typography h1 {
  margin-top: 0;
  margin-bottom: 0.2em;
}
.genreTag {
  background-color: rgba(255, 255, 255, 0.01);
  border-color: rgba(66, 185, 131, 0.5);
  margin-bottom: 0.5em;
}
.commentPreview {
  margin-top: 1rem;
  padding-bottom: 0;
  text-align: left;
  vertical-align: bottom;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ratings {
  display: flex;
  align-items: center;
}
.drawer {
  overflow-y: auto;
}
.drawerTitle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  padding: 0.75rem 0 0.25rem 0;
  background: rgba(255, 255, 255, 0.75);
  text-align: left;
  z-index: 1;
}
.drawerTitleRow {
  margin: 0 4.75rem;
}

.drawerTitleRowPhone {
  margin: 0 2.5rem;
}
</style>
