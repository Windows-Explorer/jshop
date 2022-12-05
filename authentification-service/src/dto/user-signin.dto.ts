import { IsString, IsEmail, Length} from "class-validator"

export class UserSignInDto {
    @IsEmail()
    email: string

    @IsString()
    @Length(8, 16)
    password: string
}