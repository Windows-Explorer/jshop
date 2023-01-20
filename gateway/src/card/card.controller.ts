import { Controller, Get, Inject, Param, Query, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { CARD_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IResult } from "src/dto/result.dto"
import { Response } from "express"

@Controller("cards")
export class CardController {
    constructor(@Inject(CARD_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) {}
    
    @Get()
    async findAll(@Res() response: Response, @Query("page") page: number): Promise<void> {
        if(!page) page = 0
        const result: IResult<any> = await this._client.send("cards.findAll", page).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/colors")
    async findAllColors(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("cards.colors.findAll", "").toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/types")
    async findAllTypes(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("cards.types.findAll", "").toPromise()
        response.status(result.statusCode).send(result.message)
    }
}