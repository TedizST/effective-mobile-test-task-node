import { Appeal } from "../../entities";
import { AppealStatusStringRU, TAppealID } from "../../types";

export class AppealDTO {
	id!: TAppealID;
	text!: string;
	status!: string;
	result?: string;
	createdAt!: string;

	public static fromEntity(appeal: Appeal): AppealDTO {
		const appealDTO = new AppealDTO();
		appealDTO.id = appeal.id;
		appealDTO.text = appeal.text;
		appealDTO.status = AppealStatusStringRU[appeal.status];
		appealDTO.result = appeal.result;
		appealDTO.createdAt = appeal.createdAt.toISOString();
		return appealDTO;
	}
}
