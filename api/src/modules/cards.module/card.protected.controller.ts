import { Body, Controller, Get, Inject, Post } from "@nestjs/common"
import { CARDS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { ICardsService } from "src/common/interfaces/services/cards.service.interface"
import { ICard } from "src/common/interfaces/types/card.interface"

@Controller("cards")
export class CardProtectedController {
    constructor(@Inject(CARDS_SERVICE_TOKEN) private readonly _cardsService: ICardsService) {}

    @Post()
    async save(@Body() cardCreateDto: CardCreateDto): Promise<ICard> {
        return await this._cardsService.save(cardCreateDto)
    }

    @Get("/parse")
    async parse(): Promise<ICard[]> {
        return await this._cardsService.parseData()
    }
}