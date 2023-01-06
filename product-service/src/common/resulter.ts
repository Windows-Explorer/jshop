import { Injectable } from "@nestjs/common"
import { IResult } from "src/common/interfaces/result.interface"
import { IResulter } from "./interfaces/resulter.interface"

@Injectable()
export class Resulter implements IResulter {
    public async responseAsync<T>(statusCode: number, message: T ): Promise<IResult<T>> {
        return { statusCode: statusCode, message: message }
    }

    public response<T>(statusCode: number, message: T): IResult<T> {
        return { statusCode: statusCode, message: message }
    }
}