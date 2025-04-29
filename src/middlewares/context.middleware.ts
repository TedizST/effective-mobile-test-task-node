import { asyncLocalStorage, TRequestContext } from "../utils";
import { randomUUID } from "node:crypto";
import { Request, Response, NextFunction } from "express";

export function contextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const existingID = req.headers["x-request-id"] ?? randomUUID();
  res.setHeader("X-Request-Id", existingID);

  const ctx: TRequestContext = {
    requestID: existingID,
  };
  asyncLocalStorage.run(ctx, () => next());
}
