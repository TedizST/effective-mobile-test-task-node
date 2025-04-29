import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";
import { ResponseDTO } from "../dtos";

export function errorHandlingMiddleware(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
): void {
	logger.error(err, "uncaught error");
	res
		.status(400)
		.json(new ResponseDTO(false, { message: "internal server error" }));
}
