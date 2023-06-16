import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { IsNumber, Length } from "class-validator"
import { Category } from "./category.entity"
import { ICategory } from "src/common/interfaces/data/category.interface"
import { IProduct } from "src/common/interfaces/data/product.interface"

@Entity()
export class Product implements IProduct {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 1024, type: "varchar", unique: false, nullable: false })
    @Length(4, 1024)
    title: string

    @Column({ length: 1024, type: "varchar", unique: false, nullable: false })
    @Length(0, 1024)
    description: string

    @Column({ length: 1024, type: "varchar", unique: false, nullable: true })
    @Length(0, 1024)
    image?: string

    @Column({ type: "float", unique: false, nullable: false })
    cost: number

    @Column({ type: "boolean", unique: false, nullable: false, default: 0 })
    isTop: boolean

    @ManyToOne(() => Category, (type: ICategory) => type.id, { eager: true, cascade: true })
    category: ICategory
}