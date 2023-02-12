import { IsNotEmpty, IsNumber } from "class-validator"
import { ICategory } from "src/common/interfaces/category.interface"
import { ISubcategory } from "src/common/interfaces/subcategory.interface"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./category.entity"

@Entity()
export class Subcategory implements ISubcategory {

    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, type: "varchar", unique: true, nullable: true })
    name: string

    @ManyToOne(() => Category, (category: ICategory) => category.id, { cascade: true })
    category: ICategory
}