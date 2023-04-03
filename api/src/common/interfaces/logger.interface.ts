import { HttpException } from "@nestjs/common/exceptions"

export interface ILogger {
    log(message: any, prefix?: string): Promise<void>
    error(error: Error, prefix?: string): Promise<void>
    successfull(message: any, prefix?: string): Promise<void>
    exception(exception: HttpException, prefix?: string): Promise<void>
}