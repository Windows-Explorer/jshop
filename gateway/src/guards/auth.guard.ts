import { Injectable, CanActivate, ExecutionContext, Inject, Global } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Request } from "express"
import { AUTH_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/dto/result.dto"

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(AUTH_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Request = context.switchToHttp().getRequest()
            const token = request.headers.authorization.replace("Bearer ", "")
            const result: IResult<any> = await this._client.send("auth.verify", token).toPromise()
            return result.message
        }
        catch (error) {
            return false
        }
    }
}