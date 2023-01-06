import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { AUTH_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/result.interface"
import { UserCreateDto } from "src/common/dto/user-create.dto"
import { UserSignInDto } from "src/common/dto/user-signin.dto"
import { IAuthService } from "src/common/interfaces/auth.service.interface"
import { IResulter } from "src/common/interfaces/resulter.interface"

@Controller("")
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE_TOKEN) private readonly _authService: IAuthService,
        @Inject(RESULTER_TOKEN) private readonly _resulter: IResulter
    ) {}

    @MessagePattern("auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<IResult<string>> {
        const result: IResult<string> = await this._resulter.responseAsync(HttpStatus.OK, await this._authService.signUp(userDto))
        return result
    }

    @MessagePattern("auth.signIn")
    async signIn(@Payload() userDto: UserSignInDto): Promise<IResult<string>> {
        const result: IResult<string> = await this._resulter.responseAsync(HttpStatus.OK, await this._authService.signIn(userDto))
        return result
    }

    @MessagePattern("auth.verify")
    async verifyToken(@Payload() token: any): Promise<IResult<string>> {
        const result: IResult<string> = await this._resulter.responseAsync(HttpStatus.OK, await this._authService.verifyToken(token))
        return result
    }

    @MessagePattern("auth.verify.admin")
    async verifyAdminToken(@Payload() token: any): Promise<IResult<boolean>> {
        const result: IResult<boolean> = await this._resulter.responseAsync(HttpStatus.OK, await this._authService.verifyAdminToken(token))
        return result
    }
}