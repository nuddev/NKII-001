const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  console.log( `./environments/.env${env.mode ? `.${env.mode}` : ""}`)
  return {
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: resolve(__dirname, "dist"),
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["babel-preset-env", "babel-preset-react"],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader", // translates CSS into CommonJS
            },
            {
              loader: "less-loader", // compiles Less to CSS
              options: {
                lessOptions: {
                  modifyVars: {},
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
      new Dotenv({
        path: `./environments/.env${env.mode ? `.${env.mode}` : ""}`,
      }),
    ],
    devServer: {
      hot: true,
      historyApiFallback: true,
    },
  }
};
