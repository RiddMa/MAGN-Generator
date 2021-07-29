# MAGN-Generator

MAGN影评

## 前端 Frontend

Vue.js2+Vuetify。

```bash
npm install
npm run dev
#or
npm run build
```

## 后端 Backend

Node.js+Koa2+MongoDB。

### 配置 Configuration

新建/src/config.js：

```javascript
module.exports = {
    port: "Your Backend Listen Port",
    dbUser: "Your DB User",
    dbPassword: "Your DB Password",
    dbDomain: "Your DB Address",
    dbPort: "Your DB Port",
    dbName: "Your DB Name",
    tokenSecret: "Your Token Secret",
    rootDir: __dirname,
};
```

```bash
npm install
node ~/src/app.js
#or
pm2 start ~/src/app.js --watch
```

