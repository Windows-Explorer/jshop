import { Injectable, CanActivate, ExecutionContext, Inject, Global } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Request } from 'express'
import { IResult } from 'src/dto/result.dto'

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject("AUTH_GATEWAY") private readonly client: ClientKafka) {}

    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest()
        
        const token = request.headers.authorization.replace("Bearer ", "")

        const result: IResult<any> = await this.client.send("get.auth.verify", token).toPromise()
        console.log(result)
        return result.data
    }
}