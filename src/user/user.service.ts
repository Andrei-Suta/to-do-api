import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserDTO } from "./user.dto";
import { User } from "./user.entity";
import { UserMapper } from "./user.mapper";

@Injectable()
export class UserService {

	public constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private userMapper: UserMapper
	) { }

	public async getById(id: number): Promise<UserDTO> {
		const userEntity: User = await this.userRepository.findOneBy({ id });
		return this.userMapper.toDTO(userEntity);
	}

	public async create(user: UserDTO): Promise<UserDTO> {
		const userEntity: User = await this.userMapper.toEntity(user);
		this.userRepository.save(this.userRepository.create(userEntity));
		return this.userMapper.toDTO(userEntity);
	}

}