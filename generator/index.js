const chalk = require("chalk");

module.exports = (api, options = {}) => {
  if (options.addExample) {
    // render template
    api.render("./template");
  }

  console.log(
    chalk.yellow(
      `
        💡Tip: You can easy to configuration pages in your ${chalk.green(
          "vue.config.js"
        )} as example:
        
        const getEntries = require("vue-cli-plugin-multiple-build/getEntries");
        const path = require("path");
        
        module.exports = {
          pages: getEntries(
            path.resolve(__dirname, "./src/pages/*/main.js"),
            (entry, entryName) => ({
              title: entryName,
            })
          ),
          // ...your other configuration
        };
      `
    )
  );
};
