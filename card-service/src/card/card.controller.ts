import { Body, Controller, Get, Inject, Post } from "@nestjs/common"
import { CARD_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { ICard } from "src/common/interfaces/card.interface"
import { ICardService } from "src/common/interfaces/card.service.interface"
import { Card } from "./entities/card.entity"

@Controller("")
export class CardController {
    constructor(@Inject(CARD_SERVICE_TOKEN) private readonly _cardService: ICardService) {}

    @Get("")
    async findAll(): Promise<ICard[]> {
        return await this._cardService.findAll()
    }

    @Post("")
    async save(@Body() createDto: CardCreateDto): Promise<ICard> {
        return await this._cardService.save(createDto)
    }

    @Get("/parse")
    async parse(): Promise<ICard[]> {
        return await this._cardService.parseData()
    }
}