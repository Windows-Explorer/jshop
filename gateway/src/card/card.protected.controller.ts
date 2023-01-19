import { Body, Controller, Inject, Post, Res, UseGuards } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { CARD_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IResult } from "src/dto/result.dto"
import { Response } from "express"
import { AdminGuard } from "src/guards/admin.guard"

@Controller("cards")
export class CardProtectedController {
    constructor(@Inject(CARD_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) {}

    @UseGuards(AdminGuard)
    @Post()
    async save(@Body() product: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("card.save", product).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}