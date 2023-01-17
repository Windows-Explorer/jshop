import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IsNumber } from "class-validator"

@Entity()
export class Color {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    name: string
}