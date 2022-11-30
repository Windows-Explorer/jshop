import { Controller, HttpException, HttpStatus, UseFilters } from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { IResult } from './dto/result.dto'
import { AllExceptionsFilter } from './extentions/all.exception-filter'

@Controller("/")
export class AppController {
    constructor(private readonly authService: AuthService) {}

    // @UseFilters(new AllExceptionsFilter())
    @MessagePattern("post.auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<any> {
        console.log(userDto)
        const user = await this.authService.signUp(userDto)

        const result: IResult = { data: await this.authService.signUp(userDto), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("post.auth.signIn")
    async signIn(@Payload() userDto: UserCreateDto): Promise<any> {
        return await this.authService.signIn(userDto)
    }
}
