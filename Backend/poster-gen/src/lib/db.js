const mongoose = require("mongoose");
const {
  dbUser,
  dbPassword,
  dbDomain,
  dbPort,
  dbName,
} = require("../../config");

module.exports = {
  connect2Db() {
    let uri = `mongodb://${dbUser}:${dbPassword}@${dbDomain}:${dbPort}/${dbName}`;
    console.log(uri);
    mongoose.connect(
      uri,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      () => console.log(`Successfully connected to ${dbName}`)
    );
    mongoose.connection.on("error", console.error);
  },
};
