const path = require("path");
const nodeExternals = require("webpack-node-externals");

const NODE_ENV = process.env.NODE_ENV ?? "development";
const GLOBAL_CSS_REGEXP = /\.global\.css$/


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
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
                exportOnlyLocals: true,
              },
            },
          },
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ["css-loader"]
      },
      {
        test: /\.svg/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  externals: [nodeExternals({allowlist: 'the-new-css-reset/css/reset.css'})],
  optimization: {
    minimize: false,
  },
};
