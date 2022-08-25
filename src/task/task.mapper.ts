import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskMapper {

	public constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
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
		const id = dto.userId;
		const user = await this.userRepository.findOneBy({ id });
		const taskEntity: Task = {
			id: dto.id,
			title: dto.title,
			description: dto.description,
			isCompleted: dto.isCompleted,
			isDeleted: dto.isDeleted,
			user: user
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