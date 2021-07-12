module.exports = {
  APIError: function (code, message) {
    code = code || "Internal: unknown error";
    message = message || "";
    return { code, message };
  },
};
