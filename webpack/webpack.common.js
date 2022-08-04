const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isEVNDevelopment = process.env.NODE_ENV === "development" ? true : false;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]-[contenthash:8].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.css$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          isEVNDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
    new MiniCssExtractPlugin(),
  ],
};
