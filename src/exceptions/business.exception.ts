import { AppealStatus, AppealStatusStringRU } from "../types";

export class InvalidStatusTransitionException extends Error {
	constructor(expected: AppealStatus | AppealStatus[], actual?: AppealStatus) {
		const expectedList = Array.isArray(expected)
			? expected.map((status) => AppealStatusStringRU[status]).join(", ")
			: AppealStatusStringRU[expected];
		const actualInfo =
			actual !== undefined ? `, but was: ${AppealStatusStringRU[actual]}` : "";

		super(`invalid status transition. expected: ${expectedList}${actualInfo}`);
	}
}
