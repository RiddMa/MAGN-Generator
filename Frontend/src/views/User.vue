<template>
  <div>
    <a-row>
      <a-col flex="auto"></a-col>
      <a-col :xxl="14" :xl="16" :lg="18" :md="20" :sm="22" :xs="24">
        <a-list item-layout="horizontal" :data-source="reviewList">
          <template #renderItem="{ item }">
            <a-card class="reviewCard" hoverable v-on:click="toggleDrawer">
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
            </a-card>
          </template>
        </a-list>
        <a-drawer
          placement="bottom"
          :height="drawerHeight"
          :destroyOnClose="true"
          :closable="false"
          :keyboard="true"
          v-model:visible="drawerVisible"
          @close="onDrawerClose"
        >
          <div class="drawerTitle">123</div>
          <Review></Review>
        </a-drawer>
      </a-col>
      <a-col flex="auto"></a-col>
    </a-row>
  </div>
</template>

<script>
import { List, message, Progress, Drawer } from "ant-design-vue";
import { mapState } from "vuex";
import Review from "@/components/Review";

export default {
  name: "UserProfile",
  components: {
    Review,
    "a-list": List,
    "a-progress": Progress,
    "a-drawer": Drawer,
  },
  data() {
    return {
      drawerVisible: false,
      drawerHeight: 256,
    };
  },
  computed: {
    ...mapState({
      reviewList: (state) => state.userStore.reviewList,
    }),
  },
  methods: {
    ratingCircleFormat(percent) {
      percent /= 10;
      return `${percent}/10`;
    },
    toggleDrawer() {
      this.drawerVisible = true;
    },
    onDrawerClose() {},
  },
  async mounted() {
    this.drawerHeight = document.body.clientHeight;
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
.drawerTitle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.75);
  text-align: left;
  z-index: 1;
}
</style>
