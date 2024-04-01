const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    popup: "./src/popup/popup.ts",
    background: "./src/background.ts",
    tags: "./src/scripts/tags.ts",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: (chunkData) => {
      switch (chunkData.chunk.name) {
        case "popup":
          return "popup/popup.js";
        case "background":
          return "background.js";
        case "tags":
          return "scripts/tags.js";
        default:
          return "[name].js";
      }
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: ".", to: ".", context: "public" },
        { from: "./src/popup/popup.html", to: "popup/popup.html" },
      ],
    }),
  ],
  optimization: {
    minimize: false,
  },
};
