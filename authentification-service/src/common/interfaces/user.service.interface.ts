import { User } from "src/users/entities/user.entity"

export interface IUsersService {
    findById(userId: number): Promise<User>
    findByEmail(email: string): Promise<User>
    findByUsername(username: string): Promise<User>
    findAll(): Promise<User[]>
    create(user: User): Promise<User>
    update(user: User): Promise<User>
}