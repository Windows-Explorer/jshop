import { Controller, Get, Post, Body, UseGuards, BadRequestException, HttpStatus, HttpException, HttpCode } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { IResult } from './extentions/result.interface'


@Controller("/")
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern("post.auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<string | any> {
        if(userDto instanceof UserCreateDto) return await this.authService.signUp(userDto)

        const result: IResult = { data: null, error: { code: HttpStatus.UNAUTHORIZED, message: "Invalid creditionals" } }
        return result
    }

    @MessagePattern("post.auth.singIn")
    async signIn(@Payload() userDto: UserCreateDto): Promise<string> {
        return await this.authService.signIn(userDto)
    }
}
