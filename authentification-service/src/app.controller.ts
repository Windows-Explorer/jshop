import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { JwtAuthGuard } from './auth/guards/jwt.guard'
import { UsersService } from './users/users.service'

@Controller("/")
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    
    @Post("/signup")
    async signUp(@Body() userDto: UserCreateDto): Promise<string> {
        return await this.authService.signUp(userDto)
    }

    @Post("/signin")
    async signIn(@Body() userDto: UserCreateDto): Promise<string> {
        return await this.authService.signIn(userDto)
    }

    // @UseGuards(JwtAuthGuard)
    @Get("/")
    async index(){
        return await this.userService.findAll()
    }
}
