const webpack = require("webpack");
const [
  webpackClientConfig,
  webpackServerConfig,
] = require("../cfg/webpack.config");

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

// Client
const express = require("express");
const nodemon = require("nodemon");
const path = require("path");

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(
  webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
    stats: "errors-only",
  })
);

hmrServer.use(
  webpackHotMiddleware(clientCompiler, {
    path: "/static/__webpack_hmr",
  })
);

hmrServer.listen(3001, () => {
  console.log("Hmr Server successfully started");
});

// Server
compiler = webpack(webpackServerConfig);

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
    watch: path.resolve(__dirname, "../dist/server/"),
    delay: 1000,
  });
});
