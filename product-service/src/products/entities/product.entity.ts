import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { IsNumber, Length } from "class-validator"
import { Category } from "./category.entity"
import { ICategory } from "src/common/interfaces/category.interface"
import { Subcategory } from "./subcategory.entity"
import { ISubcategory } from "src/common/interfaces/subcategory.interface"
import { IProduct } from "src/common/interfaces/product.interface"

@Entity()
export class Product implements IProduct {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    @Length(4, 32)
    title: string

    @Column({ length: 1024, type: "varchar", unique: false, nullable: false })
    @Length(0, 1024)
    description: string

    @Column({ length: 255, type: "varchar", unique: false, nullable: true })
    @Length(0, 255)
    image?: string

    @Column({ type: "float", unique: false, nullable: false })
    cost: number

    @Column({ type: "boolean", unique: false, nullable: false, default: 0 })
    isTop: boolean

    @ManyToOne(() => Category, (type: ICategory) => type.id, { eager: true, cascade: true })
    category: ICategory

    @ManyToOne(() => Subcategory, (type: ISubcategory) => type.id, { eager: true, cascade: true, nullable: true })
    subcategory?: ISubcategory

}