const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  target: "web",
  module: {
    // The old rules were not effective for how assets are loaded.
    // CopyPlugin is the correct approach for this project.
    rules: [],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "node_modules/deepar", to: "deepar-resources" },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@effects': path.resolve(__dirname, 'public/effects/'),
    },
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 10000000,
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "public"),
      },
      {
        directory: path.join(__dirname, "node_modules/deepar"),
        publicPath: "/deepar-resources",
      },
    ],
    compress: true,
    port: 8888, // Aligned port with package.json script and README
  },
};
