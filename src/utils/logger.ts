import pino from "pino";

import { NODE_ENV } from "../types";
import { env } from "../configs";

const pinoConfig = {
  formatters: {
    level: (label: string) => {
      return {
        level: label,
      };
    },
  },

  level: env.LOG_LEVEL,

  transport:
    env.NODE_ENV !== NODE_ENV.production
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
};

export const logger = pino(pinoConfig);

export const syncLogger = pino(pino.destination({ sync: true }));
