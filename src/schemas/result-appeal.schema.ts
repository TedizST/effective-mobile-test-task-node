import { z } from "zod";

export const ResultAppealSchema = z
	.object({
		text: z.string().optional(),
	})
	.strip();
