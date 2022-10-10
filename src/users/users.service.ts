import { Injectable } from '@nestjs/common'
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, UpdateResult } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}


    async findOne(userId?: number, username?: string): Promise<User> {
        if (userId) return await this.usersRepository.findOne({ where: { id: userId } })
        else if (username) return await this.usersRepository.findOne({ where: { username: username } })
        else return null
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find()
    }

    async create(user: User): Promise<User> {
        return await this.usersRepository.create(user)
    }

    async update(user: User): Promise<User> {
        return await this.usersRepository.save(user)
    }
}
