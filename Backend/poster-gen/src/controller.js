const Fs = require("fs");

function addMapping(router, mapping) {
  let path;
  for (let url in mapping) {
    if (url.startsWith("GET ")) {
      path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`Registered URL mapping: GET ${path}`);
    } else if (url.startsWith("POST ")) {
      path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`Registered URL mapping: POST ${path}`);
    } else {
      console.log(`Invalid URL: ${url}`);
    }
  }
}

function addControllers(router) {
  let files = Fs.readdirSync(__dirname + `/controllers`);
  let jsFiles = files.filter((f) => {
    return f.endsWith(".js");
  });
  for (let f of jsFiles) {
    console.log(`Processing controller: ${f}`);
    let mapping = require(__dirname + `/controllers/` + f);
    addMapping(router, mapping);
  }
}

module.exports = function (dir) {
  let controllersDir = dir || `controllers`,
    router = require("koa-router")();
  addControllers(router, controllersDir);
  return router.routes();
};
