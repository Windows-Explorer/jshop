import { UserCreateDto } from "src/common/dto/user-create.dto"
import { UserSignInDto } from "src/common/dto/user-signin.dto"
import { User } from "src/users/entities/user.entity"
import { ITokenPayload } from "./jwt-payload.interface"

export interface IAuthService {
    signUp(userDto: UserCreateDto): Promise<string>
    signIn(userDto: UserSignInDto): Promise<string>
    verifyToken(token: string): Promise<string>
    verifyAdminToken(token: string): Promise<boolean>
    signUser(user: User): Promise<string>
    generateToken(data: ITokenPayload): Promise<string>
}