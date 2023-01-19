import { Controller, Get, Inject, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { CARD_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IResult } from "src/dto/result.dto"
import { Response } from "express"

@Controller("cards")
export class CardController {
    constructor(@Inject(CARD_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) {}
    
    @Get()
    async findAll(@Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("card.findAll", "").toPromise()
        response.status(result.statusCode).send(result.message)
    }
}