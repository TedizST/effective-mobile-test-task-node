import { pinoHttp } from "pino-http";
import { logger, asyncLocalStorage } from "../utils";

export const loggingMiddlware = pinoHttp({
  logger: logger,

  genReqId: function (_req, _res) {
    const { requestID } = asyncLocalStorage.getStore()!;
    return requestID;
  },
});
