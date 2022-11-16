import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsNumber, IsString, IsEmail, IsHash } from "class-validator"

@Entity()
export class User {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column({ length: 255, type: "varchar" })
    username: string

    @IsEmail()
    @Column({ length: 255, type: "varchar" })
    email: string

    @Column({ length: 255, type: "varchar" })
    passwordHash: string
}