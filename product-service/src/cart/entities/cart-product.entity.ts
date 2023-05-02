import { ICartProduct } from "src/common/interfaces/data/cart-product.interface"
import { IProduct } from "src/common/interfaces/data/product.interface"
import { Product } from "src/products/entities/product.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class CartProduct implements ICartProduct {
    constructor() { }

    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(() => Product, (type: IProduct) => type.id, { eager: true, cascade: true, nullable: false })
    product: IProduct

    @Column({ length: 255, type: "int", unique: false, nullable: false })
    count: number
}