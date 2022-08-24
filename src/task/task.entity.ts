import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/user/user.entity";

@Entity()
export class Task {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public title: string;

	@Column()
	public description: string;

	@Column()
	public is_completed: boolean;

	@Column()
	public is_deleted: boolean;

	@ManyToOne(() => User, (user: User) => user.tasks)
	public user: User;
}