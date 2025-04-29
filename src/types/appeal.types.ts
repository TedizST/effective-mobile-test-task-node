export type TAppealID = string;

export const AppealStatusStringRU = [
	"Новое",
	"В работе",
	"Завершено",
	"Отменено",
] as const;

export enum AppealStatus {
	New = 0,
	Applied,
	Done,
	Canceled,
}
