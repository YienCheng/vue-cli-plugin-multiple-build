// split command line arguments
exports.splitArgs = (value) => {
  if (!value) return [];
  return value.split(",");
};

// service register
exports.getServiceRegister = (api, options) => {
  return function (command) {
    command(api, options);
  };
};
