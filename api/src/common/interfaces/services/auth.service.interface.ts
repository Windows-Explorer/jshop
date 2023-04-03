import { UserCreateDto } from "src/common/dto/user-create.dto"
import { UserSignInDto } from "src/common/dto/user-signin.dto"
import { ITokenPayload } from "../token-payload.interface"
import { IUser } from "../types/user.interface"

export interface IAuthService {
    signUp(userDto: UserCreateDto): Promise<string>
    signIn(userDto: UserSignInDto): Promise<string>
    verifyToken(token: string): Promise<string>
    verifyAdminToken(token: string): Promise<boolean>
    signUser(user: IUser): Promise<string>
    generateToken(data: ITokenPayload): Promise<string>
}