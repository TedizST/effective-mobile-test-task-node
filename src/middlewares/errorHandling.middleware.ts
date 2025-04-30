import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";
import { ResponseDTO } from "../dtos";
import { HttpException, InvalidStatusTransitionException } from "../exceptions";

export function errorHandlingMiddleware(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
): void {
	if (err instanceof HttpException) {
		res.status(err.code).json(new ResponseDTO(false, { message: err.message }));
		return;
	} else if (err instanceof InvalidStatusTransitionException) {
		res.status(400).json(new ResponseDTO(false, { message: err.message }));
		return;
	}

	logger.error(err, "uncaught error");
	res
		.status(500)
		.json(new ResponseDTO(false, { message: "internal server error" }));
}
