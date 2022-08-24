import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Task } from "src/task/task.entity";

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public email: string;

	@Column()
	public password: string;

	@OneToMany(() => Task, (task: Task) => task.user)
	public tasks: Task[];
}