import { Controller, Get, Inject } from "@nestjs/common"
import { CARD_COLORS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { ICardColorsService } from "src/common/interfaces/services/colors.service.interface"
import { ICardColor } from "src/common/interfaces/types/color.interface"

@Controller("")
export class CardColorsController {
    constructor(
        @Inject(CARD_COLORS_SERVICE_TOKEN) private readonly _cardColorsService: ICardColorsService
    ) { }

    @Get("/")
    async findAll(): Promise<ICardColor[]> {
        return await this._cardColorsService.findAll()
    }
}