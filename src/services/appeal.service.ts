import { PSQLDataSource } from "../data-sources";
import { AppealDTO, TCreateAppealDTO } from "../dtos";
import { Appeal } from "../entities";
import { appealRepository } from "../repositories";
import { AppealStatus, TAppealID, TFilter } from "../types";
import { randomUUID } from "crypto";
import { InvalidStatusTransitionException, HttpException } from "../exceptions";

class AppealService {
	private _dataSource = PSQLDataSource;
	private _repository = appealRepository;

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
		await this._changeStatus(
			id,
			AppealStatus.Done,
			AppealStatus.Applied,
			result
		);
	}

	public async cancel(id: TAppealID): Promise<void> {
		await this._changeStatus(id, AppealStatus.Canceled, [
			AppealStatus.New,
			AppealStatus.Applied,
		]);
	}

	public async find(filter: TFilter): Promise<AppealDTO[]> {
		return (await this._repository.findWithFilter(filter)).map((appeal) =>
			AppealDTO.fromEntity(appeal)
		);
	}

	public async cancelAllApplied(): Promise<void> {
		await this._repository.cancelAllApplied();
	}

	private async _changeStatus(
		id: TAppealID,
		status: AppealStatus,
		expectedStatus: AppealStatus | AppealStatus[],
		result?: string
	) {
		await this._dataSource.transaction(async (manager) => {
			const appeal = await manager
				.getRepository(Appeal)
				.createQueryBuilder("appeal")
				.where("appeal.id = :id", { id })
				.setLock("pessimistic_write")
				.getOne();

			if (!appeal) {
				throw HttpException.NotFound(`appeal ${id} not found`);
			}

			expectedStatus = !Array.isArray(expectedStatus)
				? [expectedStatus]
				: expectedStatus;

			if (
				expectedStatus.find((eStatus) => eStatus === appeal.status) ===
				undefined
			) {
				throw new InvalidStatusTransitionException(
					expectedStatus,
					appeal.status
				);
			}

			const criteria = { id };
			const fieldsToUpdate = {
				status,
				...(result && { result }),
			};

			return manager.getRepository(Appeal).update(criteria, fieldsToUpdate);
		});
	}
}

export const appealService = new AppealService();
