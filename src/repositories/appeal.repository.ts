import { Between, MoreThan, Repository } from "typeorm";
import { Appeal } from "../entities";
import { TAppealID, AppealStatus, TFilter } from "../types";

export class AppealRepository extends Repository<Appeal> {
	async changeStatus(
		id: TAppealID,
		status: AppealStatus,
		result?: string
	): Promise<void> {
		const criteria = { id };
		const fieldsToUpdate = {
			status,
			...(result && { result }),
		};

		await this.update(criteria, fieldsToUpdate);
	}

	async cancelAllApplied(): Promise<void> {
		await this.update(
			{ status: AppealStatus.Applied },
			{ status: AppealStatus.Canceled }
		);
	}

	async findWithFilter(filter: TFilter): Promise<Appeal[]> {
		let where: object | undefined;

		if (filter.date) {
			where = {
				createdAt: new Date(filter.date),
			};
		} else {
			if (filter.date_from && filter.date_to) {
				where = {
					createdAt: Between(
						new Date(filter.date_from),
						new Date(filter.date_to)
					),
				};
			} else if (filter.date_from) {
				where = {
					createdAt: MoreThan(new Date(filter.date_from)),
				};
			} else if (filter.date_to) {
				where = {
					createdAt: MoreThan(new Date(filter.date_to)),
				};
			}
		}

		return this.find({
			skip: (filter.page - 1) * filter.limit,
			take: filter.limit,
			...(where && { where }),
		});
	}
}
