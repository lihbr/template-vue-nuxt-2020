const { resolve } = require("path");

/* covered by nuxt */
const { urlJoin } = require("@nuxt/common");

const logger = require("./logger");
const { build, serve, generate } = require("./hooks");

const DEFAULTS = {
  entry: "./cms/index.js",
  outputName: "index.js",
  outputDir: "_adminBundle/"
};

const createWebpackConfig = (name, nuxtOptions, moduleConfig) => {
  const BUILD_MODE =
    process.env.NODE_ENV === "production" ? "production" : "development";

  const ENTRY = moduleConfig.entry;

  const BUILD_DIR = moduleConfig.fsPath;
  const FILE_NAME = moduleConfig.outputName;
  const CHUNK_FILENAME = nuxtOptions.build.filenames.chunk({
    isDev: nuxtOptions.dev,
    isModern: nuxtOptions.modern
  });
  const PUBLIC_PATH = urlJoin(nuxtOptions.router.base, moduleConfig.outputDir);

  const config = {
    name,
    mode: BUILD_MODE,
    entry: {
      app: ENTRY
    },
    output: {
      path: BUILD_DIR,
      filename: FILE_NAME,
      chunkFilename: CHUNK_FILENAME,
      publicPath: PUBLIC_PATH
    },
    plugins: []
  };

  return config;
};

const getConfig = (nuxtOptions, moduleOptions) => {
  const config = { ...DEFAULTS, ...moduleOptions };
  config.outputDir = config.outputDir.replace(/\/?$/, "/").replace(/^\/?/, "");
  config.fsPath = resolve(
    nuxtOptions.buildDir,
    "dist",
    config.outputDir
  ).replace(/\/$/, "");

  return config;
};

module.exports = function(moduleOptions) {
  const config = getConfig(this.options, moduleOptions);

  build.call(this, config, createWebpackConfig);
  serve.call(this, config);
  generate.call(this, config);

  logger.info("Netlify CMS config:\n", config);
  logger.success("Netlify CMS module initialized\n");
};
