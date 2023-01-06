import { Catch, ArgumentsHost, HttpException, RpcExceptionFilter, Inject } from "@nestjs/common"
import { Observable } from "rxjs"
import { RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/result.interface"
import { IResulter } from "src/common/interfaces/resulter.interface"

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  constructor(@Inject(RESULTER_TOKEN) private readonly _resulter: IResulter) {}
  catch(exception: HttpException, host: ArgumentsHost): any {

    const result: IResult<string> = this._resulter.response(exception.getStatus(), exception.message)
    return result
  }
}