import { Controller, HttpException, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { AUTH_SERVICE_TOKEN, OUTPUT_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/result.interface"
import { UserCreateDto } from "src/common/dto/user-create.dto"
import { UserSignInDto } from "src/common/dto/user-signin.dto"
import { IAuthService } from "src/common/interfaces/services/auth.service.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"

@Controller("")
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE_TOKEN) private readonly _authService: IAuthService,
        @Inject(OUTPUT_TOKEN) private readonly _output: IOutput
    ) { }

    @MessagePattern("auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<IResult<string>> {
        try {
            const result = await this._output.responseAsync(HttpStatus.OK, await this._authService.signUp(userDto))
            return result
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.UNAUTHORIZED)
        }
    }

    @MessagePattern("auth.signIn")
    async signIn(@Payload() userDto: UserSignInDto): Promise<IResult<string>> {
        try {
            const result = await this._output.responseAsync(HttpStatus.OK, await this._authService.signIn(userDto))
            return result
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.UNAUTHORIZED)
        }
    }

    @MessagePattern("auth.verify")
    async verifyToken(@Payload() token: string): Promise<IResult<string>> {
        try {
            const result = await this._output.responseAsync(HttpStatus.OK, await this._authService.verifyToken(token))
            return result
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.UNAUTHORIZED)
        }
    }

    @MessagePattern("auth.verify.admin")
    async verifyAdminToken(@Payload() token: any): Promise<IResult<boolean>> {
        try {
            const result = await this._output.responseAsync(HttpStatus.OK, await this._authService.verifyAdminToken(token))
            return result
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.UNAUTHORIZED)
        }
    }
}