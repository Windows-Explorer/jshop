import { IsNotEmpty, IsNumber } from "class-validator"
import { ICategory } from "src/common/interfaces/category.interface"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Category implements ICategory {

    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, type: "varchar", unique: true, nullable: true })
    name: string

}