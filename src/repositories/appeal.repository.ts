import {
	Between,
	LessThanOrEqual,
	MoreThanOrEqual,
	UpdateResult,
} from "typeorm";
import { Appeal } from "../entities";
import { TAppealID, AppealStatus, TFilter } from "../types";
import { PSQLDataSource } from "../data-sources";

export const appealRepository = PSQLDataSource.getRepository(Appeal).extend({
	async cancelAllApplied(): Promise<UpdateResult> {
		return this.update(
			{ status: AppealStatus.Applied },
			{ status: AppealStatus.Canceled }
		);
	},

	async findWithFilter(filter: TFilter): Promise<Appeal[]> {
		const { date, date_from, date_to, page, limit } = filter;

		let where: Record<string, any> | undefined;

		const buildDateRange = () => {
			if (date) {
				const start = new Date(date);
				const end = new Date(date);
				end.setDate(end.getDate() + 1);
				return { start, end };
			}

			const start = date_from ? new Date(date_from) : undefined;
			const end = date_to ? new Date(date_to) : undefined;
			if (end) end.setDate(end.getDate() + 1);

			return { start, end };
		};

		const { start, end } = buildDateRange();

		if (start && end) {
			where = { createdAt: Between(start, end) };
		} else if (start) {
			where = { createdAt: MoreThanOrEqual(start) };
		} else if (end) {
			where = { createdAt: LessThanOrEqual(end) };
		}

		return this.find({
			skip: (page - 1) * limit,
			take: limit,
			where,
		});
	},
});
