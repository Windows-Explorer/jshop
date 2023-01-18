import { HttpException } from "@nestjs/common/exceptions"
import { Prefix } from "../constants/prefix.enum"

export interface ILogger {
    log(message: any, prefix?: Prefix | string): Promise<void>
    error(error: Error, prefix?: Prefix | string): Promise<void>
    successfull(message: any, prefix?: Prefix | string): Promise<void>
    exception(exception: HttpException, prefix?: Prefix | string): Promise<void>
}