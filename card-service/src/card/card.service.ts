import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { ICardService } from "src/common/interfaces/card.service.interface"
import { Repository } from "typeorm"
import { Card } from "./entities/card.entity"

@Injectable()
export class CardService implements ICardService {
    constructor(@InjectRepository(Card) private readonly _cardRepository: Repository<Card>) {}

    async findAll(): Promise<Card[]> {
        return await this._cardRepository.find()
    }

    async save(card: CardCreateDto): Promise<any> {
        return await this._cardRepository.save(card)
    }
}