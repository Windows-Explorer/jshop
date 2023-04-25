import { IsNotEmpty, IsNumber } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./category.entity"
import { ICategory } from "src/common/interfaces/data/category.interface"
import { ISubcategory } from "src/common/interfaces/data/subcategory.interface"

@Entity()
export class Subcategory implements ISubcategory {

    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, type: "varchar", unique: true, nullable: true })
    name: string

    @IsNotEmpty()
    @Column({ length: 1024, type: "varchar", unique: true, nullable: false })
    description: string

    @ManyToOne(() => Category, (category: ICategory) => category.id, { cascade: true })
    category: ICategory
}