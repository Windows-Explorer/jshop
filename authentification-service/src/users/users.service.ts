import { Injectable } from '@nestjs/common'
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
      ) {}


    async findById(userId: number): Promise<User> {
        return await this.usersRepository.findOne({ where: { id: userId } })
    }


    async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({ where: { email: email } })
    }

    async findByUsername(username: string): Promise<User> {
        return await this.usersRepository.findOne({ where: { username: username } })
    }


    async findAll(): Promise<User[]> {
        return await this.usersRepository.find()
    }


    async create(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }


    async update(user: User): Promise<User> {
        return await this.usersRepository.save(user)
    }
}
