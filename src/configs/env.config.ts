import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

import { NODE_ENV_VALUES } from "../types";

const envSchema = z
	.object({
		PORT: z.coerce.number().default(3000),
		NODE_ENV: z.enum(NODE_ENV_VALUES).default("prod"),
		LOG_LEVEL: z.string().default("info"),
		POSTGRES_HOSTNAME: z.string().nonempty(),
		POSTGRES_USER: z.string().nonempty(),
		POSTGRES_PASSWORD: z.string().nonempty(),
		POSTGRES_DB: z.string().nonempty(),
	})
	.strip();

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error(_env.error.format());
	process.exit(1);
}

export type Env = z.infer<typeof envSchema>;
export const env = _env.data;
