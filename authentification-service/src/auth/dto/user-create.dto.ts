import { IsString, IsEmail, Length} from "class-validator"

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