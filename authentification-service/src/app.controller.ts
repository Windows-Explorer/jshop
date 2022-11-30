import { Controller, HttpException, HttpStatus, UseFilters, Param, Get } from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { IResult } from './dto/result.dto'
import { User } from './users/entities/user.entity'
import { UsersService } from './users/users.service'

@Controller("/")
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @MessagePattern("post.auth.signUp")
    async signUp(@Payload() userDto: UserCreateDto): Promise<any> {
        const user = await this.authService.signUp(userDto)

        const result: IResult = { data: await this.authService.signUp(userDto), error: { statusCode: HttpStatus.OK, message: "OK" }}
        return result
    }

    @MessagePattern("post.auth.signIn")
    async signIn(@Payload() userDto: UserCreateDto): Promise<any> {
        return await this.authService.signIn(userDto)
    }
    @Get("/unique/email/:email")
    async getUniqueEmail(@Param("email") email: string) {
        try {
            return await (await this.userService.findByEmail(email)).email
        }
        catch {
            return null
        }
    }
    @Get("/unique/username/:username")
    async getUniqueUsername(@Param("username") username: string) {
        try {
            return await (await this.userService.findByUsername(username)).username
        }
        catch {
            return null
        }
    }
}

