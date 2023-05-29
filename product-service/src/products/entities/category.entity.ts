import { IsNotEmpty, IsNumber } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ICategory } from "src/common/interfaces/data/category.interface"

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
}