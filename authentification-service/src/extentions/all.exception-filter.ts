import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices'

@Catch()
export class AllExceptionsFilter implements  RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): any {
    return throwError(() => exception.getError());
  }
}