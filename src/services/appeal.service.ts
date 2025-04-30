import { PSQLDataSource } from "../data-sources";
import { AppealDTO, TCreateAppealDTO } from "../dtos";
import { Appeal } from "../entities";
import { AppealRepository } from "../repositories";
import { AppealStatus, TAppealID, TFilter } from "../types";
import { randomUUID } from "crypto";

class AppealService {
	private _repository = PSQLDataSource.getRepository(Appeal).extend(
		AppealRepository.prototype
	);

	public async create(dto: TCreateAppealDTO): Promise<AppealDTO> {
		const appeal = new Appeal();
		appeal.id = randomUUID();
		appeal.text = dto.text;
		return AppealDTO.fromEntity(await this._repository.save(appeal));
	}

	public async apply(id: TAppealID): Promise<void> {
		await this._changeStatus(id, AppealStatus.Applied, AppealStatus.New);
	}

	public async done(id: TAppealID, result?: string): Promise<void> {
		await this._repository.changeStatus(id, AppealStatus.Done, result);
	}

	public async cancel(id: TAppealID): Promise<void> {
		await this._repository.changeStatus(id, AppealStatus.Canceled);
	}

	public async find(filter: TFilter): Promise<AppealDTO[]> {
		return (await this._repository.findWithFilter(filter)).map((appeal) =>
			AppealDTO.fromEntity(appeal)
		);
	}

	public async cancelAllApplied(): Promise<void> {
		await this._repository.cancelAllApplied();
	}
}

export const appealService = new AppealService();
