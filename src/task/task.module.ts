import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskController } from "./task.controller";
import { TaskEntity } from "./task.entity";
import { TaskMapper } from "./task.mapper";
import { TaskService } from "./task.service";

@Module({
	imports: [TypeOrmModule.forFeature([TaskEntity])],
	providers: [TaskService, TaskMapper],
	controllers: [TaskController]
})
export class TaskModule { }