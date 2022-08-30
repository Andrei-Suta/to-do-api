import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/auth.guard";

import { CurrentUser } from "src/auth/current-user.decorator";
import { TaskDTO } from "./task.dto";
import { TaskService } from "./task.service";

@Controller("task")
@UseGuards(JwtGuard)
export class TaskController {

	public constructor(private taskService: TaskService) { }

	@Post("/new-task")
	public add(@CurrentUser() user: unknown, @Body() taskDTO: TaskDTO): Promise<TaskDTO> {
		return this.taskService.create(taskDTO, user);
	}

	@Get("/all")
	public getAll(@CurrentUser() user: unknown): Promise<TaskDTO[]> {
		return this.taskService.getAll(user);
	}

	@Put("/edit-task/:id")
	public edit(@CurrentUser() user: unknown, @Param("id") id: number, @Body() taskDTO: TaskDTO): Promise<TaskDTO> {
		return this.taskService.edit(id, taskDTO, user);
	}

	@Patch("/new-status/:id")
	public changeStatus(@CurrentUser() user: unknown, @Param("id") id: number): Promise<TaskDTO> {
		return this.taskService.changeStatus(id, user);
	}

	@Patch("/delete/:id")
	public delete(@CurrentUser() user: unknown, @Param("id") id: number): Promise<TaskDTO> {
		return this.taskService.delete(id, user);
	}

}