import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { JwtAuthGuard } from './auth/guards/jwt.guard'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { UsersService } from './users/users.service'

@Controller("/")
export class AppController {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

    
    @Post("/signup")
    async signUp(@Body() userDto: UserCreateDto): Promise<string> {
        return await this.authService.signUp(userDto)
    }

    @Post("/signin")
    async signIn(@Body() userDto: UserCreateDto): Promise<string> {
        return this.authService.signIn(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async index(){
        return "hello there"
    }

    @Get("/findAll")
    async findAll() {
        return this.userService.findAll()
    }
}
