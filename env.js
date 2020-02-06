const pkg = require("./package");
require("dotenv").config();

const config = async () => {
  // Getting global content from CMS
  const CMS_CONTENT = {}; // TODO: Get content from CMS

  // Defining site general variables
  const DEV = process.env.NODE_ENV === "development";
  const COMMIT_REF = process.env.COMMIT_REF
    ? process.env.COMMIT_REF
    : "unknow commit reference";
  const REPOSITORY_URL = process.env.REPOSITORY_URL
    ? process.env.REPOSITORY_URL
    : "unknown";

  const APP_NAME = process.env.APP_NAME || pkg.name;
  const APP_DESC = process.env.APP_DESC || pkg.description;
  const APP_HOST = process.env.APP_HOST || "localhost";
  const APP_PORT = process.env.APP_PORT || 3000;
  const APP_URL = process.env.APP_URL || `http://${APP_HOST}:${APP_PORT}`;
  const APP_LANG = process.env.APP_LANG || "en";

  const GTM_ID = process.env.GTM_ID || "";
  const GTM_FRIENDLY = process.env.GTM_FRIENDLY || false;
  const GTM_DEV = process.env.GTM_DEV || false;

  const CONSOLA_LEVEL = process.env.CONSOLA_LEVEL || 1;

  return {
    DEV,
    // COMMIT_REF,
    // REPOSITORY_URL,

    APP_NAME,
    APP_DESC,
    APP_HOST,
    APP_PORT,
    APP_URL,
    APP_LANG,

    GTM_ID,
    GTM_FRIENDLY,
    GTM_DEV,

    CONSOLA_LEVEL,

    CMS_CONTENT
  };
};

module.exports = { config };
