import { Body, Controller, Post } from "@nestjs/common";

import { User } from "src/user/user.entity";
import { AuthDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	public constructor(
		private authService: AuthService
	) { }

	@Post("register")
	private register(@Body() authDTO: AuthDTO): Promise<User | never> {
		return this.authService.register(authDTO);
	}

	@Post("login")
	private login(@Body() authDTO: AuthDTO): Promise<string | never> {
		return this.authService.login(authDTO);
	}

}