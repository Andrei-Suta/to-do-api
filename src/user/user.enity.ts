import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { TaskEntity } from "src/task/task.entity";

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	public id!: number;

	@Column({ type: "text", nullable: false })
	public email: string;

	@Column({ type: "text", nullable: false })
	public password: string;

	@OneToMany(() => TaskEntity, (task) => task.user)
	public tasks: TaskEntity[];
}