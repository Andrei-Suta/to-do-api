import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "src/user/user.entity";
import { jwtConstants } from "./jwt.constants";
import { AuthDTO } from "./auth.dto";

@Injectable()
export class AuthService {
	public constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private jwtService: JwtService,
	) { }

	public async register(authDto: AuthDTO): Promise<User | never> {
		let user: User = await this.usersRepository.findOne({ where: { email: authDto.email } });
		if (user) {
			throw new HttpException("An account with this email adress has already been registered", HttpStatus.CONFLICT);
		}
		user = new User();
		user.email = authDto.email;
		user.password = authDto.password;
		user.password = await this.hashPassword(user);
		return await this.usersRepository.save(user);
	}

	public async login(authDTO: AuthDTO): Promise<string | never> {
		const user: User = await this.usersRepository.findOne({ where: { email: authDTO.email } });
		if (!user) {
			throw new HttpException("No account registered with the provided email", HttpStatus.NOT_FOUND);
		}
		const isMatch: boolean = await this.verifyPassword(authDTO.password, user.password);
		if (!isMatch) {
			throw new HttpException("Wrong password", HttpStatus.NOT_FOUND);
		}
		return this.generateToken(user);
	}

	public async hashPassword(user: User): Promise<string> {
		const salt = await bcrypt.genSalt();
		return await bcrypt.hash(user.password, salt);
	}

	public async verifyPassword(firstPassword: string, secondPassword: string): Promise<boolean> {
		return await bcrypt.compare(firstPassword, secondPassword);
	}

	public generateToken(user: User): string {
		const tokenDTO = {
			id: user.id,
			email: user.email
		};
		return this.jwtService.sign(tokenDTO, { secret: jwtConstants.secret, expiresIn: jwtConstants.expire });
	}

	public async decodeToken(token: string): Promise<unknown> {
		return this.jwtService.decode(token, null);
	}

	public async validateToken(token: string): Promise<User> {
		const decoded: any = this.jwtService.verify(token);
		if (!decoded) {
			throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
		}
		const user: User = await this.usersRepository.findOne({
			where: { id: decoded.id }
		}
		);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}