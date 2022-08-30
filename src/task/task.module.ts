import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "src/user/user.entity";
import { ValidateUserMiddleware } from "src/auth/validate-user.middleware";
import { TaskController } from "./task.controller";
import { Task } from "./task.entity";
import { TaskMapper } from "./task.mapper";
import { TaskService } from "./task.service";

@Module({
	imports: [TypeOrmModule.forFeature([Task, User])],
	providers: [TaskService, TaskMapper, JwtService],
	controllers: [TaskController]
})
export class TaskModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(ValidateUserMiddleware)
			.forRoutes(TaskController);
	}
}