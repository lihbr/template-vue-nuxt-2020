const logger = require("./logger");

module.exports = {
  add() {
    let startTime;
    let count;
    this.nuxt.hook("generate:routeCreated", () => {
      if (!startTime) {
        startTime = new Date();
        count = 0;
      } else {
        count++;
      }
    });
    this.nuxt.hook("generate:done", () => {
      const time = (new Date() - startTime) / 1000;
      const rps = count / time;
      logger.info(`Generated ${count} routes in ${time} sec (${rps} r/s)`);
    });
  }
};
