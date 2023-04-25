import { Injectable } from "@nestjs/common"
import { IOutput } from "./interfaces/resulter.interface"
import { IResult } from "./interfaces/data/result.interface"

@Injectable()
export class Resulter implements IOutput {
    public async responseAsync<T>(statusCode: number, message: T ): Promise<IResult<T>> {
        return { statusCode: statusCode, message: message }
    }

    public response<T>(statusCode: number, message: T): IResult<T> {
        return { statusCode: statusCode, message: message }
    }
}