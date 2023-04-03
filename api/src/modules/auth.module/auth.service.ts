import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { ConfigService } from "@nestjs/config"
import { IAuthService } from "src/common/interfaces/services/auth.service.interface"
import { USERS_SERVICE_TOKEN, JWT_SERVICE_TOKEN, CONFIG_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IUsersService } from "src/common/interfaces/services/user.service.interface"
import { UserCreateDto } from "src/common/dto/user-create.dto"
import { UserSignInDto } from "src/common/dto/user-signin.dto"
import { ITokenPayload } from "src/common/interfaces/token-payload.interface"
import { IUser } from "src/common/interfaces/types/user.interface"

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(USERS_SERVICE_TOKEN) private readonly _usersService: IUsersService,
        @Inject(JWT_SERVICE_TOKEN) private readonly _jwtService: JwtService,
        @Inject(CONFIG_SERVICE_TOKEN) private readonly _configService: ConfigService
    ) { }

    async signUp(userDto: UserCreateDto): Promise<string> {
        try {
            const passwordHash = await bcrypt.hash(userDto.password, 10)
            const user = await this._usersService.create({
                username: userDto.username,
                email: userDto.email,
                phoneNumber: userDto.phoneNumber,
                passwordHash: passwordHash,
                role: "user"
            })
            return await this.signUser(user)
        }
        catch (error) {
            throw new HttpException(error, HttpStatus.UNAUTHORIZED)
        }
    }

    async signIn(userDto: UserSignInDto): Promise<string> {
        const user = await this._usersService.findByEmail(userDto.email)
        if (user && (await bcrypt.compare(userDto.password, user.passwordHash))) {
            return await this.signUser(user)
        }
        throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
    }

    async verifyToken(token: string): Promise<string> {
        try {
            const data = await this._jwtService.verifyAsync(token, { secret: this._configService.get<string>("JWT_SECRET") })
            return await this.generateToken({ email: data.email, role: data.role })
        }
        catch {
            return ""
        }
    }

    async verifyAdminToken(token: string): Promise<boolean> {
        await this._jwtService.verifyAsync(token, { secret: this._configService.get<string>("JWT_SECRET") })
        const decodedToken = await this._jwtService.decode(token)
        if (typeof (decodedToken) !== "string" && decodedToken.role === "admin") {
            return true
        }
        return false
    }

    async signUser(user: IUser): Promise<string> {
        const tokenPayload: ITokenPayload = {
            email: user.email,
            role: user.role
        }
        const token = await this.generateToken(tokenPayload)
        return token
    }

    async generateToken(data: ITokenPayload): Promise<string> {
        return await this._jwtService.signAsync(data, { secret: this._configService.get<string>("JWT_SECRET") })
    }
}
