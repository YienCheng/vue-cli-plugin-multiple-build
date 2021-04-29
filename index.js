const { getServiceRegister } = require("./lib/utils");
const build = require("./lib/commands/build");

module.exports = (api, options = {}) => {
  // service register
  const serviceRegister = getServiceRegister(api, options);

  // register build
  serviceRegister(build);
};
