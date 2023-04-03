import { Controller, Get, Inject } from "@nestjs/common"
import { CARD_TYPES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { ICardTypesService } from "src/common/interfaces/services/card-types.service.interface"
import { ICardType } from "src/common/interfaces/types/card-type.type"

@Controller("")
export class TypesController {
    constructor(
        @Inject(CARD_TYPES_SERVICE_TOKEN) private readonly _cardTypesService: ICardTypesService
    ) {}

    @Get("/")
    async findAll(): Promise<ICardType[]> {
        return await this._cardTypesService.findAll()
    }
}