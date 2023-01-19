import { Body, Controller, Get, HttpStatus, Inject, Post } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { CARD_SERVICE_TOKEN, LOGGER_TOKEN, OUTPUT_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { ICard } from "src/common/interfaces/card.interface"
import { ICardService } from "src/common/interfaces/card.service.interface"
import { ILogger } from "src/common/interfaces/logger.interface"
import { IOutput } from "src/common/interfaces/output.interface"
import { IResult } from "src/common/interfaces/result.interface"

@Controller("")
export class CardController {
    constructor(
        @Inject(CARD_SERVICE_TOKEN) private readonly _cardService: ICardService,
        @Inject(OUTPUT_TOKEN) private readonly _output: IOutput,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILogger
    ) {}

    @MessagePattern("card.findAll")
    async findAll(): Promise<IResult<ICard[]>> {
        const result: IResult<ICard[]> = await this._output.responseAsync(HttpStatus.OK, await this._cardService.findAll())
        this._logger.log(result, "card.findAll")
        return result
    }

    @MessagePattern("card.save")
    async save(@Payload() createDto: CardCreateDto): Promise<IResult<ICard>> {
        const result: IResult<ICard> = await this._output.responseAsync(HttpStatus.OK, await this._cardService.save(createDto))
        this._logger.log(result, "card.save")
        return
    }

    @MessagePattern("card.parse")
    async parse(): Promise<IResult<ICard[]>> {
        const result: IResult<ICard[]> = await this._output.responseAsync(HttpStatus.OK, await this._cardService.parseData())
        this._logger.log(result, "card.parse")
        return result
    }
}