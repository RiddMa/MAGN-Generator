<template>
  <div class="about">
    <v-row class="toImage" id="toImage" ref="toImage">
      <!--      <v-col flex="auto"></v-col>-->
      <v-col>
        <v-card class="aboutCard" elevation="2" outlined>
          <v-card-text>
            <!--            <h1 class="awesomeTitle">MAG(N) 影评</h1>-->
            <!--            <h2 class="aboutTitle">当前版本：v1.0.1</h2>-->
            <p class="awesomeTitle text-h3">MAG(N) 影评</p>
            <p class="aboutTitle text-h4">当前版本：v1.0.1</p>
          </v-card-text>

          <v-typography-paragraph class="aboutText">
            目前实现的功能<br />
            用户系统：注册/登录，同一浏览器自动记住登录，使用MD5+https+Scrypt-KDF+JsonWebToken实现。<br />
            影评系统：填写电影英文标题、中文标题、年份；选择电影类型；从四个维度进行0-10星评分，计算平均分并显示评分雷达图。<br />
            图片生成：服务端渲染生成分享截图图。<br />
            待完成：用户数据搜索，影评记录增删查改，豆瓣IMDb关联搜索。
          </v-typography-paragraph>
          <v-typography-title class="aboutTitle" :level="2"
            >用途？
          </v-typography-title>
          <v-typography-paragraph class="aboutText">
            记录个人观影进度，并生成高质量的海报图片供发朋友圈使用。
          </v-typography-paragraph>
          <v-typography-title class="aboutTitle" :level="2"
            >使用指南
          </v-typography-title>
          <v-typography-paragraph class="aboutText">
            前往“Home”页面。<br />
            在“选项”中填写影片英文标题、中文标题、年份，并在下方勾选影片所属类型。（影片分类参考了
            <v-typography-link
              href="https://en.wikipedia.org/wiki/Film_genre"
              rel="noopener"
              target="_blank"
              >维基百科
            </v-typography-link>
            ）<br />
            点击“清空全部”按钮可以清空关于影片的所有信息。（包括影片本身信息及打分、评论）<br />
            在下方卡片，可以预览生成海报图片样式。<br />
            从四个维度，点击星星来进行打分（评分维度参考了学院奖奖项设置）。<br />
            在最下方输入框，输入影评内容。
          </v-typography-paragraph>
          <v-typography-title class="aboutTitle" :level="2">
            相关链接
          </v-typography-title>
          <v-typography-paragraph class="aboutText">
            <v-typography-link
              href="https://github.com/RiddMa/MAGN-Generator"
              rel="noopener"
              target="_blank"
            >
              Github
            </v-typography-link>
          </v-typography-paragraph>
          <v-typography-title class="awesomeSubTitle" :level="2">
            ——Designed by Ridd.
          </v-typography-title>
        </v-card>
      </v-col>
      <!--      <v-col flex="auto"></v-col>-->
    </v-row>
  </div>
</template>
<script></script>
<style scoped>
.aboutCard {
  margin: 2em;
  border-color: rgba(66, 185, 131, 0.5);
}
.awesomeTitle {
  text-align: start;
  vertical-align: center;
  color: #40ba83;
}
.awesomeSubTitle {
  text-align: end;
  vertical-align: center;
  color: #40ba83;
}
.aboutText {
  font-size: 16px;
  text-align: start;
  alignment: left;
}
.aboutTitle {
  text-align: start;
  alignment: left;
}
</style>
