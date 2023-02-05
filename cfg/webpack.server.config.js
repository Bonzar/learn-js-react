const path = require("path");
const nodeExternals = require("webpack-node-externals");

const NODE_ENV = process.env.NODE_ENV ?? "development";

module.exports = {
  target: "node",
  mode: NODE_ENV,
  entry: path.resolve(__dirname, "../src/server/server.js"),
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", "..."],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ["babel-loader"],
      },
    ],
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
};
