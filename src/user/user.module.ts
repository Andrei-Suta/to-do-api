import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Task } from "src/task/task.entity";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserMapper } from "./user.mapper";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User, Task])],
	providers: [UserService, UserMapper],
	controllers: [UserController]
})
export class UserModule { }