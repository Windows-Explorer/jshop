import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { UserCreateDto } from './dto/user-create.dto'
import * as bcrypt from "bcrypt"
import { User } from 'src/users/entities/user.entity'
import { ITokenPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, private jwtService: JwtService
    ) {}


    async signUp(userDto: UserCreateDto): Promise<any> {

        const passwordHash = await bcrypt.hash(userDto.password, 10)

        const user = await this.usersService.create({
            username: userDto.username,
            email: userDto.email,
            passwordHash: passwordHash,
            role: "user"
        })

        return await this.signUser(user)
    }


    async signIn(userDto: UserCreateDto): Promise<any> {
        const user = await this.usersService.findByEmail(userDto.email)

        if(user && (await bcrypt.compare(userDto.password, user.passwordHash))) {
            return await this.signUser(user)
        }

        throw new BadRequestException("Invalid credentials")
    }


    private async signUser(user: User){
        const tokenPayload: ITokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = await this.generateToken(tokenPayload)

        return token
    }


    private async generateToken(data: ITokenPayload): Promise<string> {
        return await this.jwtService.signAsync(data, { secret: "123" })
    }


    private async verifyToken(token: string): Promise<any> {
        try {
            const data = await this.jwtService.verifyAsync(token)
            if(data) return data
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}
