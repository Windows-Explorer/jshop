import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { UserCreateDto } from './dto/user-create.dto'
import bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, private jwtService: JwtService
    ) {}

    async signUp(userDto: UserCreateDto): Promise<any> {

        const passwordHash = await bcrypt.hash(userDto.password, 10)

        const user = this.usersService.create({
            username: userDto.username,
            email: userDto.email,
            passwordHash: passwordHash
        })
    }

    async signIn(){}

    private async generateToken(data: any, options: JwtSignOptions): Promise<string> {
        return this.jwtService.signAsync(data, options)
    }

    private async verifyToken(token: string): Promise<any> {
        try {
            const data = this.jwtService.verifyAsync(token)
            if(data) return data
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}
