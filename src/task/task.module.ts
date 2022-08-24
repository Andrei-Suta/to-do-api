import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";

import { TaskController } from "./task.controller";
import { Task } from "./task.entity";
import { TaskMapper } from "./task.mapper";
import { TaskService } from "./task.service";

@Module({
	imports: [TypeOrmModule.forFeature([Task, User])],
	providers: [TaskService, TaskMapper],
	controllers: [TaskController]
})
export class TaskModule { }