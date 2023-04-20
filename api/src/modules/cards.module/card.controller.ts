import { Controller, Get, Inject, Query } from "@nestjs/common"
import { CARDS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IFilter } from "src/common/interfaces/filter.interface"
import { ICardsService } from "src/common/interfaces/services/cards.service.interface"
import { ICard } from "src/common/interfaces/types/card.interface"

@Controller("cards")
export class CardController {
    constructor(@Inject(CARDS_SERVICE_TOKEN) private readonly _cardsService: ICardsService) { }

    @Get()
    async findAll(
        @Query("name") name: string, @Query("manacost") manacost: number,
        @Query("pt") pt: number, @Query("color") color: string, @Query("type") type: string
    ): Promise<ICard[]> {
        const filter: IFilter = { name, manacost, pt, color, type }
        return this._cardsService.findAll(filter)
    }
}