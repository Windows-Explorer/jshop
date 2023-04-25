import { ICartProduct } from "src/common/interfaces/data/cart-product.interface"
import { ICategory } from "src/common/interfaces/data/category.interface"
import { ISubcategory } from "src/common/interfaces/data/subcategory.interface"
import { Category } from "src/products/entities/category.entity"
import { Subcategory } from "src/products/entities/subcategory.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class CartProduct implements ICartProduct {
    constructor() {

    }
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    title: string

    @Column({ length: 1024, type: "varchar", unique: false, nullable: false })
    description: string

    @Column({ length: 255, type: "varchar", unique: false, nullable: false })
    image?: string

    @Column({ length: 255, type: "float", unique: false, nullable: false })
    cost: number

    @ManyToOne(() => Category, (type: ICategory) => type.id, { eager: true, cascade: true })
    category: ICategory

    @ManyToOne(() => Subcategory, (type: ISubcategory) => type.id, { eager: true, cascade: true, nullable: true })
    subcategory?: ISubcategory

    @Column({ length: 255, type: "int", unique: false, nullable: false })
    count: number
}