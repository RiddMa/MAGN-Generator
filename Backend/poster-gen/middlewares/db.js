const mongoose = require("mongoose");

// export function connect2Db(dbName) {
//   mongoose.connect(
//     `mongodb://localhost:27017/${dbName}`,
//     { useUnifiedTopology: true, useNewUrlParser: true },
//     () => console.log(`Successfully connected to ${dbName}`)
//   );
//   mongoose.connection.on("error", console.error);
// }

module.exports = {
  connect2Db(dbName) {
    mongoose.connect(
      `mongodb://localhost:27017/${dbName}`,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log(`Successfully connected to ${dbName}`)
    );
    mongoose.connection.on("error", console.error);
  },
};
