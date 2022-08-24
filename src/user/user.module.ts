import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserEntity } from "./user.enity";
import { UserMapper } from "./user.mapper";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserService, UserMapper],
	controllers: [UserController]
})
export class UserModule { }