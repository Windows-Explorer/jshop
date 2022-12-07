import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './dto/user-create.dto'
import { IResult } from './dto/result.dto'
import { UserSignInDto } from './dto/user-signin.dto'

@Controller("/")
export class AppController {
    constructor(private readonly authService: AuthService){}

    @MessagePattern("post.auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<IResult> {
        const result: IResult = { data: await this.authService.signUp(userDto), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("post.auth.signIn")
    async signIn(@Payload() userDto: UserSignInDto): Promise<IResult> {
        const result: IResult = { data: await this.authService.signIn(userDto), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("get.auth.verify")
    async verifyToken(@Payload() token: any): Promise<any> {
        const result: IResult = { data: await this.authService.verifyToken(token), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

}

