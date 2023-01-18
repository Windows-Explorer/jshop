import { Injectable } from "@nestjs/common"
import { ILogger } from "./interfaces/logger.interface"
import { Prefix } from "./constants/prefix.enum"

@Injectable()
export class Logger implements ILogger {

    async log(message: string, prefix?: Prefix): Promise<void> {
        if(!prefix) prefix = Prefix.LOG

        const now: Date = new Date()
        console.log(`${now} | [${prefix}] ${message};`)
    }

    async error(error: Error, prefix?: Prefix): Promise<void> {
        if(!prefix) prefix = Prefix.ERROR

        const now: Date = new Date()
        console.log(`${now} | [${prefix}] ${error};`)
    }
}