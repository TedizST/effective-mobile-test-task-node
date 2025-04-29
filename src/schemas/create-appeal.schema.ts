import { z } from "zod";

export const CreateAppealSchema = z
	.object({
		text: z.string().nonempty(),
	})
	.strip();
