import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/user/user.entity";

@Entity()
export class Task {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ type: "character varying", name: "title", nullable: false, default: "" })
	public title: string;

	@Column({ type: "character varying", name: "description", nullable: false, default: "" })
	public description: string;

	@Column({ type: "boolean", name: "is_completed", nullable: false, default: false })
	public isCompleted: boolean;

	@Column({ type: "boolean", name: "is_deleted", nullable: false, default: false })
	public isDeleted: boolean;

	@ManyToOne(() => User, (user: User) => user.tasks)
	@JoinColumn({ name: "user_id", referencedColumnName: "id" })
	public user: User;
}