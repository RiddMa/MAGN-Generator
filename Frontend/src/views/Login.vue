<template>
  <div>
    <a-card class="loginCard">
      <Spin :spinning="spinning" :delay="250">
        <Row class="loginRow">
          <Col flex="auto"></Col>
          <Col :span="24">
            <Space>
              登录
              <Switch v-model:checked="register"></Switch>
              注册
            </Space>
          </Col>
          <Col flex="auto"></Col>
        </Row>
        <Row class="loginRow">
          <Col flex="auto"></Col>
          <Col>
            <Form
              class="loginForm"
              v-if="!register"
              layout="inline"
              ref="formRef"
              :model="formState"
              v-bind="layout"
              @finish="handleLogin"
            >
              <a-form-item has-feedback name="username">
                <a-input
                  v-model:value="formState.username"
                  placeholder="请输入用户名……"
                >
                  <template #prefix><UserOutlined /></template>
                </a-input>
              </a-form-item>
              <a-form-item has-feedback name="password">
                <a-input
                  v-model:value="formState.password"
                  type="password"
                  placeholder="请输入密码……"
                  autocomplete="off"
                >
                  <template #prefix><LockOutlined /></template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  :disabled="
                    formState.username === '' || formState.password === ''
                  "
                >
                  登录
                </a-button>
              </a-form-item>
            </Form>
            <Form
              class="loginForm"
              v-if="register"
              layout="inline"
              ref="formRef"
              :model="formState"
              :rules="rules"
              v-bind="layout"
              @finish="handleRegister"
            >
              <a-form-item has-feedback name="username">
                <a-input
                  v-model:value="formState.username"
                  placeholder="请输入用户名……"
                >
                  <template #prefix><UserOutlined /></template>
                </a-input>
              </a-form-item>
              <a-form-item has-feedback name="password">
                <a-input
                  v-model:value="formState.password"
                  type="password"
                  placeholder="请输入密码……"
                  autocomplete="off"
                >
                  <template #prefix><LockOutlined /></template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  :disabled="
                    formState.username === '' || formState.password === ''
                  "
                >
                  注册
                </a-button>
              </a-form-item>
            </Form>
          </Col>
          <Col flex="auto"></Col>
        </Row>
      </Spin>
    </a-card>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Space, Form, Switch, Row, Col, Spin, message } from "ant-design-vue";
import { ref, reactive } from "vue";

export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
    Space,
    Switch,
    Form,
    Row,
    Col,
    Spin,
  },
  setup() {
    const spinning = ref(false);
    const formRef = ref();
    const formState = reactive({
      username: "",
      password: "",
    });
    const register = ref(false);

    let validatePassword = async (rule, value) => {
      if (value.length < 6) {
        return Promise.reject("密码至少为6位");
      } else {
        return Promise.resolve();
      }
    };

    let validateUsername = async (rule, value) => {
      if (value === "") {
        return Promise.reject("用户名不能为空");
      } else if (value.length > 20) {
        return Promise.reject("用户名至多为20字符");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      username: [
        {
          required: true,
          validator: validateUsername,
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          validator: validatePassword,
          trigger: "blur",
        },
      ],
    };
    const layout = {
      // labelCol: {
      //   span: 4,
      // },
      // wrapperCol: {
      //   span: 14,
      // },
    };

    return {
      spinning,
      register,
      formState,
      formRef,
      rules,
      layout,
    };
  },
  methods: {
    async handleLogin(values) {
      this.spinning = true;
      this.$store.commit("setUsername", values.username);
      this.$store.commit("setMD5Password", values.password);
      let { status, data } = await this.$store.dispatch("userLogin", {
        username: this.$store.state.userStore.username,
        password: this.$store.state.userStore.password,
      });
      if (status === 200) {
        const preRoute = localStorage.getItem("preRoute");
        if (preRoute === null) {
          await this.$router.replace("/user");
        } else {
          await this.$router.replace(preRoute);
        }
      } else if (status === 403) {
        if (data.message === "no-such-user") {
          message.error("用户不存在");
        } else if (data.message === "wrong-password") {
          message.error("密码不正确");
        }
      }
      this.spinning = false;
    },

    async handleRegister(values) {
      await this.$store.commit("setUsername", values.username);
      await this.$store.commit("setMD5Password", values.password);
      await this.$store.dispatch("userRegister", {
        username: this.$store.state.userStore.username,
        password: this.$store.state.userStore.password,
      });
    },
  },
};
</script>

<style scoped>
.loginCard {
  border-color: rgba(66, 185, 131, 0.5);
  margin: 1rem 4vw;
}
.loginRow {
  margin: 1rem 2vw;
  display: flex;
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
  alignment: center;
  align-content: center;
  align-self: center;
}
.loginForm {
  width: 100%;
  text-align: center;
}
</style>
