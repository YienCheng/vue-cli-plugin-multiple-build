// split command line arguments
const splitArgs = (value) => {
  if (!value) return [];
  return value.split(",");
};

// overwrite command
const overwriteCommand = (api, options, command) => {
  const service = api.service;
  const cmd = service.commands[command];
  const fn = cmd.fn;

  cmd.opts.options["--page"] = `${command} the specified page entry`;

  cmd.fn = (args, rawArgs) => {
    const page = args.page;
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
    return fn(args, rawArgs);
  };
};

module.exports = {
  splitArgs,
  overwriteCommand
};
