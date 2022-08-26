import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "src/user/user.entity";
import { jwtConstants } from "./jwt.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	public constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConstants.secret,
			ignoreExpiration: false,
		});
	}
	private validate(payload: any): Promise<User | never> {
		return this.userRepository.findOne({
			where: { id: payload.id }
		});
	}
}