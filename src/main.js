import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import store from "./store";
import {
  Layout,
  Button,
  Card,
  Col,
  Checkbox,
  Row,
  Input,
  Tag,
  Rate,
  Space,
  Collapse,
  Typography,
  BackTop,
} from "ant-design-vue";

const app = createApp(App);
app.config.productionTip = false;
app.use(Layout);
app.use(Button);
app.use(Input);
app.use(Card);
app.use(Checkbox);
app.use(Col);
app.use(Row);
app.use(Tag);
app.use(Rate);
app.use(Space);
app.use(Collapse);
app.use(Typography);
app.use(BackTop);
app.use(store).use(router).mount("#app");
