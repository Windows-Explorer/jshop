import { Injectable, CanActivate, ExecutionContext, Inject, Global } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Request } from "express"
import { IResult } from "src/dto/result.dto"

@Global()
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@Inject("AUTH_GATEWAY") private readonly _client: ClientKafka) {}

    async canActivate(context: ExecutionContext) {
        try {
            const request: Request = context.switchToHttp().getRequest()
            const token = request.headers.authorization.replace("Bearer ", "")
            const result: IResult<any> = await this._client.send("auth.verify.admin", token).toPromise()
            return result.message
        }
        catch (error) {
            return false
        }
    }
}