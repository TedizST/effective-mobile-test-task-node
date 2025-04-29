import { z } from "zod";

import { FilterSchema } from "../schemas";

export type TFilter = z.infer<typeof FilterSchema>;

export enum NODE_ENV {
	production = "prod",
	development = "dev",
	test = "test",
}

export const NODE_ENV_VALUES = ["prod", "dev", "test"] as const;
