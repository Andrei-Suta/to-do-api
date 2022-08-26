import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "src/user/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./jwt.constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: "jwt",
			property: "user"
		}),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: {
				expiresIn: jwtConstants.expire
			}
		}),
		TypeOrmModule.forFeature([User])],
	providers: [AuthService, JwtService, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule { }