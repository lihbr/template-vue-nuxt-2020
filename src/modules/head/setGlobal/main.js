/**
 * Set head main keys
 * @param {Object} options - module options object
 */
const main = function (options) {
  // HTML attributes
  this.options.head.htmlAttrs = this.options.head.htmlAttrs || {};
  this.options.head.htmlAttrs.lang =
    this.options.head.htmlAttrs.lang || options.lang;
};

module.exports = main;
