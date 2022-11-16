import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsNumber, IsString, IsEmail, Length } from "class-validator"

@Entity()
export class User {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column({ length: 255, type: "varchar" })
    @Length(4, 32)
    username!: string

    @IsEmail()
    @Column({ length: 255, type: "varchar" })
    email!: string

    @Column({ length: 255, type: "varchar" })
    passwordHash!: string

    @Column({ length: 4, type: "varchar"})
    role!: string
}