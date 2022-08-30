import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "src/user/user.entity";
import { TaskDTO } from "./task.dto";
import { Task } from "./task.entity";
import { TaskMapper } from "./task.mapper";

@Injectable()
export class TaskService {

	public constructor(
		@InjectRepository(Task)
		private taskRepository: Repository<Task>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private taskMapper: TaskMapper
	) { }

	public async getAll(user: any): Promise<TaskDTO[]> {
		const userEntity: User = await this.userRepository.findOne({ where: { id: user.id } });
		const taskEntities: Task[] = await this.taskRepository.find({
			where: {
				user: userEntity
			},
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

	public async create(taskDTO: TaskDTO, user: any): Promise<TaskDTO> {
		taskDTO.userId = user.id;
		const taskEntity: Task = await this.taskMapper.toEntity(taskDTO);
		await this.taskRepository.save(taskEntity);
		return this.taskMapper.toDTO(taskEntity);
	}

	public async edit(id: number, taskDTO: TaskDTO, user: any): Promise<TaskDTO> {
		const userEntity: User = await this.userRepository.findOne({ where: { id: user.id } });
		await this.taskRepository.update({ id, user: userEntity }, taskDTO);
		const taskEntity: Task = await this.taskRepository.findOne({
			where: {
				id: id,
				user: userEntity
			},
			relations: ["user"],
		});
		return this.taskMapper.toDTO(taskEntity);
	}

	public async changeStatus(id: number, user: any): Promise<TaskDTO> {
		const userEntity: User = await this.userRepository.findOne({ where: { id: user.id } });
		const taskEntity: Task = await this.taskRepository.findOne({
			where: {
				id: id,
				user: userEntity
			},
			relations: ["user"],
		});
		taskEntity.isCompleted = !taskEntity.isCompleted;
		await this.taskRepository.save(taskEntity);
		return this.taskMapper.toDTO(taskEntity);
	}

	public async delete(id: number, user: any): Promise<TaskDTO> {
		const userEntity: User = await this.userRepository.findOne({ where: { id: user.id } });
		const taskEntity: Task = await this.taskRepository.findOne({
			where: {
				id: id,
				user: userEntity
			},
			relations: ["user"],
		});
		taskEntity.isDeleted = true;
		await this.taskRepository.save(taskEntity);
		return this.taskMapper.toDTO(taskEntity);
	}

}