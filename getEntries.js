const path = require("path");
const glob = require("glob");

module.exports = function (entryFile, callback) {
  const entryFiles = glob.sync(entryFile);
  return entryFiles.reduce((entries, entry) => {
    const entryFileDir = path.dirname(entry);
    const entryName = path.basename(entryFileDir);
    const userPageOptions = callback && callback(entry, entryName);
    entries[entryName] = {
      entry: entry,
      template: path.resolve(entryFileDir, "./index.html"),
      ...userPageOptions,
    };
    return entries;
  }, {});
};
