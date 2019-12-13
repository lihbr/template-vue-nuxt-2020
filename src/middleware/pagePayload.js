export default context => {
  if (context.payload) {
    context.pagePayload = { data: context.payload };
  } else {
    const content = process.env.APP_ROUTES.find(
      i => i.route === context.route.fullPath
    );
    if (!content) {
      return context.error({ statusCode: 404, message: "Page not found!" });
    }
    context.pagePayload = { data: content.payload };
  }
};
