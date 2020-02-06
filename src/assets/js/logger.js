import consola from "consola";

let logger;

// TODO: Find a fix to allow use of consola in production (makes IE crash so far)
if (process.env.NODE_ENV === "production") {
  const silent = () => {};
  const isClient = typeof window !== "undefined";
  logger = {
    info:
      process.env.CONSOLA_LEVEL >= 3 && isClient ? window.console.info : silent,
    log:
      process.env.CONSOLA_LEVEL >= 2 && isClient ? window.console.log : silent,
    warn:
      process.env.CONSOLA_LEVEL >= 1 && isClient ? window.console.warn : silent,
    error:
      process.env.CONSOLA_LEVEL >= 0 && isClient ? window.console.error : silent
  };
} else {
  logger = consola.withScope("lihbr:app");
  logger.level = process.env.CONSOLA_LEVEL;
}

export default logger;
