import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IsNumber } from "class-validator"
import { ICardType } from "src/common/interfaces/types/card-type.type"

@Entity()
export class CardType implements ICardType {
    constructor(name: string) {
        this.name = name
    }

    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    name: string
}