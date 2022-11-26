import { Controller, HttpException, HttpStatus } from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { IResult } from './extentions/result.interface'

@Controller("/")
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern("post.auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<IResult> {
        console.log(userDto)
        try {
            const result: IResult = { data: await this.authService.signUp(userDto) }
            return result
        }
        catch(error) {
            const result: IResult = { error: { message: "Invalid credentials", statusCode: HttpStatus.UNAUTHORIZED } } 
            return result
        }
    }

    @MessagePattern("post.auth.singIn")
    async signIn(@Payload() userDto: UserCreateDto): Promise<IResult> {
        console.log(userDto)
        try {
            const result: IResult = { data: await this.authService.signIn(userDto) }
            return result
        }
        catch(error) {
            const result: IResult = { error: { message: "Unauthorized", statusCode: HttpStatus.UNAUTHORIZED } } 
            return result
        }
    }
}
