import { Catch, ArgumentsHost } from "@nestjs/common"
import { BaseRpcExceptionFilter } from "@nestjs/microservices"
import { Observable } from "rxjs"

@Catch()
export class NoExceptionFilter implements BaseRpcExceptionFilter {
    handleUnknownError(exception: any, status: string): Observable<never> {
        throw new Error("Method not implemented.")
    }
    isError(exception: any): exception is Error {
        throw new Error("Method not implemented.")
    }
    catch(exception: any, host: ArgumentsHost): Observable<any> {
        console.log("Capturando el error RPCException en filter")
        throw (exception.getError())
    }
}