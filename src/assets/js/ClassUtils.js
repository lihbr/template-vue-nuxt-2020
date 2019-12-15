/**
 * ClassUtils main class
 */
export default class ClassUtils {
  /**
   * Class constructor
   * @param {string} name - child class name
   * @param {boolean} debug - debug mode
   */
  constructor(name, debug) {
    if (typeof debug === "undefined") {
      debug = process && process.env && process.env.NODE_ENV === "development";
    }

    this.__name = name;
    this.__debug = debug;
    this.__errors = [];
    this.__warns = [];
    this.__infos = [];
  }

  /**
   * Add something
   * @param {string} type - error, warn or info
   * @param {string} msg - message
   * @param {any} info - additionnal info
   */
  _commit(type, msg, info) {
    const commit = {
      msg: `${this.__name}: ${msg}`,
      info,
      time: Date.now()
    };
    this[`__${type}s`].push(commit);
    this.__debug && console[type](commit.msg);
  }

  /**
   * Add an error
   * @param {string} msg - message
   * @param {object} info - additionnal info
   */
  _commitError(msg, info = {}) {
    this._commit("error", msg, info);
  }

  /**
   * Add a warning
   * @param {string} msg - message
   * @param {object} info - additionnal info
   */
  _commitWarning(msg, info = {}) {
    this._commit("warn", msg, info);
  }

  /**
   * Add an info
   * @param {string} msg - message
   * @param {object} info - additionnal info
   */
  _commitInfo(msg, info = {}) {
    this._commit("info", msg, info);
  }

  /**
   * Return errors
   * @return {object}
   */
  _getErrors() {
    return {
      last: this._errors[this._errors.length - 1],
      all: this._errors
    };
  }

  /**
   * Return warnings
   * @return {object}
   */
  _getWarnings() {
    return {
      last: this._warns[this._warns.length - 1],
      all: this._warns
    };
  }

  /**
   * Return infos
   * @return {object}
   */
  _getInfos() {
    return {
      last: this._infos[this._infos.length - 1],
      all: this._infos
    };
  }
}
