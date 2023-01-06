import { IResult } from "./result.interface";

export interface IResulter {
    responseAsync<T>(statusCode: number, message: T ): Promise<IResult<T>>
    response<T>(statusCode: number, message: T): IResult<T>
}