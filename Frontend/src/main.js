import App from "./App.vue";
import { createApp } from "vue";
import router from "./lib/router";
import store from "./store/store";
import {
  Layout,
  Button,
  Card,
  Col,
  Checkbox,
  Row,
  Input,
  InputNumber,
  Tag,
  Rate,
  Space,
  Collapse,
  Typography,
  BackTop,
  Form,
  message,
  Spin,
} from "ant-design-vue";

const app = createApp(App);
app.config.productionTip = false;
app.use(Layout);
app.use(Button);
app.use(Input);
app.use(InputNumber);
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
app.use(Form);
app.use(Spin);
app.use(store).use(router).mount("#app");
message.config({
  top: `60px`,
  duration: 2,
  maxCount: 5,
});
