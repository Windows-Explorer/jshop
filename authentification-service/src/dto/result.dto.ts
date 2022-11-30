import { User } from "src/users/entities/user.entity"

export interface IResult {
    data?: string | User
    error?: { statusCode: number, message: string}
}