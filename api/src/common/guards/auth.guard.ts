import { Injectable, CanActivate, ExecutionContext, Inject, Global } from "@nestjs/common"
import { Request } from "express"
import { AUTH_SERVICE_TOKEN } from "../constants/inject-tokens.constants"
import { IAuthService } from "../interfaces/services/auth.service.interface"

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly _authService: IAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Request = context.switchToHttp().getRequest()
            const token = request.headers.authorization.replace("Bearer ", "")

            if((await this._authService.verifyToken(token)).length > 0 ) {
                return true
            }
        }
        catch (error) {
            return false
        }
    }
}