const { splitArgs } = require("../utils");

module.exports = (api, options = {}) => {
  const service = api.service;
  const { build } = service.commands;
  const buildFn = build.fn;

  // add help
  build.opts.options["--page"] = "build the specified page entry";

  build.fn = (...args) => {
    const page = args[0].page;

    if (typeof page === "string") {
      const entries = splitArgs(page);

      const pages = entries.reduce((pageConfig, entryName) => {
        const rawEntry = options.pages[entryName];
        if (rawEntry) pageConfig[entryName] = rawEntry;
        return pageConfig;
      }, {});

      if (JSON.stringify(pages) !== "{}") {
        options.pages = pages;
      }
    }

    return buildFn(...args);
  };
};
