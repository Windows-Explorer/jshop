import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { IsNumber } from "class-validator"
import { Color } from "./color.entity"
import { CardType } from "./type.entity"
import { ICard } from "src/common/interfaces/card.interface"
import { IColor } from "src/common/interfaces/color.interface"
import { ICardType } from "src/common/interfaces/type.interface"

@Entity()
export class Card implements ICard {
    constructor(
        name: string,
        text: string,
        manacost: number,
        pt: number,
        maintype: ICardType,
        type: ICardType,
        color: IColor,
        image: string
    ) {
        this.name = name
        this.text = text
        this.manacost = manacost
        this.pt = pt
        this.maintype = maintype
        this.type = type
        this.color = color
        this.image = image
    }

    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    name: string

    @Column({ length: 600, type: "varchar", unique: false, nullable: false })
    text: string

    @Column({ type: "int", unique: false, nullable: false })
    manacost: number

    @Column({ type: "int", unique: false, nullable: false })
    pt: number

    @ManyToOne(() => CardType, (type: ICardType) => type.id, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn()
    maintype: ICardType

    @ManyToOne(() => CardType, (type: ICardType) => type.id, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn()
    type: ICardType

    @ManyToOne(() => Color, (color: IColor) => color.id, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn()
    color: IColor

    @Column({ type: "varchar", unique: false, nullable: false, default: null })
    image: string

}