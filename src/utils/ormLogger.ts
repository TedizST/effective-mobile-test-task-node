import { Logger as TypeOrmLogger, QueryRunner } from "typeorm";
import { logger } from "./logger";

export class OrmLogger implements TypeOrmLogger {
	logQuery<T>(query: string, parameters?: T[], _queryRunner?: QueryRunner) {
		logger.debug({ query, parameters }, "Executed query");
	}

	logQueryError<T>(
		error: string,
		query: string,
		parameters?: T[],
		_queryRunner?: QueryRunner
	) {
		logger.error({ error, query, parameters }, "Query error");
	}

	logQuerySlow<T>(
		time: number,
		query: string,
		parameters?: T[],
		_queryRunner?: QueryRunner
	) {
		logger.warn({ time, query, parameters }, "Slow query detected");
	}

	logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
		logger.info({ message }, "Schema build");
	}

	logMigration(message: string, _queryRunner?: QueryRunner) {
		logger.info({ message }, "Migration");
	}

	log<T>(
		level: "log" | "info" | "warn",
		message: T,
		_queryRunner?: QueryRunner
	) {
		logger[level === "warn" ? "warn" : "info"](message);
	}
}
