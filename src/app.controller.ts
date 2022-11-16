import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { UserCreateDto } from './auth/dto/user-create.dto'
import { JwtAuthGuard } from './auth/guards/jwt.guard'

@Controller("/")
export class AppController {
    constructor(private readonly authService: AuthService) {}

    
    @Post("/signup")
    async signUp(@Body() userDto: UserCreateDto): Promise<any> {
        return await this.authService.signUp(userDto)
    }
}
