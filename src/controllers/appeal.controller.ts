import { Request, Response } from "express";

import { ResponseDTO } from "../dtos";
import { appealService } from "../services";
import { FilterSchema } from "../schemas";

class AppealController {
	private _appealService = appealService;

	async create(req: Request, res: Response) {
		res
			.status(200)
			.json(new ResponseDTO(true, await this._appealService.create(req.body)));
	}
	async apply(req: Request, res: Response) {
		await this._appealService.apply(req.params.uuid);
		res.status(200).json(new ResponseDTO(true));
	}
	async done(req: Request, res: Response) {
		await this._appealService.done(req.params.uuid, req.body.result);
		res.status(200).json(new ResponseDTO(true));
	}
	async cancel(req: Request, res: Response) {
		await this._appealService.cancel(req.params.uuid);
		res.status(200).json(new ResponseDTO(true));
	}
	async find(req: Request, res: Response) {
		const filter = FilterSchema.parse(req.query);
		res
			.status(200)
			.json(new ResponseDTO(true, await this._appealService.find(filter)));
	}
	async cancelAllApplied(_req: Request, res: Response) {
		await this._appealService.cancelAllApplied();
		res.status(200).json(new ResponseDTO(true));
	}
}

export const appealController = new AppealController();
