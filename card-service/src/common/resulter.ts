import { Injectable } from "@nestjs/common"
import { IResult } from "src/common/interfaces/result.interface"
import { IOutput } from "./interfaces/output.interface"

@Injectable()
export class Resulter implements IOutput {
    public async responseAsync<T>(statusCode: number, message: T ): Promise<IResult<T>> {
        return { statusCode: statusCode, message: message }
    }

    public response<T>(statusCode: number, message: T): IResult<T> {
        return { statusCode: statusCode, message: message }
    }
}