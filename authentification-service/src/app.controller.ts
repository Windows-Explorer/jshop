import { Controller, Get, Post, Body, UseGuards, BadRequestException, HttpStatus, HttpException, HttpCode } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { IResult } from './extentions/result.interface'

const isUserDto = async (userDto: any) => {
    console.log(userDto instanceof UserCreateDto && "username" in userDto)
    if(userDto instanceof UserCreateDto && "username" in userDto) return true
    return false
}

@Controller("/")
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern("post.auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<string | any> {
        if("username" in userDto && "email" in userDto && "password" in userDto) {
            return { data: await this.authService.signUp(userDto!), error: { code: HttpStatus.OK, message: "OK" } }
        }
        else {
            const result: IResult = { data: null, error: { code: HttpStatus.UNAUTHORIZED, message: "Invalid creditionals" } }
            return result
        }
    }

    @MessagePattern("post.auth.singIn")
    async signIn(@Payload() userDto: UserCreateDto): Promise<string> {
        return await this.authService.signIn(userDto)
    }
}
