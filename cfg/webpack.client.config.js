const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TimeFixPlugin = require("time-fix-plugin");
const webpack = require("webpack");

const NODE_ENV = process.env.NODE_ENV ?? "development";
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";

function setupDevTool() {
  if (IS_DEV) return "source-map";
  if (IS_PROD) return false;
}

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", "..."],
  },
  mode: NODE_ENV,
  entry: [
    path.resolve(__dirname, "../src/client/index.jsx"),
    "webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr",
  ],
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "client.js",
    publicPath: "/static/",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                IS_DEV && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    IS_DEV && new TimeFixPlugin(),
    IS_DEV && new HotModuleReplacementPlugin(),
    IS_DEV && new CleanWebpackPlugin(),
    IS_DEV &&
      new ReactRefreshWebpackPlugin({
        overlay: {
          sockIntegration: "whm",
        },
        // exclude: /dist/,
      }),
  ].filter(Boolean),
  devtool: setupDevTool(),
};
