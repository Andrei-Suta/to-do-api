import { Injectable } from "@nestjs/common";

import { Task } from "src/task/task.entity";
import { TaskMapper } from "src/task/task.mapper";
import { TaskService } from "src/task/task.service";
import { UserDTO } from "./user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserMapper {

	public constructor(
		private taskService: TaskService,
		private taskMapper: TaskMapper,
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
			const taskEntity = await this.taskService.getById(id);
			taskEntities.push(await this.taskMapper.toEntity(taskEntity));
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