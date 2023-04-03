import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IsNumber, Length } from "class-validator"
import { IProduct } from "src/common/interfaces/types/product.interface"

@Entity()
export abstract class Product implements IProduct {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    @Length(4, 32)
    title: string

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    @Length(0, 255)
    description: string

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    @Length(0, 255)
    image: string

    @Column({ type: "float", unique: false, nullable: false })
    cost: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false, default: "product" })
    @Length(0, 255)
    type: string

}