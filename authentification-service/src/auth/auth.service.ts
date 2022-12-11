import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { UserCreateDto } from '../dto/user-create.dto'
import * as bcrypt from "bcrypt"
import { User } from 'src/users/entities/user.entity'
import { ITokenPayload } from './interfaces/jwt-payload.interface'
import { RpcException } from '@nestjs/microservices'
import { UserSignInDto } from 'src/dto/user-signin.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}


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


    async signIn(userDto: UserSignInDto): Promise<any> {
        const user = await this.usersService.findByEmail(userDto.email)

        if(user && (await bcrypt.compare(userDto.password, user.passwordHash))) {
            return await this.signUser(user)
        }

        throw new RpcException("Unauthorized")

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
        return await this.jwtService.signAsync(data, { secret: this.configService.get<string>("JWT_SECRET") })
    }


    async verifyToken(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>("JWT_SECRET") })
            return true
        }
        catch {
            return false
        }
    }

    async verifyAdminToken(token: string): Promise<boolean> {
            await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>("JWT_SECRET") })
            const decodedToken = await this.jwtService.decode(token)
            if (typeof(decodedToken) !== "string" && decodedToken.role === "admin" ){
                return true
            }
            return false
        
    }
}
