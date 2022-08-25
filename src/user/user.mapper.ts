import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Task } from "src/task/task.entity";
import { UserDTO } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserMapper {

	public constructor(
		@InjectRepository(Task)
		private taskRepository: Repository<Task>
	) { }

	public toDTO(entity: User): UserDTO {
		const userDTO: UserDTO = {
			id: entity.id,
			email: entity.email,
			password: entity.password,
			tasks: entity.tasks.map((task: Task) => task.id)
		};
		return userDTO;
	}

	public async toEntity(dto: UserDTO): Promise<User> {
		const taskEntities: Task[] = [];
		for (const id of dto.tasks) {
			const taskEntity: Task = await this.taskRepository.findOneBy({ id });
			taskEntities.push(taskEntity);
		}
		const userEntity: User = {
			id: dto.id,
			email: dto.email,
			password: dto.password,
			tasks: taskEntities
		};
		return userEntity;
	}

}