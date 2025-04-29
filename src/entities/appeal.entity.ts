import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { AppealStatus } from "../types";

@Entity()
export class Appeal {
	@PrimaryColumn({ name: "id" })
	id!: string;

	@Column({ name: "text" })
	text!: string;

	@Column({
		name: "status",
		type: "enum",
		enum: AppealStatus,
		default: AppealStatus.New,
	})
	status!: AppealStatus;

	@Column({
		name: "result",
		length: 1000,
		nullable: true,
	})
	result?: string;

	@CreateDateColumn({ name: "created_at", type: "timestamp" })
	createdAt!: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamp" })
	updatedAt!: Date;
}
