const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { i18n } = require("./next-i18next.config");

module.exports = withPlugins([[withBundleAnalyzer]], {
  images: {
    domains: ["picsum.photos"],
  },
  i18n,
});
