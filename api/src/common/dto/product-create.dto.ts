import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { IProduct } from "../interfaces/types/product.interface"

export class ProductCreateDto implements IProduct {
    @IsNumber()
    id?: number

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    cost: number

    @IsNotEmpty()
    type: string

}