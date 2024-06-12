const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const process = require("process");
const CopyPlugin = require("copy-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: argv.mode == "production"? "/app3/": "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4204,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  // set web for live reload, post that can be reverted to es2020
  //target: "es2020",
  target: argv.mode == "production"? "es2020": "web",
  experiments: {
    outputModule: true,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app3",
      library: { type: "module" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "/app3/App3": "./src/modules/app3/app3",
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router": {
          singleton: true,
          requiredVersion: deps["react-router"],
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'assets'), to: path.resolve(__dirname, 'dist', 'assets') },
        { from: path.resolve(__dirname, 'src', 'favicon.ico'), to: path.resolve(__dirname, 'dist', 'favicon.ico') },
      ],
    }),
    new HtmlWebPackPlugin({
      template: "./index.ejs",
      inject: false,
      baseUrl: argv.mode == "production"? "/app3/": "/",
    }),
    new Dotenv(),
  ],
});
