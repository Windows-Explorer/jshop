import { IUser } from "../types/user.interface"

export interface IUsersService {
    findById(userId: number): Promise<IUser>
    findByEmail(email: string): Promise<IUser>
    findByUsername(username: string): Promise<IUser>
    findAll(): Promise<IUser[]>
    create(user: IUser): Promise<IUser>
    update(user: IUser): Promise<IUser>
}