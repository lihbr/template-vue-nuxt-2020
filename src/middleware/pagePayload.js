import fetch from "isomorphic-unfetch";

import logger from "~/assets/js/logger";

export default async context => {
  if (context.payload) {
    context.pagePayload = { data: context.payload };
  } else {
    try {
      // Resolve cache url
      const url = [
        process.env.GENERATE_CACHE_DIR,
        context.route.fullPath,
        "index.json"
      ]
        .join("/")
        .replace(/[\/\\]{3,}/g, "/");

      const response = await fetch(url);
      if (!response.ok) {
        throw response; // non-200 code
      }
      const data = await response.json();
      context.pagePayload = { data };
    } catch (error) {
      logger.error(error);
      if (!!error.statusCode) {
        return context.error({ statusCode: error.statusCode });
      } else if (!!error.status) {
        return context.error({ statusCode: error.status });
      } else {
        return context.error();
      }
    }
  }
};
