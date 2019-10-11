export default context => {
  let data;

  if (context.payload) {
    data = context.payload;
  } else {
    const content = process.env.app_data.find(
      i => i.route === context.route.fullPath
    );

    if (!content) {
      return context.error({ statusCode: 404, message: "Study not found!" });
    }

    data = content.payload;
  }

  context.pagePayload = {
    data,
    options: process.env.app_options
  };
};
