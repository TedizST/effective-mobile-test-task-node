import { env } from "./configs";

import { logger, syncLogger } from "./utils";

import express from "express";
import bodyParser from "body-parser";
import http from "http";

import * as middlewares from "./middlewares";
import { PSQLDataSource } from "./data-sources";

export async function bootstrap() {
  await PSQLDataSource.initialize();

  const app = express();

	app.use(bodyParser.json());
  app.use(middlewares.contextMiddleware);
  app.use(middlewares.loggingMiddlware);

  app.use(middlewares.errorHandlingMiddleware);

  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info(`server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });

  let isShutdownStarted = false;

  async function shutdown() {
    if (isShutdownStarted) return;
    isShutdownStarted = true;

    syncLogger.info("graceful shutdown start");
    const timeout = setTimeout(() => {
      syncLogger.warn("force shutdown");
      process.exit(1);
    }, 15000);

    try {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
      syncLogger.info("server closed");
      await PSQLDataSource.destroy();
      syncLogger.info("db connection destroyed");

      clearTimeout(timeout);
      process.exit(0);
    } catch (e) {
      syncLogger.error(e, "error during server shutdown");
      process.exit(1);
    }
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  process.on("uncaughtException", (error) => {
    syncLogger.fatal(error, "uncaught exception");
    process.exit(1);
  });
  process.on("unhandledRejection", (reason) => {
    syncLogger.fatal(reason, "unhandled rejection");
    process.exit(1);
  });
}
