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
		const taskEntities: Task[] = await this.taskRepository.find();
		return this.taskMapper.toDTOs(taskEntities);
	}

	public async getById(id: number): Promise<TaskDTO> {
		const taskEntity: Task = await this.taskRepository.findOneBy({ id });
		return this.taskMapper.toDTO(taskEntity);
	}

	public async create(task: TaskDTO): Promise<TaskDTO> {
		const taskEntity: Task = await this.taskMapper.toEntity(task);
		this.taskRepository.save(this.taskRepository.create(taskEntity));
		return this.taskMapper.toDTO(taskEntity);
	}

	public async edit(task: TaskDTO): Promise<TaskDTO> {
		const taskEntity: Task = await this.taskRepository.save(task);
		return this.taskMapper.toDTO(taskEntity);
	}

}