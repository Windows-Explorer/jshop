import { InjectRepository } from "@nestjs/typeorm"
import { ICardColorsService } from "src/common/interfaces/services/colors.service.interface"
import { Repository } from "typeorm"
import { CardColor } from "./entities/card-color.entity"
import { ICardColor } from "src/common/interfaces/types/color.interface"

export class CardColorsService implements ICardColorsService {
    constructor(@InjectRepository(CardColor) private readonly _cardColorsRepository: Repository<ICardColor>) { }

    async findAll(): Promise<ICardColor[]> {
        return await this._cardColorsRepository.find()
    }
}