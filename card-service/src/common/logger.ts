import { Injectable } from "@nestjs/common"
import { ILogger } from "./interfaces/logger.interface"
import { Prefix } from "./constants/prefix.enum"
import { HttpException } from "@nestjs/common/exceptions"

@Injectable()
export class Logger implements ILogger {
    async log(message: any, prefix?: Prefix | string): Promise<void> {
        if(!prefix) prefix = Prefix.LOG
        const now: Date = new Date()
        console.log(`${now} | [${prefix}]`, message, ";")
    }

    async error(error: Error, prefix?: Prefix | string): Promise<void> {
        if(!prefix) prefix = Prefix.ERROR
        const now: Date = new Date()
        console.log(`${now} | [${prefix}]`, error, ";")
    }

    async successfull(message: any, prefix?: Prefix | string): Promise<void> {
        if(!prefix) prefix = Prefix.SUCCESSFULL
        const now: Date = new Date()
        console.log(`${now} | [${prefix}]`, message, ";")
    }

    async exception(exception: HttpException, prefix?: Prefix | string): Promise<void> {
        if(!prefix) prefix = Prefix.EXCEPTION
        const now: Date = new Date()
        console.log(`${now} | [${prefix}]`, exception, ";")
    }
}