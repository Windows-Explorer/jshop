import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices'
import { IResult } from 'src/dto/result.dto'

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  catch(exception: RpcException, host: ArgumentsHost): any {
    const result: IResult = { data: exception.message, error: { statusCode: 401, message: "Unauthorized" }}

    return result
  }
}