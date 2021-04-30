const { overwriteCommand } = require("./lib/utils");

module.exports = (api, options = {}) => {
  overwriteCommand(api, options, "build");

  overwriteCommand(api, options, "serve");
};
