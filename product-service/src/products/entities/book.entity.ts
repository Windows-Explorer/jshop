import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsNumber, IsString, Length } from "class-validator"

@Entity()
export class Book {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column({ length: 255, type: "varchar", unique: true })
    @Length(4, 32)
    title: string

    @IsString()
    @Column({ length: 255, type: "varchar", unique: true })
    @Length(0, 255)
    description: string

}