import { Injectable } from "@nestjs/common"
import { ILoggerOutput } from "./interfaces/logger-output.interface"

@Injectable()
export class Logger implements ILoggerOutput {
    async log(message: any, prefix?: string): Promise<void> {
        const now: Date = new Date()
        console.log(`${now} | [${prefix || "LOG"}]`, message, ";")
    }
}