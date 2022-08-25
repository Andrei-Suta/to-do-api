import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Task } from "src/task/task.entity";

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ type: "character varying", name: "email", unique: true, nullable: false, default: "" })
	public email: string;

	@Column({ type: "character varying", name: "password", nullable: false, default: "" })
	public password: string;

	@OneToMany(() => Task, (task: Task) => task.user)
	public tasks: Task[];
}