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
		const taskEntities: Task[] = await this.taskRepository.find({
			relations: ["user"]
		});
		taskEntities.sort((a: Task, b: Task) => b.id - a.id);
		return this.taskMapper.toDTOs(taskEntities);
	}

	public async getById(id: number): Promise<TaskDTO> {
		const taskEntity: Task = await this.taskRepository.findOne({
			where: {
				id: id
			},
			relations: ["user"],
		});
		return this.taskMapper.toDTO(taskEntity);
	}

	public async create(taskDTO: TaskDTO): Promise<TaskDTO> {
		const taskEntity: Task = await this.taskMapper.toEntity(taskDTO);
		await this.taskRepository.save(taskEntity);
		return this.taskMapper.toDTO(taskEntity);
	}

	public async edit(id: number, taskDTO: TaskDTO): Promise<TaskDTO> {
		await this.taskRepository.update(id, taskDTO);
		const taskEntity: Task = await this.taskRepository.findOne({
			where: {
				id: id
			},
			relations: ["user"],
		});
		return this.taskMapper.toDTO(taskEntity);
	}

	public async changeStatus(id: number): Promise<TaskDTO> {
		const taskEntity: Task = await this.taskRepository.findOne({
			where: {
				id: id
			},
			relations: ["user"],
		});
		taskEntity.isCompleted = !taskEntity.isCompleted;
		await this.taskRepository.save(taskEntity);
		return this.taskMapper.toDTO(taskEntity);
	}

	public async delete(id: number): Promise<TaskDTO> {
		const taskEntity: Task = await this.taskRepository.findOne({
			where: {
				id: id
			},
			relations: ["user"],
		});
		taskEntity.isDeleted = true;
		await this.taskRepository.save(taskEntity);
		return this.taskMapper.toDTO(taskEntity);
	}

}