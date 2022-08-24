import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { TaskEntity } from "src/task/task.entity";

@Entity()
export class UserEntity {

	@PrimaryGeneratedColumn()
	public id!: number;

	@Column({ type: "varchar", default: "" })
	public email: string;

	@Exclude()
	@Column({ type: "varchar", default: "" })
	public password: string;

	@OneToMany(() => TaskEntity, (task) => task.user)
	public tasks: TaskEntity[];
}