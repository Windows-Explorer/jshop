import { Injectable } from "@nestjs/common"
import { IResult } from "src/common/interfaces/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"

@Injectable()
export class Output implements IOutput {
    public async responseAsync<T>(statusCode: number, message: T ): Promise<IResult<T>> {
        return { statusCode: statusCode, message: message }
    }

    public response<T>(statusCode: number, message: T): IResult<T> {
        return { statusCode: statusCode, message: message }
    }
}