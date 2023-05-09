import { IResult } from "./result.interface"

export interface IOutput {
    responseAsync<T>(statusCode: number, message: T ): Promise<IResult<T>>
    response<T>(statusCode: number, message: T): IResult<T>
}