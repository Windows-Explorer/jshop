import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { IsNumber, Length } from "class-validator"
import { Category } from "./category.entity"
import { ICategory } from "src/common/interfaces/category.interface"
import { Subcategory } from "./subcategory.entity"
import { ISubcategory } from "src/common/interfaces/subcategory.interface"

@Entity()
export class Product {
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

    @ManyToOne(() => Category, (type: ICategory) => type.id, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
    category: ICategory

    @ManyToOne(() => Subcategory, (type: ISubcategory) => type.id, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE", nullable: true })
    subcategory: ISubcategory

}