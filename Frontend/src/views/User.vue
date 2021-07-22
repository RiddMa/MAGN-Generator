<template>
  <div>
    <a-row>
      <a-col flex="auto"></a-col>
      <a-col :xxl="14" :xl="16" :lg="18" :md="20" :sm="22" :xs="24">
        <a-list item-layout="horizontal" :data-source="reviewList">
          <template #renderItem="{ item }">
            <a-card
              class="reviewCard"
              hoverable
              v-on:click="toggleDrawer(item.reviewId)"
            >
              <a-spin :spinning="listLoading">
                <a-row>
                  <a-col>
                    <a-typography-title class="awesomeTitle" :level="2">
                      {{ item.title }}
                    </a-typography-title>
                    <a-typography-title class="awesomeTitle" :level="4">
                      {{ item.titleCN + "." + item.year }}
                    </a-typography-title>
                  </a-col>
                  <a-col flex="auto"></a-col>
                  <a-col class="ratings">
                    <span class="ratingText">{{ item.rating.avg }}/10</span>
                  </a-col>
                </a-row>

                <!--              <a-progress-->
                <!--                type="dashboard"-->
                <!--                :gapDegree="1"-->
                <!--                :strokeColor="#F5DD3C"-->
                <!--                :format="ratingCircleFormat"-->
                <!--                :percent="item.rating.avg * 10"-->
                <!--              />-->
                <a-typography-paragraph>
                  <blockquote class="commentPreview">
                    {{ item.comment }}
                  </blockquote>
                </a-typography-paragraph>
              </a-spin>
            </a-card>
          </template>
        </a-list>
        <a-drawer
          class="drawer"
          placement="bottom"
          :height="drawerHeight"
          :destroyOnClose="false"
          :closable="false"
          :keyboard="true"
          v-model:visible="drawerVisible"
          :afterVisibleChange="onVisibleChange"
        >
          <a-row class="drawerTitle">
            <a-col flex="auto"></a-col>
            <a-col :xxl="14" :xl="16" :lg="18" :md="20" :sm="22" :xs="24">
              <a-row v-if="!fitPhone" class="drawerTitleRow">
                <a-col>
                  <a-typography-title class="awesomeTitle" :level="4">
                    影评编辑
                  </a-typography-title>
                </a-col>
                <a-col flex="auto"></a-col>
                <a-col style="text-align: end">
                  <a-space>
                    <a-popconfirm
                      title="是否要删除此影评？"
                      ok-text="是"
                      cancel-text="否"
                      placement="bottom"
                      arrowPointAtCenter
                      @confirm="commitDelete(this.editingMovie.reviewId)"
                    >
                      <template #icon>
                        <QuestionCircleOutlined style="color: #404040" />
                      </template>
                      <a-button danger :loading="drawerLoading">删除</a-button>
                    </a-popconfirm>
                    <a-popconfirm
                      title="是否要取消？更改将不会被保存。"
                      ok-text="是"
                      cancel-text="否"
                      placement="bottom"
                      arrowPointAtCenter
                      @confirm="cancelUpdate"
                    >
                      <template #icon>
                        <QuestionCircleOutlined style="color: #404040" />
                      </template>
                      <a-button>取消</a-button>
                    </a-popconfirm>
                    <a-button
                      type="primary"
                      :loading="drawerLoading"
                      @click="commitUpdate"
                    >
                      完成
                    </a-button>
                  </a-space>
                </a-col>
              </a-row>
              <a-row v-if="fitPhone" class="drawerTitleRowPhone">
                <a-col>
                  <a-popconfirm
                    title="是否要删除此影评？"
                    ok-text="是"
                    cancel-text="否"
                    placement="bottom"
                    arrowPointAtCenter
                    @confirm="commitDelete"
                  >
                    <template #icon>
                      <QuestionCircleOutlined style="color: #404040" />
                    </template>
                    <a-button danger>删除</a-button>
                  </a-popconfirm>
                </a-col>
                <a-col flex="auto"></a-col>
                <a-col>
                  <a-popconfirm
                    title="是否要取消？更改将不会被保存。"
                    ok-text="是"
                    cancel-text="否"
                    placement="bottom"
                    arrowPointAtCenter
                    @confirm="cancelUpdate"
                  >
                    <template #icon>
                      <QuestionCircleOutlined style="color: #404040" />
                    </template>
                    <a-button>取消</a-button>
                  </a-popconfirm>
                </a-col>
                <a-col flex="auto"></a-col>
                <a-col style="text-align: end">
                  <a-button type="primary" @click="commitUpdate">
                    完成
                  </a-button>
                </a-col>
              </a-row>
            </a-col>
            <a-col flex="auto"></a-col>
          </a-row>
          <div style="height: 30px"></div>
          <!--          <Review v-if="!fitPhone"></Review>-->
          <!--          <ReviewPhone v-if="fitPhone"></ReviewPhone>-->
          <a-spin :spinning="drawerLoading">
            <Settings></Settings>
            <Edit :reviewItem="editingMovie"></Edit>
          </a-spin>
        </a-drawer>
      </a-col>
      <a-col flex="auto"></a-col>
    </a-row>
  </div>
</template>

<script>
import { List, Drawer, Popconfirm } from "ant-design-vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { mapGetters, mapState } from "vuex";
import Edit from "@/views/Edit";
import Settings from "@/components/Settings";

export default {
  name: "UserProfile",
  components: {
    Settings,
    Edit,
    "a-list": List,
    "a-drawer": Drawer,
    "a-popconfirm": Popconfirm,
    QuestionCircleOutlined,
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
