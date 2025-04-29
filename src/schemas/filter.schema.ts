import { z } from "zod";

export const FilterSchema = z
	.object({
		page: z.coerce.number().gt(0),
		limit: z.coerce.number().gt(0).lte(50),
		date: z.string().date().optional(),
		date_from: z.string().date().optional(),
		date_to: z.string().date().optional(),
	})
	.strip()
	.refine((data) => !(data.date && (data.date_from || data.date_to)), {
		message: "The date and date_from/date_to fields cannot be used together",
		path: ["date"],
	})
	.refine(
		(data) =>
			!(data.date_from && data.date_to) ||
			new Date(data.date_from) <= new Date(data.date_to),
		{
			message: "date_from must be less than or equal to date_to",
			path: ["date_from"],
		}
	);
