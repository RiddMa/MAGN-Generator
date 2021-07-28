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
    mongoose.connect(
      `mongodb://${dbUser}:${dbPassword}@${dbDomain}:${dbPort}/${dbName}`,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log(`Successfully connected to ${dbName}`)
    );
    mongoose.connection.on("error", console.error);
  },
};
