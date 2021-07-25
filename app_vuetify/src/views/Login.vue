<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="loginBase ma-auto">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="loginCard ma-4 pa-0 transition-swing"
                outlined
                :elevation="hover ? 12 : 6"
                :loading="loading"
              >
                <v-card-title>
                  <v-tabs v-model="tab" centered light>
                    <v-tab href="#tab-0" class="text-h6 text--primary">
                      登录
                    </v-tab>
                    <v-tab href="#tab-1" class="text-h6 text--primary">
                      注册
                    </v-tab>
                  </v-tabs>
                </v-card-title>
                <v-card-text>
                  <div class="mt-2 mx-4">
                    <v-text-field
                      class="text-body-2 text--primary"
                      v-model="username"
                      :rules="[rules.userRequired, rules.userMax64]"
                      type="text"
                      label="用户名"
                      placeholder="请输入用户名……"
                      :color="'#40ba83'"
                      counter
                      autofocus
                      clearable
                      validate-on-blur
                      :loading="loading"
                      :disabled="loading"
                      @keydown.enter="enterHandler"
                    ></v-text-field>
                    <v-text-field
                      class="text-body-2 text--primary"
                      v-model="password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.pwRequired, rules.pwMin8, rules.pwMax128]"
                      :type="showPassword ? 'text' : 'password'"
                      label="密码"
                      placeholder="请输入密码……"
                      hint="密码至少为8位"
                      :color="'#40ba83'"
                      counter
                      validate-on-blur
                      :loading="loading"
                      :disabled="loading"
                      @click:append="showPassword = !showPassword"
                      @keydown.enter="enterHandler"
                    ></v-text-field>
                  </div>

                  <v-tabs-items class="ma-0 pa-0" v-model="tab">
                    <v-tab-item :value="'tab-0'" :key="0">
                      <div class="mx-4 mb-4 mt-2">
                        <v-row class="ma-auto">
                          <v-hover>
                            <template v-slot:default="{ hover }">
                              <v-btn
                                class="text-body-1 mx-auto mt-4 mb-8"
                                block
                                light
                                large
                                color="primary"
                                :elevation="hover ? 6 : 2"
                                @click="handleLogin"
                                :loading="loading"
                                :disabled="isDisabled"
                              >
                                登录
                              </v-btn>
                            </template>
                          </v-hover>
                        </v-row>
                      </div>
                    </v-tab-item>
                    <v-tab-item :value="'tab-1'" :key="1">
                      <div class="mx-4 mb-4 mt-2">
                        <v-text-field
                          class="text-body-2 text--primary mb-4"
                          v-model="passwordCheck"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :rules="[rules.pwRequired, rules.pwCheck]"
                          :type="showPassword ? 'text' : 'password'"
                          label="确认密码"
                          placeholder="请再次输入密码……"
                          :color="'#40ba83'"
                          counter
                          validate-on-blur
                          :loading="loading"
                          :disabled="loading"
                          @click:append="showPassword = !showPassword"
                          @keydown.enter="enterHandler"
                        ></v-text-field>
                        <v-row class="mx-auto">
                          <v-hover>
                            <template v-slot:default="{ hover }">
                              <v-btn
                                class="text-body-1 mx-auto mt-4 mb-8"
                                block
                                light
                                large
                                color="primary"
                                :elevation="hover ? 6 : 2"
                                @click="handleRegister"
                                :loading="loading"
                                :disabled="isDisabled"
                              >
                                注册
                              </v-btn>
                            </template>
                          </v-hover>
                        </v-row>
                      </div>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      tab: 0,
      username: "",
      password: "",
      passwordCheck: "",
      showPassword: false,
      loading: false,
      rules: {
        userRequired: (v) => !!v || "用户名不能为空.",
        userMax64: (v) => v.length <= 64 || "用户名至多为64字符.",
        pwRequired: (v) => !!v || "密码不能为空.",
        pwCheck: (v) => v === this.password || "两次输入的密码应相同.",
        pwMin8: (v) => v.length >= 8 || "密码至少为8位.",
        pwMax128: (v) => v.length <= 128 || "密码至多为128位.",
      },
    };
  },
  computed: {
    isDisabled: {
      get() {
        let basic =
          this.rules.userRequired(this.username) !== true ||
          this.rules.userMax64(this.username) !== true ||
          this.rules.pwRequired(this.password) !== true ||
          this.rules.pwMin8(this.password) !== true ||
          this.rules.pwMax128(this.password) !== true;
        if (this.tab === "tab-0") {
          return basic;
        } else {
          return basic || this.rules.pwCheck(this.passwordCheck) !== true;
        }
      },
    },
  },
  methods: {
    enterHandler() {
      if (!this.isDisabled) {
        if (this.tab === "tab-0") {
          this.handleLogin();
        } else {
          this.handleRegister();
        }
      }
    },
    async handleLogin() {
      this.loading = true;
      this.$store.commit("setUsername", this.username);
      this.$store.commit("setMD5Password", this.password);
      let { status, data } = await this.$store.dispatch("userLogin", {
        username: this.$store.state.userStore.username,
        password: this.$store.state.userStore.password,
      });
      this.loading = false;
      if (status === 200) {
        this.$store.commit("showToast", {
          type: "success",
          message: "登陆成功.",
        });
        const preRoute = localStorage.getItem("preRoute");
        if (preRoute === null) {
          await this.$router.replace("/user");
        } else {
          await this.$router.replace(preRoute);
        }
        localStorage.setItem("username", this.username);
        await this.recoverStateHandler();
      } else if (status === 403) {
        if (data.message === "no-such-user") {
          this.$store.commit("showToast", {
            type: "error",
            message: "用户不存在.",
          });
        } else if (data.message === "wrong-password") {
          this.$store.commit("showToast", {
            type: "error",
            message: "密码错误.",
          });
        }
      }
    },
    async handleRegister() {
      this.loading = true;
      this.$store.commit("setUsername", this.username);
      this.$store.commit("setMD5Password", this.password);
      let { status, data } = await this.$store.dispatch("userRegister", {
        username: this.$store.state.userStore.username,
        password: this.$store.state.userStore.password,
      });
      this.loading = false;
      if (status === 200) {
        this.$store.commit("showToast", {
          type: "success",
          message: "注册并登陆成功.",
        });
        const preRoute = localStorage.getItem("preRoute");
        if (preRoute === null) {
          await this.$router.replace("/user");
        } else {
          await this.$router.replace(preRoute);
        }
        localStorage.setItem("username", this.username);
        await this.recoverStateHandler();
      } else if (status === 403) {
        if (data.message === "user-already-exist") {
          this.$store.commit("showToast", {
            type: "error",
            message: "用户名已占用.",
          });
        }
      }
    },
    async recoverStateHandler() {
      const msg = this.$store.state.pendingQueue[0];
      switch (msg) {
        case "saveUserReview": {
          await this.$store.dispatch("saveUserReview");
          this.$store.commit("popPendingQueue", "saveUserReview");
          break;
        }
        // case "getAllUserReview": {
        //   await this.$store.dispatch("getAllUserReview");
        //   this.$store.commit("popPendingQueue", "getAllUserReview");
        //   break;
        // }
      }
    },
  },
};
</script>

<style scoped>
.loginBase {
  max-width: 1024px;
}
.loginCard {
  border-color: #40ba83;
}
.activeTab {
  /*background-color: rgba(207, 255, 233, 0.2);*/
}
</style>
