import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";
import { TaskMapper } from "./task.mapper";

@Injectable()
export class TaskService {

	public constructor(
		@InjectRepository(Task)
		private taskRepository: Repository<Task>,

		private taskMapper: TaskMapper
	) { }

	public async getAll(): Promise<TaskDTO[]> {
		const taskEntities = await this.taskRepository.find();
		return this.taskMapper.toDTOs(taskEntities);
	}

	public async getById(id: number): Promise<TaskDTO> {
		const taskEntity = await this.taskRepository.findOneBy({ id });
		return this.taskMapper.toDTO(taskEntity);
	}

	public async create(task: TaskDTO): Promise<unknown> {
		const taskEntity = await this.taskMapper.toEntity(task);
		return this.taskRepository.save(this.taskRepository.create(taskEntity));
	}

	public async remove(id: number): Promise<void> {
		await this.taskRepository.delete(id);
	}

}