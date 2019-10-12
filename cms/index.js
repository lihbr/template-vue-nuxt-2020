import CMS, { init } from "netlify-cms";

import config from "./config";

init({ config });

// Preview style
CMS.registerPreviewStyle("/_adminAssets/preview.css");
