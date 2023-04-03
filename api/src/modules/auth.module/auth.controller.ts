import { Body, Controller, Get, Inject, Post, Req } from "@nestjs/common"
import { Request } from "express"
import { AUTH_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { UserCreateDto } from "src/common/dto/user-create.dto"
import { UserSignInDto } from "src/common/dto/user-signin.dto"
import { IAuthService } from "src/common/interfaces/services/auth.service.interface"

@Controller("auth")
export class AuthController {
    constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly _authService: IAuthService) { }

    @Post("/signup")
    async signUp(@Body() userCreateDto: UserCreateDto): Promise<string> {
        return await this._authService.signUp(userCreateDto)
    }

    @Post("/signin")
    async signIn(@Body() userSignInDto: UserSignInDto): Promise<string> {
        return await this._authService.signIn(userSignInDto)
    }

    @Get("/verify")
    async verifyToken(@Req() request: Request): Promise<string> {
        let token: string = ""
        try {
            token = request.headers.authorization.replace("Bearer ", "")
        }
        catch {
            token = ""
        }
        return await this._authService.verifyToken(token)
    }

}
