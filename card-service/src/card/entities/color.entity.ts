import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IsNumber } from "class-validator"
import { IColor } from "src/common/interfaces/color.interface"

@Entity()
export class Color implements IColor {
    constructor(name?: string) {
        this.name = name
    }

    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    name: string
}