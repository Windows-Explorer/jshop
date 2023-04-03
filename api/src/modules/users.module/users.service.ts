import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { IUsersService } from "src/common/interfaces/services/user.service.interface"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { IUser } from "src/common/interfaces/types/user.interface"

@Injectable()
export class UsersService implements IUsersService {
    constructor(@InjectRepository(User) private readonly _usersRepository: Repository<IUser>) { }

    async findById(userId: number): Promise<IUser> {
        return await this._usersRepository.findOne({ where: { id: userId } })
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this._usersRepository.findOne({ where: { email: email } })
    }

    async findByUsername(username: string): Promise<IUser> {
        return await this._usersRepository.findOne({ where: { username: username } })
    }

    async findAll(): Promise<IUser[]> {
        return await this._usersRepository.find()
    }

    async create(user: User): Promise<IUser> {
        return this._usersRepository.save(user)
    }

    async update(user: User): Promise<IUser> {
        return await this._usersRepository.save(user)
    }
}
