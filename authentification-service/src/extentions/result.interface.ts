import { HttpException } from "@nestjs/common"
import { Exception } from "./extention.class"

export interface IResult {
    data?: string
    error?: HttpException
}