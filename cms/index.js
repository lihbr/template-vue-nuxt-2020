window.CMS_MANUAL_INIT = true;

import "./preview.css";

import CMS, { init } from "netlify-cms";

import config from "./config";

init({ config });

// Preview style
CMS.registerPreviewStyle("cms.css");
