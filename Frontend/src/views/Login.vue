<template>
  <div>
    <a-switch v-model:checked="register"></a-switch>
    <a-form
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
          :disabled="formState.username === '' || formState.password === ''"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <a-form
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
          :disabled="formState.username === '' || formState.password === ''"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Form, Switch } from "ant-design-vue";
import { ref, reactive } from "vue";
import { useStore } from "vuex";

export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
    "a-switch": Switch,
    "a-form": Form,
    "a-form-item": Form.Item,
  },
  setup() {
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

    const store = useStore(); // 使用useStore方法
    console.log(store);

    const handleLogin = async (values) => {
      store.commit("setUsername", values.username);
      store.commit("setMD5Password", values.password);
      let { status, data } = await store.dispatch("userLogin");
      if (status === 200) {
      } else {
      }
    };

    const handleRegister = async (values) => {
      await store.commit("setUsername", values.username);
      await store.commit("setMD5Password", values.password);
      await store.dispatch("userRegister", {
        username: store.state.userStore.username,
        password: store.state.userStore.password,
      });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      register,
      formState,
      formRef,
      rules,
      layout,
      handleRegister: handleRegister,
      handleLogin: handleLogin,
      resetForm,
    };
  },
  // data() {
  //   return {
  //     validateUsername: async (rule, value) => {
  //       if (value === "") {
  //         return Promise.reject("用户名不能为空");
  //       } else {
  //         if (this.formState.username !== "") {
  //           await this.formRef.validateField("username");
  //         }
  //
  //         return Promise.resolve();
  //       }
  //     },
  //     validatePassword: async (rule, value) => {
  //       if (value === "") {
  //         return Promise.reject("Please input the password");
  //       } else {
  //         if (this.formState.password !== "") {
  //           await this.formRef.validateField("password");
  //         }
  //
  //         return Promise.resolve();
  //       }
  //     },
  //     rules: {
  //       username: [
  //         {
  //           required: true,
  //           validator: this.validateUsername,
  //           trigger: "change",
  //         },
  //       ],
  //       password: [
  //         {
  //           required: true,
  //           validator: this.validatePassword,
  //           trigger: "change",
  //         },
  //       ],
  //     },
  //   };
  // },
  // computed: {
  //   username: {
  //     get() {
  //       return this.$store.state.userStore.username;
  //     },
  //     set(username) {
  //       this.$store.commit("setUsername", username);
  //     },
  //   },
  //   password: {
  //     get() {
  //       return this.$store.state.userStore.password;
  //     },
  //     set(password) {
  //       this.$store.commit("setPassword", password);
  //     },
  //   },
  //   formState() {
  //     return { username: this.username, password: this.password };
  //   },
  // },
  // methods: {
  //   handleLogin() {
  //     this.$store.commit("setMD5Password", this.password);
  //   },
  //   handleRegister() {},
  // },
};
</script>

<style scoped></style>
