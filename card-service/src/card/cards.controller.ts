import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { CARDS_SERVICE_TOKEN, LOGGER_TOKEN, OUTPUT_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { ICard } from "src/common/interfaces/card.interface"
import { ICardsService } from "src/common/interfaces/cards.service.interface"
import { ILogger } from "src/common/interfaces/logger.interface"
import { IOutput } from "src/common/interfaces/output.interface"
import { IResultAndCount } from "src/common/interfaces/result-and-count.interface"
import { IResult } from "src/common/interfaces/result.interface"

@Controller("")
export class CardsController {
    constructor(
        @Inject(CARDS_SERVICE_TOKEN) private readonly _cardService: ICardsService,
        @Inject(OUTPUT_TOKEN) private readonly _output: IOutput,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILogger
    ) {}

    @MessagePattern("cards.findAll")
    async findAll(@Payload() page: number): Promise<IResult<IResultAndCount<ICard[]> | ICard[]>> {
        const result: IResult<IResultAndCount<ICard[]> | ICard[]> = await this._output.responseAsync(HttpStatus.OK, await this._cardService.findAll(page))
        this._logger.log(result, "cards.findAll")
        return result
    }

    @MessagePattern("cards.save")
    async save(@Payload() createDto: CardCreateDto): Promise<IResult<ICard>> {
        const result: IResult<ICard> = await this._output.responseAsync(HttpStatus.OK, await this._cardService.save(createDto))
        this._logger.log(result, "cards.save")
        return
    }

    @MessagePattern("cards.parse")
    async parse(): Promise<IResult<ICard[]>> {
        const result: IResult<ICard[]> = await this._output.responseAsync(HttpStatus.OK, await this._cardService.parseData())
        this._logger.log(result, "cards.parse")
        return result
    }
}