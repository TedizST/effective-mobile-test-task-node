import { AnyZodObject, ZodError, IssueData } from "zod";
import { Request, Response, NextFunction } from "express";
import { ResponseDTO } from "../dtos";

export const validateZod =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);
			next();
		} catch (err) {
			if (err instanceof ZodError) {
				const issues = err.issues.map((issue: IssueData) => ({
					field: issue.path,
					message: issue.message,
				}));
				res.status(400).json(new ResponseDTO(false, issues));
			} else {
				next(err);
			}
		}
	};
