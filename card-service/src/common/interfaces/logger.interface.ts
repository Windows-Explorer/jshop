import { Prefix } from "../constants/prefix.enum"

export interface ILogger {
    log(message: string, prefix?: Prefix): Promise<void>
    error(error: Error, prefix?: Prefix): Promise<void>
    successfull(message: string, prefix?: Prefix): Promise<void>
}