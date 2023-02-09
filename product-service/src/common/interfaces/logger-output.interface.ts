export interface ILoggerOutput {
    log(message: any, prefix?: string): Promise<void>
}