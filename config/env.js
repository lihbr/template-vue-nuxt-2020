const pkg = require("../package");
require("dotenv").config();

const DEV = process.env.DEV || false;
const APP_NAME = process.env.APP_NAME || pkg.name;
const APP_DESC = process.env.APP_DESC || pkg.description;
const APP_HOST = process.env.APP_HOST || "0.0.0.0";
const APP_PORT = process.env.APP_PORT || 3000;
const APP_URL = process.env.APP_URL || `http://${APP_HOST}:${APP_PORT}`;
const APP_LANG = process.env.APP_LANG || "en";

module.exports = {
  DEV,
  APP_NAME,
  APP_DESC,
  APP_HOST,
  APP_PORT,
  APP_URL,
  APP_LANG
};
