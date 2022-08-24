import { Injectable } from "@nestjs/common";

import { UserMapper } from "src/user/user.mapper";
import { UserService } from "src/user/user.service";
import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskMapper {

	public constructor(
		private userService: UserService,
		private userMapper: UserMapper
	) { }

	public toDTO(entity: Task): TaskDTO {
		const taskDTO: TaskDTO = {
			id: entity.id,
			title: entity.title,
			description: entity.description,
			isCompleted: entity.isCompleted,
			isDeleted: entity.isDeleted,
			userId: entity.user.id
		};
		return taskDTO;
	}

	public async toEntity(dto: TaskDTO): Promise<Task> {
		const taskEntity: Task = {
			id: dto.id,
			title: dto.title,
			description: dto.description,
			isCompleted: dto.isCompleted,
			isDeleted: dto.isDeleted,
			user: await this.userMapper.toEntity(await this.userService.getById(dto.userId))
		};
		return taskEntity;
	}

	public toDTOs(entities: Task[]): TaskDTO[] {
		const taskDTOs: TaskDTO[] = [];
		for (const entity of entities) {
			taskDTOs.push(this.toDTO(entity));
		}
		return taskDTOs;
	}

}