import { Controller, HttpStatus } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { AuthService } from "./auth/auth.service"
import { UserCreateDto } from "./dto/user-create.dto"
import { IResult } from "./dto/result.dto"
import { UserSignInDto } from "./dto/user-signin.dto"

@Controller("/")
export class AppController {
    constructor(private readonly authService: AuthService){}

    @MessagePattern("post.auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<IResult<string>> {
        const result: IResult<string> = { statusCode: HttpStatus.OK, message: await this.authService.signUp(userDto) }
        return result
    }

    @MessagePattern("post.auth.signIn")
    async signIn(@Payload() userDto: UserSignInDto): Promise<IResult<string>> {
        const result: IResult<string> = { statusCode: HttpStatus.OK, message: await this.authService.signIn(userDto) }
        return result
    }

    @MessagePattern("get.auth.verify")
    async verifyToken(@Payload() token: any): Promise<IResult<string | boolean>> {
        const result: IResult<string | boolean> = { statusCode: HttpStatus.OK, message: await this.authService.verifyToken(token) }
        return result
    }

    @MessagePattern("get.auth.verify.admin")
    async verifyAdminToken(@Payload() token: any): Promise<IResult<string | boolean>> {
        const result: IResult<string | boolean> = { statusCode: HttpStatus.OK, message: await this.authService.verifyAdminToken(token) }
        return result
    }

}

