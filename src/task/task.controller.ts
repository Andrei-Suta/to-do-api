import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";

import { TaskDTO } from "./task.dto";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {

	public constructor(private taskService: TaskService) { }

	@Post("/new-task")
	public add(@Body() taskDTO: TaskDTO): Promise<TaskDTO> {
		return this.taskService.create(taskDTO);
	}

	@Get("/all")
	public getAll(): Promise<TaskDTO[]> {
		return this.taskService.getAll();
	}

	@Put("/edit-task/:id")
	public edit(@Param("id") id: number, @Body() taskDTO: TaskDTO): Promise<TaskDTO> {
		return this.taskService.edit(id, taskDTO);
	}

	@Patch("/new-status/:id")
	public changeStatus(@Param("id") id: number): Promise<TaskDTO> {
		return this.taskService.changeStatus(id);
	}

	@Patch("/delete/:id")
	public delete(@Param("id") id: number): Promise<TaskDTO> {
		return this.taskService.delete(id);
	}

}