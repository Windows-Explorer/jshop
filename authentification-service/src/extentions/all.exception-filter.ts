import { Catch, RpcExceptionFilter, ArgumentsHost } from "@nestjs/common"
import { RpcException } from "@nestjs/microservices"
import { IResult } from "src/dto/result.dto"

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  catch(exception: RpcException, host: ArgumentsHost): any {

    const result: IResult<any> = { statusCode: 401, message: exception.message }
    return result
  }
}