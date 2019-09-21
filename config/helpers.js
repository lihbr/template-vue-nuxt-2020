const fs = require("fs");
const _glob = require("glob");
const _slugify = require("slugify");
_slugify.extend({ ".": "-" });

/**
 * Get a files glob
 * @param {string} path - directory path
 * @param {string} pattern - glob pattern
 * @param {string} contentDir - base content directory
 * @return {array} - glob
 */
const glob = (path, pattern = "*.json", contentDir = ".content") => {
  const directory = `${contentDir}${path}/`;
  if (!fs.existsSync(directory)) {
    throw new Error(`glob: directory: ${directory} not found`);
  }

  const result = _glob.sync(`${directory}${pattern}`, { nodir: true });

  if (!result.length) {
    console.warn(
      `glob: no result found for given pattern: ${pattern} in directory: ${directory}`
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
  return path.replace(/(\.content\/[\w-_]*\/|\.\w+$)/g, "");
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
    throw new Error(`glob: directory: ${directory} not found`);
  }

  return JSON.parse(fs.readFileSync(path));
};

/**
 * Glob content from files under given path
 * @param {string} path - directory path
 * @param {string} pattern - glob pattern
 * @param {string} contentDir - base content directory
 * @return {object} - files content
 */
const globContent = (path, pattern, contentDir) => {
  if (!path) {
    throw new Error("gloContent: path argument is required");
  }

  const files = glob(path, pattern, contentDir);
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
