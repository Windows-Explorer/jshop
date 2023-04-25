import { Controller, Get, Inject, Param, Query, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { ProductsFindDto } from "src/common/dto/products-find.dto"
import { IResult } from "src/common/dto/result.dto"

@Controller("products")
export class ProductsController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) {}

    @Get("/")
    async findAll(
            @Res() response: Response,
            @Query("page") page: number,
            @Query("title") title: string,
            @Query("cost") cost: number,
            @Query("category") category: string,
            @Query("subcategory") subcategory: string 
        ): Promise<void> {
        if(!page) page = 0
        const request: ProductsFindDto = { page: page, filter: { title, cost, category, subcategory } }

        const result: IResult<any> = await this._client.send("products.findAll", request).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/count")
    async count(
        @Res() response: Response,
        @Query("page") page: number,
        @Query("title") title: string,
        @Query("cost") cost: number,
        @Query("category") category: string,
        @Query("subcategory") subcategory: string 
    ): Promise<void> {
        if(!page) page = 0
        const request: ProductsFindDto = { page: page, filter: { title, cost, category, subcategory } }

        const result: IResult<any> = await this._client.send("products.count", request).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/:id")
    async findById(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.findById", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
