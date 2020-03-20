const path = require("path");
const md5 = require("md5");
const defaultsDeep = require("lodash/defaultsDeep");

// Covered by nuxt
const { copy, outputJSONSync } = require("fs-extra");
const serveStatic = require("serve-static");

const logger = require("./logger");

module.exports = async function(moduleOptions) {
  /**
   * Options
   */
  const options = defaultsDeep(moduleOptions, {
    payloadCacheBasedir: "/cache"
  });

  /**
   * Checks
   */
  if (!this.options.generate) {
    return logger.fatal(
      // eslint-disable-next-line
      "\"generate\" object is not defined in \"nuxt.config.js\", disabling module"
    );
  } else if (!this.options.generate.routes) {
    return logger.fatal(
      // eslint-disable-next-line
      "\"generate.routes\" array is not defined in \"nuxt.config.js\", disabling module"
    );
  }

  if (!this.options.generate.fallback) {
    logger.warn(
      // eslint-disable-next-line
      "\"generate.fallback\" should most likely be set to \"true\" for production"
    );
  }

  /**
   * Config
   */
  const hash = md5(new String(Date.now()));
  const payloadCacheDir = path.join(options.payloadCacheBasedir, hash);
  const posixPayloadCacheDir = path.posix.join(
    options.payloadCacheBasedir,
    hash
  );

  /**
   * Plugin
   */
  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    fileName: "pagePayload.js",
    options: {
      base: path.posix.join("/", posixPayloadCacheDir)
    }
  });

  /**
   * Hooks
   */

  // Creating cache file on build
  this.nuxt.hook("build:extendRoutes", async () => {
    await Promise.all(
      this.options.generate.routes.map(maybeRoute => {
        if (typeof maybeRoute === "object") {
          const { route, payload } = maybeRoute;
          const url = path.posix.join(
            this.options.buildDir,
            posixPayloadCacheDir,
            route,
            "index.json"
          );

          return outputJSONSync(url, payload);
        }
      })
    );
    logger.success("Payloads cache files saved");
  });

  // Copy cache file to dist when generating
  this.nuxt.hook("generate:distCopied", async nuxt => {
    await copy(
      path.join(this.options.buildDir, payloadCacheDir),
      path.join(nuxt.distPath, payloadCacheDir)
    );

    logger.success("Payloads files copied");
  });

  // Serve cache file while developing
  if (this.options.dev) {
    this.addServerMiddleware({
      path: posixPayloadCacheDir,
      handler: serveStatic(
        path.posix.join(this.options.buildDir, posixPayloadCacheDir),
        {
          setHeaders: (res, path) => {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
          }
        }
      )
    });
  }

  logger.success("Cache module initialized\n");
};
