import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IsNumber, IsString, IsEmail, Length } from "class-validator"
import { IUser } from "src/common/interfaces/user.interface"

@Entity()
export abstract class User implements IUser {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column({ length: 255, type: "varchar", unique: true })
    @Length(4, 32)
    username: string

    @IsEmail()
    @Column({ length: 255, type: "varchar", unique: true })
    email: string

    @Column({ length: 255, type: "varchar" })
    passwordHash: string

    @Column({ length: 16, type: "varchar", default: "user"})
    role: string

}