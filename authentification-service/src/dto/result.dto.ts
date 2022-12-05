import { User } from "src/users/entities/user.entity"

export interface IResult {
    data?: any
    error?: { statusCode: number, message: string}
}