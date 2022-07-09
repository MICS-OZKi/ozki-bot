/** @type {import('next').NextConfig} */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(
              __dirname,
              "node_modules/ozki-toolkit/dist/proof-generator/static/"
            ),
            to: path.resolve(__dirname, "public/generator/"),
          },
          {
            from: path.resolve(
              __dirname,
              "node_modules/ozki-toolkit/dist/proof-verifier/static/"
            ),
            to: path.resolve(__dirname, "public/verifier/"),
          },
        ],
      })
    );
    return config;
  },
};

module.exports = nextConfig;
