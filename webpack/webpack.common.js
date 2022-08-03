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
        use: [
          isEVNDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            // css兼容性处理
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      autoprefixer: {
                        flexbox: "no-2009",
                      },
                      stage: 3,
                    },
                  ],
                ],
              },
            },
          },
        ],
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
