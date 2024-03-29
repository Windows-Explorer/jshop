import { Catch, ArgumentsHost, HttpException, RpcExceptionFilter, Inject } from "@nestjs/common"
import { OUTPUT_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  constructor(@Inject(OUTPUT_TOKEN) private readonly _output: IOutput) { }
  catch(exception: HttpException, host: ArgumentsHost): any {
    const result: IResult<string> = this._output.response(exception.getStatus(), exception.message)
    return result
  }
}