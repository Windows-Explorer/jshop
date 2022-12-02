import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsNumber, IsString, IsEmail, Length } from "class-validator"

@Entity()
export class User {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    @Length(4, 32)
    username: string

    @IsEmail()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    email: string

    @IsString()
    @Column({ length: 255, type: "varchar", nullable: false })
    passwordHash: string

    @IsString()
    @Column({ length: 255, type: "varchar", nullable: false })
    phoneNumber: string

    @IsString()
    @Column({ length: 4, type: "varchar", default: "user", nullable: false})
    role: string

}