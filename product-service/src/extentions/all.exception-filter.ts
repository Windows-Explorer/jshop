import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException, Inject } from "@nestjs/common"
import { RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/data/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  constructor(@Inject(RESULTER_TOKEN) private readonly _resulter: IOutput) { }
  catch(exception: HttpException, host: ArgumentsHost): any {

    try {
      const result: IResult<any> = this._resulter.response(exception.getStatus(), exception.message)
      return result
    }
    catch (error) {
      const result: IResult<any> = this._resulter.response(500, error)
      return result
    }
  }
}