import { InjectRepository } from "@nestjs/typeorm"
import { ICardType } from "src/common/interfaces/type.interface"
import { ITypesService } from "src/common/interfaces/types.service.interface"
import { Repository } from "typeorm"
import { CardType } from "../entities/type.entity"

export class TypesService implements ITypesService {
    constructor(@InjectRepository(CardType) private readonly _typesRepository: Repository<ICardType>) {}

    async findAll(): Promise<ICardType[]> {
        return await this._typesRepository.find()
    }
}