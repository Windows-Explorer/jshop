import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException, Inject } from "@nestjs/common"
import { LOGGER_TOKEN, OUTPUT_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/result.interface"
import { IOutput } from "src/common/interfaces/output.interface"
import { ILogger } from "src/common/interfaces/logger.interface"

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  constructor(
    @Inject(OUTPUT_TOKEN) private readonly _output: IOutput,
    @Inject(LOGGER_TOKEN) private readonly _logger: ILogger
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    this._logger.exception(exception)
    const result: IResult<any> = this._output.response(exception.getStatus(), exception.message)
    return result
  }
}