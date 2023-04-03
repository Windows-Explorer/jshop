import { InjectRepository } from "@nestjs/typeorm"
import { ICardType } from "src/common/interfaces/types/card-type.type"
import { Repository } from "typeorm"
import { ICardTypesService } from "src/common/interfaces/services/card-types.service.interface"
import { CardType } from "./entities/card-type.entity"

export class CardTypesService implements ICardTypesService {
    constructor(@InjectRepository(CardType) private readonly _typesRepository: Repository<ICardType>) {}

    async findAll(): Promise<ICardType[]> {
        return await this._typesRepository.find()
    }
}