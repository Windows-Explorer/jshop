import { IsNotEmpty, IsNumber, Length } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ICategory } from "src/common/interfaces/data/category.interface"

@Entity()
export class Category implements ICategory {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Length(2, 1024)
    @Column({ length: 1024, type: "varchar", unique: true, nullable: false })
    name: string

    @IsNotEmpty()
    @Length(2, 1024)
    @Column({ length: 1024, type: "varchar", unique: true, nullable: false })
    description: string
}