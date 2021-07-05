import { createApp } from "vue";
import Vue from "vue";
import { ref, reactive } from "vue";
import router from "./router";
import store from "./store";
import html2canvas from "html2canvas";
import { downloadImage } from "@/Util";
import {
  Layout,
  Button,
  Spin,
  Result,
  Card,
  Divider,
  Col,
  Row,
  Drawer,
  Table,
  Form,
  InputNumber,
  Tag,
  Rate,
  Space,
  Input,
  Collapse,
  Typography,
} from "ant-design-vue";
import App from "./App.vue";

const app = createApp(App);
// app.config.productionTip = false;
app.use(Layout);
app.use(Button);
app.use(Spin);
app.use(Result);
app.use(Card);
app.use(Divider);
app.use(Col);
app.use(Row);
app.use(Drawer);
app.use(Table);
app.use(Form);
app.use(InputNumber);
app.use(Tag);
app.use(Rate);
app.use(Space);
app.use(Input);
app.use(Collapse);
app.use(Typography);
app.use(store).use(router).mount("#app");
