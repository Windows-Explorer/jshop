import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException, Inject } from "@nestjs/common"
import { RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/result.interface"
import { IResulter } from "src/common/interfaces/resulter.interface"

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  constructor(@Inject(RESULTER_TOKEN) private readonly _resulter: IResulter) {}
  catch(exception: HttpException, host: ArgumentsHost): any {

    const result: IResult<any> = this._resulter.response(exception.getStatus(), exception.message)

    return result
  }
}