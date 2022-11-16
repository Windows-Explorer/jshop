import { IsString, IsEmail, Length} from "class-validator"
import { User } from "src/users/entities/user.entity"

export class UserCreateDto {
    @IsString()
    @Length(4, 32)
    username: string

    @IsEmail()
    email: string

    @IsString()
    @Length(8, 16)
    password: string
}