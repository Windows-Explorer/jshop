import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { UserCreateDto } from '../dto/user-create.dto'
import * as bcrypt from "bcrypt"
import { User } from 'src/users/entities/user.entity'
import { ITokenPayload } from './interfaces/jwt-payload.interface'
import { RpcException } from '@nestjs/microservices'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService){}


    async signUp(userDto: UserCreateDto): Promise<any> {
        try {
            const passwordHash = await bcrypt.hash(userDto.password, 10)
            const user = await this.usersService.create({
                username: userDto.username,
                email: userDto.email,
                passwordHash: passwordHash,
                role: "user"
            })
    
            return await this.signUser(user)
        }
        catch(error) {
            throw new RpcException(error)
        }
    }


    async signIn(userDto: UserCreateDto): Promise<any> {
        const user = await this.usersService.findByEmail(userDto.email)

        if(user && (await bcrypt.compare(userDto.password, user.passwordHash))) {
            return await this.signUser(user)
        }

        throw new RpcException("ERROR")

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


    async verifyToken(token: string): Promise<any> {
        try {
            await this.jwtService.verifyAsync(token, { secret: "123" })
            return true
        }
        catch {
            return false
        }
    }
}
