const webpack = require('webpack');
const webpackConfig = require("../cfg/webpack.config");
const nodemon = require("nodemon");
const path = require("path");

compiler = webpack(webpackConfig);

compiler.run((err) => {
  if (err) {
    console.error("Compilation failed: ", err);
  }

  compiler.watch({}, (err) => {
    if (err) {
      console.error("Compilation failed: ", err);
    }
    console.log("Compilation was successfully");
  });

  nodemon({
    script: path.resolve(__dirname, "../dist/server/server.js"),
    watch: [
      path.resolve(__dirname, "../dist/server"),
      path.resolve(__dirname, "../dist/client"),
    ],
  });
});
