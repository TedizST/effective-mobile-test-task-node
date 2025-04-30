import { Request, Response } from "express";

import { ResponseDTO } from "../dtos";
import { appealService } from "../services";
import { FilterSchema } from "../schemas";

class AppealController {
	private _appealService = appealService;

	public create = async (req: Request, res: Response) => {
		res
			.status(200)
			.json(new ResponseDTO(true, await this._appealService.create(req.body)));
	};
	public apply = async (req: Request, res: Response) => {
		await this._appealService.apply(req.params.id);
		res.status(200).json(new ResponseDTO(true));
	};
	public done = async (req: Request, res: Response) => {
		await this._appealService.done(req.params.id, req.body.result);
		res.status(200).json(new ResponseDTO(true));
	};
	public cancel = async (req: Request, res: Response) => {
		await this._appealService.cancel(req.params.id);
		res.status(200).json(new ResponseDTO(true));
	};
	public find = async (req: Request, res: Response) => {
		const filter = FilterSchema.parse(req.query);
		res
			.status(200)
			.json(new ResponseDTO(true, await this._appealService.find(filter)));
	};
	public cancelAllApplied = async (_req: Request, res: Response) => {
		await this._appealService.cancelAllApplied();
		res.status(200).json(new ResponseDTO(true));
	};
}

export const appealController = new AppealController();
