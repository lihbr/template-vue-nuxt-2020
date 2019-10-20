const fs = require("fs");
const { resolve, basename } = require("path");

const globby = require("globby");
const _slugify = require("slugify");
_slugify.extend({ ".": "-" });

const logger = require("./logger");

/**
 * Get a files glob
 * @param {string} contentDir - base content directory
 * @param {string} directory - directory path
 * @param {string} pattern - glob pattern
 * @return {array} - glob
 */
const glob = async (contentDir, directory, pattern = "*.json") => {
  const fullPath = resolve(contentDir, directory);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`glob: directory: "${fullPath}" not found`);
  }

  const result = await globby(`${directory}/${pattern}`, {
    cwd: contentDir,
    absolute: true,
    onlyFiles: true
  });

  if (!result.length) {
    logger.warn(
      `No result found for given pattern: "${pattern}" in directory: "${fullPath}"`
    );
  }
  return result;
};

/**
 * Extract file name from path
 * @param {string} path - file path
 * @return {string} - file name
 */
const getFileName = (path = "") => {
  return basename(path).replace(/\.\w+$/g, "");
};

/**
 * Read json file
 * @param {string} path - path to json
 * @return {object} - json file content
 */
const readJson = path => {
  if (!path) {
    throw new Error("readJson: path argument is required");
  }

  if (!fs.existsSync(path)) {
    throw new Error(`glob: directory: "${path}" not found`);
  }

  return JSON.parse(fs.readFileSync(path));
};

/**
 * Glob content from files under given path
 * @param {string} contentDir - base content directory
 * @param {string} directory - directory path
 * @param {string} pattern - glob pattern
 * @return {object} - files content
 */
const globContent = async (contentDir, directory, pattern) => {
  if (!directory) {
    throw new Error("globContent: directory argument is required");
  }

  const files = await glob(contentDir, directory, pattern);
  const content = {};
  files.forEach(file => {
    content[getFileName(file)] = readJson(file);
  });

  return content;
};

/**
 * Slugify a string
 * @param {string} str - string to get slug from
 * @return {string} - slugified string
 */
const slugify = str => {
  return _slugify(str, {
    replacement: "-",
    remove: null,
    lower: true
  });
};

module.exports = {
  glob,
  getFileName,
  readJson,
  globContent,
  slugify
};
