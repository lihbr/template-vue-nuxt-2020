/**
 * Set head script
 * @param {Object} options - module options object
 */
const script = function(options) {
  this.options.head.script = this.options.head.script || [];
  this.options.head.script.push(...options.script);
};

module.exports = script;
