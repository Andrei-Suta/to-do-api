import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { Task } from "./task/task.entity";
import { TaskModule } from "./task/task.module";
import { User } from "./user/user.entity";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get("POSTGRES_HOST"),
				port: +configService.get<number>("POSTGRES_PORT"),
				username: configService.get("POSTGRES_USER"),
				password: configService.get("POSTGRES_PASSWORD"),
				database: configService.get("POSTGRES_DATABASE"),
				entities: [Task, User],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		TaskModule,
		UserModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }