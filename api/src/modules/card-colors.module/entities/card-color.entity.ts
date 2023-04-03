import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IsNumber } from "class-validator"
import { ICardColor } from "src/common/interfaces/types/color.interface"

@Entity()
export class CardColor implements ICardColor {
    constructor(name?: string) {
        this.name = name
    }

    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    name: string
}