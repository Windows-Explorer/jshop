import { Controller, Get, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/guards/jwt.guard'
import { User } from './users/entities/user.entity'

@Controller("/")
export class AppController {
    constructor(private readonly AuthService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async testJWT(@Body() user: User): Promise<any> {
        return user
    }
}
