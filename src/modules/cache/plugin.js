export default async context => {
  context.pagePayload = async context => {
    if (context.payload) {
      return { data: context.payload };
    } else {
      const base = "<%= options.base %>";
      const normalizedPath = context.route.path.replace(/\/+$/, "");
      const url = `${process.env.APP_URL}${base}${normalizedPath}/index.json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw response; // non-200 code
        }
        const data = await response.json();
        return { data };
      } catch (error) {
        if (context.app && context.app.$logger) {
          context.app.$logger.log(error);
        } else {
          console.log(error);
        }
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
};
