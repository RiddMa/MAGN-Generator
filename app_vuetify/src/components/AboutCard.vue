<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        v-if="fitPhone"
        class="aboutCard ma-0 pa-0 transition-swing"
        :elevation="hover ? 12 : 6"
        outlined
      >
        <v-card-title
          id="aboutTitle"
          class="primary--text text-h4 ma-auto pa-auto align-baseline"
        >
          {{ text[0] }}
          <v-spacer></v-spacer>
          <span class="text-body-1 body--text">{{ text[1] }}</span>
        </v-card-title>
        <v-card-text class="aboutText body--text ma-auto pa-auto">
          <p class="text-h6 secondary--text mx-0 mt-3 mb-1 pa-0">
            {{ text[2] }}
          </p>
          {{ text[3] }}<br />
          {{ text[4] }}<br />
          {{ text[5] }}
          <a
            href="https://en.wikipedia.org/wiki/Film_genre"
            rel="noopener"
            target="_blank"
            >维基百科
          </a>
          {{ text[6] }}<br />
          {{ text[7] }}<br />
          {{ text[8] }}<br />
          {{ text[9] }}<br />
          {{ text[10] }}
          <p class="text-h6 secondary--text mx-0 mt-3 mb-1 pa-0">
            {{ text[11] }}
          </p>
          {{ text[12] }}<br />
          {{ text[13] }}<br />
          {{ text[14] }}<br />
          {{ text[15] }}
          <p class="text-h6 secondary--text mx-0 mt-3 mb-1 pa-0">
            {{ text[16] }}
          </p>
          {{ text[17] }}
          <p class="text-h6 secondary--text mx-0 mt-3 mb-1 pa-0">
            {{ text[18] }}
          </p>
          <a
            href="https://github.com/RiddMa/MAGN-Generator"
            rel="noopener"
            target="_blank"
          >
            Github
          </a>
          <p class="text-h6 text-right mx-0 mt-3 mb-1 pa-0">
            ——Designed by Ridd.
          </p>
        </v-card-text>
      </v-card>
      <v-card
        v-else
        class="aboutCard ma-4 px-6 py-6 transition-swing"
        :elevation="hover ? 12 : 6"
        outlined
      >
        <v-card-title
          id="aboutTitle"
          class="primary--text text-h3 ma-auto pa-auto align-baseline"
        >
          {{ text[0] }}
          <v-spacer></v-spacer>
          <span class="text-body-1 body--text">{{ text[1] }}</span>
        </v-card-title>
        <v-card-text class="aboutText body--text ma-auto pa-auto">
          <p class="text-h6 secondary--text mx-0 mt-3 mb-1 pa-0">
            {{ text[2] }}
          </p>
          {{ text[3] }}<br />
          {{ text[4] }}<br />
          {{ text[5] }}
          <a
            href="https://en.wikipedia.org/wiki/Film_genre"
            rel="noopener"
            target="_blank"
            >维基百科
          </a>
          {{ text[6] }}<br />
          {{ text[7] }}<br />
          {{ text[8] }}<br />
          {{ text[9] }}<br />
          {{ text[10] }}
          <p class="text-h6 secondary--text mx-0 mt-3 mb-1 pa-0">
            {{ text[11] }}
          </p>
          {{ text[12] }}<br />
          {{ text[13] }}<br />
          {{ text[14] }}<br />
          {{ text[15] }}
          <p class="text-h6 secondary--text mx-0 mt-3 mb-1 pa-0">
            {{ text[16] }}
          </p>
          {{ text[17] }}
          <p class="text-h6 secondary--text mx-0 mt-3 mb-1 pa-0">
            {{ text[18] }}
          </p>
          <a
            href="https://github.com/RiddMa/MAGN-Generator"
            rel="noopener"
            target="_blank"
          >
            Github
          </a>
          <p class="text-h6 text-right mx-0 mt-3 mb-1 pa-0">
            ——Designed by Ridd.
          </p>
        </v-card-text>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "AboutCard",
  props: {
    fitPhone: {
      required: true,
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      text: [
        "MAG(N) 影评",
        "当前版本：v2.0.2",
        "使用指南",
        "①前往“新建”页面。",
        "②默认展示影评示例，点击“清空全部”按钮可以清空关于影片的所有信息。（包括影片本身信息及打分、评论）",
        "③在“信息”中填写影片英文标题、中文标题、年份，并在下方点选影片所属类型（影片分类参考了",
        "）。未来，将会加入在输入框直接进行豆瓣、IMDb搜索功能。",
        "④从四个维度，对影片进行评分。也可以在下方卡片，点击星星进行打分。评分维度参考了学院奖奖项设置。",
        "⑤信息填写完毕，在下方卡片，可以预览生成海报图片样式。",
        "⑥在卡片最下方输入框，输入影评内容。",
        "⑦点击”保存至云端“按钮存储数据到服务器。注：密码自输入开始全程加密存储，但影评相关数据并不会加密。",
        "目前实现的功能",
        "用户系统：注册/登录，同一浏览器自动记住登录，使用MD5+HTTPS+Scrypt-KDF+JsonWebToken实现。",
        "影评系统：填写电影信息，从四个维度进行0-10星评分并撰写评价，对信息及评价进行展示。在用户界面，显示所有影评的列表并能选择某个影评进行增删查改。",
        "图片生成：服务端渲染生成分享截图。（优化中，已开放测试版）",
        "待完成：界面动效优化，用户数据搜索展示优化，豆瓣IMDb关联搜索，二刷/多刷记录功能。",
        "用途？",
        "记录个人观影进度，并生成高质量的分享图片供发朋友圈使用。",
        "相关链接",
      ],
    };
  },
};
</script>

<style scoped>
.aboutCard {
  border-color: var(--v-primary-base);
  border-width: 2px;
}
</style>
