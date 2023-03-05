import { IsNotEmpty, IsNumber } from "class-validator"
import { ICategory } from "src/common/interfaces/category.interface"
import { ISubcategory } from "src/common/interfaces/subcategory.interface"
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Subcategory } from "./subcategory.entity"

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