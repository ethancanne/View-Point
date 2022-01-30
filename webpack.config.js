const HTMLWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");
const Configuration = require("./Configuration.js");

let webpackConfiguration = {
  entry: Path.join(__dirname, "client", "src", "index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: Path.join(__dirname, "client", "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: Path.join(__dirname, "client", "public", "index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: Path.join(__dirname, "client", "public"),
    },
    historyApiFallback: true,
    port: 3000,
    proxy: {
      "/api": `http://localhost:${Configuration.getServerPort()}`,
    },
  },
};

const applicationIsInDevelopment = !Configuration.isSetToProduction();
if (applicationIsInDevelopment) {
  webpackConfiguration.devtool = "inline-source-map";
}

module.exports = webpackConfiguration;
