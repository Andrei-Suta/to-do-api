import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserMapper } from "./user.mapper";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService, UserMapper],
	controllers: [UserController]
})
export class UserModule { }