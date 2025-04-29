import { AsyncLocalStorage } from "node:async_hooks";

export type TRequestContext = {
  requestID: number | string | object;
};

export const asyncLocalStorage = new AsyncLocalStorage<TRequestContext>();
