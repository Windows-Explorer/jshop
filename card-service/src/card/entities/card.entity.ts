import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { IsNumber } from "class-validator"
import { Color } from "./color.entity"

@Entity()
export class Card {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    name: string

    @Column({ type: "int", unique: false, nullable: false })
    manacost: number

    @Column({ type: "int", unique: false, nullable: false })
    pt: number

    @ManyToOne(() => Color, (color: Color) => color.id, { eager: true })
    @JoinTable()
    color: Color

}