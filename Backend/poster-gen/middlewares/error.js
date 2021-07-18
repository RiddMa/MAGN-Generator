module.exports = {
  APIError: {
    User: {
      noUser: () => {
        return { type: "User", message: "no-such-user" };
      },
      userExist: () => {
        return { type: "User", message: "user-already-exist" };
      },
      wrongPassword: () => {
        return { type: "User", message: "wrong-password" };
      },
    },
    Database: {
      general: () => {
        return { type: "Database", message: "database-error" };
      },
    },
  },
};
