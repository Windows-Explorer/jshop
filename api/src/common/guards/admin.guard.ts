import { Injectable, CanActivate, ExecutionContext, Inject, Global } from "@nestjs/common"
import { Request } from "express"
import { AUTH_SERVICE_TOKEN } from "../constants/inject-tokens.constants"
import { IAuthService } from "../interfaces/services/auth.service.interface"

@Global()
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly _authService: IAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request: Request = context.switchToHttp().getRequest()
            const token = request.headers.authorization.replace("Bearer ", "")

            return await this._authService.verifyAdminToken(token)
        }
        catch (error) {
            return false
        }
    }
}