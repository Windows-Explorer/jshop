import { IsNotEmpty, IsNumber } from "class-validator"
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Subcategory } from "./subcategory.entity"
import { ICategory } from "src/common/interfaces/data/category.interface"
import { ISubcategory } from "src/common/interfaces/data/subcategory.interface"

@Entity()
export class Category implements ICategory {

    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    name: string

    @IsNotEmpty()
    @Column({ length: 1024, type: "varchar", unique: true, nullable: false })
    description: string
    
    @OneToMany(() => Subcategory, (subcategory: ISubcategory) => subcategory.category)
    @JoinColumn()
    subcategories: Subcategory[]
}