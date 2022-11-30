import { Injectable, CanActivate, ExecutionContext, Inject, Global } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject("AUTH_GATEWAY") private readonly client: ClientKafka) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const result: boolean = await this.client.send("get.auth.verify", request).toPromise()
        return result
    }
}