import { DataSource } from "typeorm";

import { OrmLogger } from "../utils";
import { env } from "../configs";
import { NODE_ENV } from "../types";

export const PSQLDataSource = new DataSource({
	type: "postgres",
	host: env.POSTGRES_HOSTNAME,
	username: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	database: env.POSTGRES_DB,
	synchronize: false,
	logger: new OrmLogger(),
	logging: true,
	entities: [
		env.NODE_ENV === NODE_ENV.production
			? "dist/entities/**/*.entity.js"
			: "src/entities/**/*.entity.ts",
	],
	migrations: [
		env.NODE_ENV === NODE_ENV.production
			? "dist/migrations/**/*.js"
			: "src/migrations/**/*.ts",
	],
});
