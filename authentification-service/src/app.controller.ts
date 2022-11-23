import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { JwtAuthGuard } from './auth/guards/jwt.guard'
import { User } from './users/entities/user.entity'
import { UsersService } from './users/users.service'

@Controller("/")
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

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
    async index(): Promise<User[]> {
        return await this.userService.findAll()
    }
}
