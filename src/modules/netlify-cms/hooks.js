const { join } = require("path");

/* covered by nuxt */
const { copy } = require("fs-extra");
const _ = require("lodash");
const { r } = require("@nuxt/common");
const chokidar = require("chokidar");
const env = require("std-env");
const pify = require("pify");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const WebpackBar = require("webpackbar");
const serveStatic = require("serve-static");

const logger = require("./logger");

const WEBPACK_CLIENT_COMPILER_NAME = "client";
const WEBPACK_NETLIFY_COMPILER_NAME = "netlify-cms";

module.exports = {
  // Handle webpack build
  build(config, createWebpackConfig) {
    this.nuxt.hook("build:before", builder => {
      const bundleBuilder = builder.bundleBuilder;

      const webpackConfig = createWebpackConfig(
        WEBPACK_NETLIFY_COMPILER_NAME,
        this.options,
        config
      );

      webpackConfig.plugins.push(
        new WebpackBar({
          name: WEBPACK_NETLIFY_COMPILER_NAME,
          color: "#00ad9f",
          reporters: ["basic", "fancy", "profile", "stats"],
          basic: !this.options.build.quiet && env.minimalCLI,
          fancy: !this.options.build.quiet && !env.minimalCLI,
          profile: !this.options.build.quiet && this.options.build.profile,
          stats:
            !this.options.build.quiet &&
            !this.options.dev &&
            this.options.build.stats,
          reporter: {
            change: (_, { shortPath }) => {
              this.nuxt.callHook("bundler:change", shortPath);
            },
            done: context => {
              if (context.hasErrors) {
                this.nuxt.callHook("bundler:error");
              }
            },
            allDone: () => {
              this.nuxt.callHook("bundler:done");
            }
          }
        })
      );

      const netlifyCompiler = webpack(webpackConfig);

      // Before webpack compiler starts
      this.nuxt.hook("build:compile", ({ name }) => {
        if (name !== WEBPACK_CLIENT_COMPILER_NAME) {
          return;
        }

        logger.success("Netlify-cms builder initialized");

        if (this.options.dev) {
          // Use shared filesystem and cache
          netlifyCompiler.outputFileSystem = bundleBuilder.mfs;

          // Create webpack dev middleware
          const netlifyWebpackDevMiddleware = pify(
            webpackDevMiddleware(netlifyCompiler, {
              publicPath: "/",
              stats: false,
              logLevel: "silent",
              watchOptions: this.options.watchers.webpack
            })
          );
          netlifyWebpackDevMiddleware.close = pify(
            netlifyWebpackDevMiddleware.close
          );

          // Create webpack hot middleware
          const netlifyWebpackHotMiddleware = pify(
            webpackHotMiddleware(netlifyCompiler, {
              log: false,
              heartbeat: 1000
            })
          );

          // Inject to renderer instance
          if (builder.nuxt.renderer) {
            builder.nuxt.renderer.netlifyWebpackDevMiddleware = netlifyWebpackDevMiddleware;
            builder.nuxt.renderer.netlifyWebpackHotMiddleware = netlifyWebpackHotMiddleware;
          }

          // Stop webpack middleware on nuxt.close()
          this.nuxt.hook("close", async () => {
            await this.nuxt.renderer.netlifyWebpackDevMiddleware.close();
          });
        } else {
          // Only run the compiler in production,
          // in dev build is started by dev-middleware hooked to client webpack compiler
          this.nuxt.hook("build:done", async () => {
            await new Promise((resolve, reject) => {
              netlifyCompiler.run((err, stats) => {
                /* istanbul ignore next */
                if (err) {
                  return reject(err);
                } else if (stats.hasErrors()) {
                  if (this.options.test) {
                    err = stats.toString(this.options.build.stats);
                  }
                  return reject(err);
                }
                resolve();
              });
            });
          });
        }
      });
    });
  },

  // Handle serving build
  serve(config) {
    if (this.options.dev) {
      // Insert webpackDevMiddleware to serve netlify CMS in development
      this.addServerMiddleware({
        path: config.outputDir,
        handler: async (req, res) => {
          if (this.nuxt.renderer.netlifyWebpackDevMiddleware) {
            await this.nuxt.renderer.netlifyWebpackDevMiddleware(req, res);
          }
          if (this.nuxt.renderer.netlifyWebpackHotMiddleware) {
            await this.nuxt.renderer.netlifyWebpackHotMiddleware(req, res);
          }
        }
      });

      // Start watching config file
      const patterns = [r(config.entry)];

      const options = {
        ...this.options.watchers.chokidar,
        ignoreInitial: true
      };

      const refreshFiles = _.debounce(() => {
        require(config.entry);
        this.nuxt.renderer.netlifyWebpackDevMiddleware.invalidate();
        this.nuxt.renderer.netlifyWebpackHotMiddleware.publish({
          action: "reload"
        });

        logger.info("Netlify-cms files refreshed");
      }, 200);

      // Watch for src Files
      const fileWatcher = chokidar
        .watch(patterns, options)
        .on("add", refreshFiles)
        .on("change", refreshFiles)
        .on("unlink", refreshFiles);

      this.nuxt.renderer.netlifyFileWatcher = fileWatcher;

      // Stop watching on nuxt.close()
      this.nuxt.hook("close", () => {
        this.nuxt.renderer.netlifyFileWatcher.close();
      });
    } else {
      // Statically serve netlify CMS files in production
      this.addServerMiddleware({
        path: config.outputDir,
        handler: serveStatic(config.fsPath, {
          maxAge: "1y" // 1 year in production
        })
      });
    }
  },

  // Handle generating site
  generate(config) {
    // Move cms folder from `.nuxt` folder to `dist` after nuxt generate
    this.nuxt.hook("generate:distCopied", async nuxt => {
      await copy(
        config.fsPath,
        join(nuxt.distPath, config.outputDir).replace(/\/$/, "")
      );

      logger.success("Netlify-cms files copied");
    });
  }
};
